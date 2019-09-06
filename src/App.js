import React from 'react';
import SplitPane from 'react-split-pane';
import ReactMarkdown from 'react-markdown';
import logo from './logo.svg';
import Editor from './editor.js';
import './App.css';

const fs = window.require('fs');
const electron = window.require('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const dialog = remote.dialog;

class App extends React.Component {
  constructor(props) {
    super();

    ipc.on('save-file', (event) => {
      dialog.showSaveDialog((filename) => {
        const content = this.state.markdownSrc;
        fs.writeFile(filename, content, (err) => {
          if (err) {
            return console.log(err);
          }
          alert('The file has been successfully saved.');
        });
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
