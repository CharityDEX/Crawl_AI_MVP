from dotenv import load_dotenv
import os
load_dotenv()
QDRANT_API_KEY = os.environ["QDRANT_API_KEY"]
QDRANT_COLLECTION_NAME = "crawlai"
QDRANT_ENDPOINT = "https://78440471-16dc-4da1-8f1d-3ec406c0417c.us-east4-0.gcp.cloud.qdrant.io:6333"

from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import OpenAI
from langchain_core.output_parsers.string import StrOutputParser
from googlesearch import search
import re
import lxml
from bs4 import BeautifulSoup
from langchain_community.document_loaders import RecursiveUrlLoader
from typing import Union
import requests
import aiohttp
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores.utils import filter_complex_metadata
from langchain_openai import OpenAI
from langchain_qdrant import QdrantVectorStore
from langchain.chains import create_history_aware_retriever
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
import gradio as gr
from gradio import ChatMessage

gen_searches_sys_prompt = (
    """
    You are a specialized AI Assistant helping a user create an LLM agent for them to use.
    The user is presumably non technical. Given the user request, consider which web searches would yield
    the most relevant information to add to the vector store of the user's new agent. Do NOT answer the
    user's request, just create three web search queries based on it to help populate the vector store with data.
    Make the three requests relatively varied, each of the requests will have the top website result fully scraped so
    you should make them varied to grab a wide range of information. Output three strings of the search requests separated
    by new lines.

    Here is an example (Do NOT use this directly):
    Question:
    Human: help me make assistant to apply to santa clara university
    
    Three Web Searches (separated by new lines):
    santa clara university main website
    \n
    applying to santa clara university
    \n
    santa clara university application requirements

    \n\n
    Question:
    """
)

gen_searches_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", gen_searches_sys_prompt),
        ("human", "{input}"),
        ("system", "\nThree Web Searches (separated by new lines):")
    ]
)

gen_searches_llm = OpenAI(temperature=0)
gen_searches_chain = gen_searches_prompt | gen_searches_llm | StrOutputParser()

print("created search gen llm")

def get_top_google_results(query, num_results=1):
    # Perform the search and return the top links
    return [link for link in search(query, num_results=num_results)]

def bs4_extractor(html: str) -> str:
    soup = BeautifulSoup(html, "lxml")
    return re.sub(r"\n\n+", "\n\n", soup.text).strip()

def simple_metadata_extractor(raw_html: str, url: str, response: Union[requests.Response, aiohttp.ClientResponse]) -> dict:
    # Extract metadata from the response
    content_type = getattr(response, "headers").get("Content-Type", "")
    print(f"Loading: {url}  Content-Type: {content_type}")
    return {"source": url, "content_type": content_type}

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100
)

embeddings_model = OpenAIEmbeddings(model="text-embedding-3-small")

rephraser_llm = OpenAI(temperature=0)

contextualize_q_system_prompt = (
    """
    You are a specialized AI Assistant. Given a chat history and the latest user question
    which might reference context in the chat history, 
    formulate a standalone question which can be understood 
    without the chat history. Do NOT answer the question, just 
    reformulate it if needed and otherwise return it as is.
    Do NOT preceed your answer with any tags like System: or AI:.

    Here is an example:
    History:
    Human: what is an LLM?
    AI: an LLM is a large language model, a type of transformer machine learning algorithm used to interpret images and speech.
    Question:
    Human: how do I make it?
    Rephrased Question:
    How do I create an LLM transformer?
    \n\n
    History:
    \n\n
    """

)
contextualize_q_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", contextualize_q_system_prompt),
        MessagesPlaceholder("chat_history"),
        ("system", "\n\nQuestion:\n\n"),
        ("human", "{input}"),
        ("system", "\n\nRephrased Question:\n\n")
    ]
)

sys_prompt = (
    """
    You are an assistant for question-answering tasks with retrieval augmented generation.
    Use the following pieces of retrieved context and the history of your interactions
    with the human to answer the question. If you don't know the answer, say that you
    don't know! Do not provide information if it is
    not in the context. Be descriptive. Do not complete or further generate the
    user's question. Do not refer to the context or history of interaction, do not use phrases like
    "according to the context" or "from the given documents".
    \n\n
    Context:
    \n\n
    {context}
    \n\n
    History:
    \n\n
    """
)

