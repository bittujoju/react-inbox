import React, {Component} from 'react'
import MessageList from './MessagesList'
import Toolbar from './Toolbar'
import ComposingForm from './ComposingForm'

export class Inbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: props.messages
        }
    }

    async componentDidMount() {
      const messages = await this.getMessages();
      this.setState({messages: messages})
      }

    async getMessages() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`);
      const json = await response.json();
      return json._embedded.messages;
    }

    async patchMessages(body) {
      alert(body)
      const response = await fetch  (`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'PATCH',
        body: JSON.stringify({body}),
        headers: {
          "Content-Type": 'application/json',
          'Accept': 'application/json'
        }
      });
    }

    handleCheckboxChange = (e, id) => {
       const newMessages = this.state.messages.map(message => {
           if (message.id === id) {
               message.selected = e.target.checked
           }
           return message
       })

       this.setState({messages: newMessages})
   }

   handleStarChange = (e, id) => {
       const body = {"messageIds": [], "command": "star", "star": false}
       const newMessages = this.state.messages.map(message => {
           if (message.id === id) {
               message.starred = !message.starred
               body.messageIds.push(message.id)
               body.star = message.starred
           }
           return message
       })
       this.patchMessages(body)
       this.setState({messages: newMessages})
   }

   handleToolbarMessageCheckboxClick = () => {
       let newMessages
       const selectedMessages = this.state.messages.filter(message => message.selected === true)
       if (selectedMessages.length === this.state.messages.length) {
           newMessages = this.state.messages.map(message => {
               if (message.selected) {
                   message.selected = false
               }
               return message
           })
       } else {
           newMessages = this.state.messages.map(message => {
               if (!message.selected) {
                   message.selected = true
               }
               return message
           })
       }

       this.setState({messages: newMessages})
   }

   handleMarkAsRead = () => {
       const body = {"messageIds": [], "command": "read", "read": false}
       const newMessages = this.state.messages.map(message => {
           if (message.selected) {
               message.read = true
               body.messageIds.push(message.id)
               body.read = message.read
           }
           return message
       })
       this.patchMessages(body)
       this.setState({messages: newMessages})
   }

   handleMarkAsUnread = () => {
       const body = {"messageIds": [], "command": "read", "read": false}
       const newMessages = this.state.messages.map(message => {
           if (message.selected) {
               message.read = false
               body.messageIds.push(message.id)
               body.read = message.read
           }
           return message
       })
       this.patchMessages(body)
       this.setState({messages: newMessages})
   }

   handleDeleteMessages = () => {
       const body = {"messageIds": [], "command": "delete"}
       const newMessages = this.state.messages.filter(message => !message.selected)
       this.state.messages.map(message => {
         if (message.selected) {
                  body.messageIds.push(message.id)
              }})
       this.patchMessages(body)
       this.setState({messages: newMessages})
   }

   handleApplyLabel = (e) => {
       const newMessages = this.state.messages.map(message => {
           if (message.selected) {
               if (!message.labels.includes(e.target.value)) {
                   message.labels.push(e.target.value)
               }
           }
           return message
       })

       this.setState({messages: newMessages})
   }

   handleRemoveLabel = (e) => {
       const newMessages = this.state.messages.map(message => {
           if (message.selected) {
               message.labels = message.labels.filter(message => message !== e.target.value)
           }
           return message
       })

       this.setState({messages: newMessages})
   }
   handleAddMessage = (message) => {
       const newMessage =   {
           "id": (this.state.messages.length + 1),
           "subject": message.subject,
           "body": message.body,
           "read": false,
           "starred": false,
           "labels": []
         }
       const newMessages = [...this.state.messages, newMessage]
       this.setState({messages: newMessages})
   }
   messageBodyChange = (e, id) => {
       const newMessages = this.state.messages.map(message => {
           if (message.id === id) {
               message.expanded = !message.expanded
               message.read = true
           }
           return message
       })

       this.setState({messages: newMessages})
   }
    render() {
            return (
                <div>
                <Toolbar
                   messages={this.state.messages}
                   handleAddMessage={this.handleAddMessage}
                   handleToolbarMessageCheckboxClick={this.handleToolbarMessageCheckboxClick}
                   handleMarkAsRead={this.handleMarkAsRead}
                   handleMarkAsUnread={this.handleMarkAsUnread}
                   handleDeleteMessages={this.handleRemoveMessages}
                   handleApplyLabel={this.handleApplyLabel}
                   handleRemoveLabel={this.handleRemoveLabel}
                   handleDeleteMessages={this.handleDeleteMessages}
               />
               <MessageList
                   messages={this.state.messages}
                   checkboxChange={this.handleCheckboxChange}
                   starChange={this.handleStarChange}
                   messageBodyChange={this.messageBodyChange}
               />
                 </div>
        )
    }
}
export default Inbox
