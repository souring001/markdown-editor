import React from 'react';
import SplitPane from 'react-split-pane';
import ReactMarkdown from 'react-markdown';
import logo from './logo.svg';
import Editor from './editor.js';
import './App.css';

const {ipcRenderer} = window.require('electron');

class App extends React.Component {
  constructor(props) {
    super();

    ipcRenderer.on('save-file', (event) => {
      console.log('save-file');
      const content = this.state.markdownSrc;
      event.sender.send('save-dialog', content);
    });

    ipcRenderer.on('opened-file', (event, content) => {
      console.log(content);
      this.setState({
        markdownSrc: content
      });
    });

    this.state = {
      markdownSrc: "# Hello World"
    }

    this.onMarkdownChange = this.onMarkdownChange.bind(this);
  }

  onMarkdownChange(md) {
    this.setState({
      markdownSrc: md
    });
  }

  render() {
    return (
      <div className="App">
        <SplitPane split="vertical" defaultSize="50%">
          <div className="editor-pane">
            <Editor className="editor" value={this.state.markdownSrc} onChange={this.onMarkdownChange}/>
          </div>
          <div className="view-pane">
            <ReactMarkdown className="result" source={this.state.markdownSrc} />
          </div>
        </SplitPane>
      </div>
    );
  }
}

export default App;