qa_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", sys_prompt),
        MessagesPlaceholder("chat_history"),
        ("system", "\n\nQuestion:"),
        ("human", "{input}"),
        ("system", "\n\nAnswer (Do not start your answer with AI or System):\n\n")
    ]
)

main_llm = OpenAI()

print("created chains")

def convert_langchain_to_gradio(messages):
    gradio_messages = []
    for msg in messages:
        if isinstance(msg, AIMessage):
            gradio_messages.append(ChatMessage(role="assistant", content=msg.content))
        elif isinstance(msg, HumanMessage):
            gradio_messages.append(ChatMessage(role="user", content=msg.content))
    return gradio_messages

chat_history = []
vector_store = None

def ask_question(question, history):
    global chat_history
    global rag_chain
    ai_msg = rag_chain.invoke({"input": question, "chat_history": chat_history})
    chat_history.append(HumanMessage(content = question))
    print(ai_msg)
    chat_history.append(AIMessage(content = ai_msg["answer"]))
    return "", convert_langchain_to_gradio(chat_history)

def build_assistant(message, history):
    if not history:
        history = []
    print("started building assistant for " + str(message))
    history.append(ChatMessage(role="assistant", content="Started building assistant for: " + str(message)))
    yield "", history

    searches = gen_searches_chain.invoke(message)

    lines = [line for line in searches.split('\n') if line.strip()]

    print("found links")
    history.append(ChatMessage(role="assistant", content="found links"))
    yield "", history

    links = []
    for line in lines:
        links.extend(get_top_google_results(line))
    
    docs = []
    for link in links:
        if link.startswith("https://github.com/") or link.startswith("http://github.com/"):
            continue
        history.append(ChatMessage(role="assistant", content="Loading: " + link))
        yield "", history
        loader = RecursiveUrlLoader(link, extractor=bs4_extractor, metadata_extractor=simple_metadata_extractor, max_depth=3)
        docs.extend(loader.load())
    
    splits = text_splitter.split_documents(docs)
    splits = filter_complex_metadata(splits)
    
    print("loading vectorstore")
    history.append(ChatMessage(role="assistant", content="loading vectorstore"))
    yield "", history

    vector_store = QdrantVectorStore.from_documents(
        documents=splits,
        embedding=embeddings_model,
        url=QDRANT_ENDPOINT,
        collection_name=QDRANT_COLLECTION_NAME,
        api_key=QDRANT_API_KEY
    )

    print("loaded vectorstore")
    history.append(ChatMessage(role="assistant", content="loaded vectorstore"))
    yield "", history

    '''
    global vector_store
    print("loading chroma")
    history.append(ChatMessage(role="assistant", content="loading chroma"))
    yield "", history
    vector_store = Chroma.from_documents(splits, embeddings_model)
    print("loaded chroma")
    history.append(ChatMessage(role="assistant", content="loaded chroma"))
    yield "", history
    '''

    retriever = vector_store.as_retriever(search_type="mmr", search_kwargs={"k": 30, "fetch_k": 10, "lambda_mult": 0.5})

    history_aware_retriever = create_history_aware_retriever(
        rephraser_llm, retriever, contextualize_q_prompt
    )

    question_answer_chain = create_stuff_documents_chain(main_llm, qa_prompt)
    global rag_chain
    rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

    response = ChatMessage(role="assistant", content="Your assistant for " + str(message) + " has been created. Your chat history has been cleared")
    global chat_history
    chat_history = []
    chat_history.append(AIMessage(content = "Hello, I am an assistant to help you with: " + message + ". What would you like to know?"))
    history.append(response)
    yield "", history

with gr.Blocks() as demo:
    with gr.Row():
        with gr.Column():
            builder_chatbot = gr.Chatbot(type="messages", label="Assistant Builder")
            builder_msg = gr.Textbox(label="Describe what assistant you would like")
            builder_msg.submit(build_assistant, [builder_msg, builder_chatbot], [builder_msg, builder_chatbot])

        with gr.Column():
            chatbot = gr.Chatbot(type="messages", label="Specialized Assistant")
            msg = gr.Textbox(label="Ask your question")
            msg.submit(ask_question, [msg, chatbot], [msg, chatbot])

if __name__ == "__main__":
    #build_assistant("please make an assistant for help to apply and study freshman year at santa clara univeristy. I am computer science major", [])
    demo.launch(server_name="0.0.0.0", server_port=8080)