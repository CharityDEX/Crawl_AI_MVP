# setup.py

from setuptools import setup, find_packages

setup(
    name="firecrawlAPI",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        'requests',
        'pytest',
        'python-dotenv',
        'websockets',
        'asyncio',
        'nest-asyncio'
    ],  # List any dependencies here
    author="CrawlAI Team",
    author_email="your.email@example.com",
    description="A sample Python package",
)
