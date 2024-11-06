import React from "react";

class PromptArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      input: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState(state => ({
      messages: [...state.messages, state.input],
      input: ""
    }))
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  render() {
    return (
        <div className="command-prompt">
          <h1>CrawlAI - Prompt {this.props.promptNumber}</h1>
          <div className="input-group">
            <p>(reqired) Croq API Key:</p>
            <input type="password" placeholder="Enter API Key" />
            <p className="info-msg">
              🗝️ Please add your Croq API key to continue.
            </p>
          </div>
          <div className="chat-container">
            {this.state.messages.map(el => (
              <p>{el}</p>
            ))}
          </div>
            <textarea
              placeholder="Enter your message here"
              onChange={this.handleChange} // Changed to onChange
              value={this.state.input}>
            </textarea>
            <button onClick={this.handleSubmit}>Send</button>
        </div>
    )
  }
}

export default PromptArea;