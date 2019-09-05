import React from 'react';
import SplitPane from 'react-split-pane';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <SplitPane split="vertical" defaultSize="50%">
        <div className="editor-pane"></div>
        <div className="view-pane"></div>
      </SplitPane>
    </div>
  );
}

export default App;
