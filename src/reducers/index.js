import { combineReducers } from 'redux'
import {MESSAGES_RECEIVED,MESSAGES_SEND,MESSAGES_TOGGLE_COMPOSE,MARK_AS_READ,MARK_AS_UNREAD, SELECT_ALL, UNSELECT_ALL, MESSAGE_SELECTION_TOGGLE, MESSAGE_STAR_TOGGLE,MESSAGES_DELETE, APPLY_LABEL, REMOVE_LABEL, MESSAGE_BODY_REQUEST_STARTED, MESSAGE_BODY_REQUEST_SUCCESS } from '../actions'

function messages(state = { all: [], ComposeMessage:false }, action) {
  let messages;
  switch (action.type) {
    case MESSAGES_RECEIVED:
      return {
        ...state,
        all: action.messages
      }

      case MESSAGES_DELETE:
        return {
          ...state,
          all: state.all.filter(message => !message.selected)
        }

    case MESSAGES_TOGGLE_COMPOSE:
      return {
        ...state,
        ComposeMessage: !state.ComposeMessage
      }
      case MESSAGE_SELECTION_TOGGLE:
        return {
          ...state,
          all: state.all.map(message =>{
            if (message.id=== action.id){
              return {...message,selected:!message.selected}
            }
            return message
          })
        }
      case SELECT_ALL:
        return {
          ...state,
          all: state.all.map(message =>{return {...message, selected: true}
            return message
          })
        }
        case UNSELECT_ALL:
          return {
            ...state,
            all: state.all.map(message =>{return {...message, selected: false}
              return message
            })
          }
        case MESSAGE_STAR_TOGGLE:
          return {
            ...state,
            all: state.all.map(message =>{
              if (message.id=== action.id){
                return {...message,starred:!message.starred}
              }
              return message
            })
          }
            case MARK_AS_READ:
              return {
                ...state,
                all: state.all.map(message =>{
                  if (message.selected){
                    return {...message, read:true}
                  }
                  return message
                })
              }
            case APPLY_LABEL:
              return {
                ...state,
                all : state.all.map(message => {
                  if (message.selected) {
                    if (!message.labels.includes(action.labelName)) {
                      const newLabels = [...message.labels, action.labelName]
                      return {...message, labels: newLabels}
                    }
                  }
                  return message
                })
              }
            case REMOVE_LABEL:
              return {
                ...state,
                all : state.all.map(message => {
                  if (message.selected) {
                    if (message.labels.includes(action.labelName)) {
                      const newLabels = message.labels
                      newLabels.pop(action.labelName)
                      return {...message, labels: newLabels}
                    }
                  }
                  return message
                })
              }
            case MARK_AS_UNREAD:
              return {
                ...state,
                all:state.all.map(message =>{
                  if (message.selected){
                    return {...message, read:false}
                  }
                  return message
                })
              }
            case MESSAGE_BODY_REQUEST_SUCCESS:
              return {
                  ...state,
                  all: action.newMessages
                }
            case MESSAGES_SEND:
              messages =[...state.all,action.message]
                return {
                  ...state,
                  all: messages
                }

    default:
      return state
  }
}
export default combineReducers({
  messages
})
