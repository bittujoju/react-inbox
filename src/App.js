import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Inbox from './components/Inbox';


class App extends Component {
  render() {
    const messagesList = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "body": "Message Body",
    "read": false,
    "starred": true,
    "expanded": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "body": "Message Body",
    "read": false,
    "starred": false,
    "expanded": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "body": "Message Body",
    "read": false,
    "starred": true,
    "expanded": true,
    "labels": ["dev"]
  }
]
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Inbox</h2>
        </div>

        <Inbox messages={messagesList}/>
      </div>

    );
  }
}

export default App;
