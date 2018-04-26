export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export function fetchMessages() {
  return async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    const json = await response.json()
    dispatch({
      type: MESSAGES_RECEIVED,
      messages: json._embedded.messages
    })
  }
}
export const MESSAGE_BODY_REQUEST_STARTED = 'MESSAGE_BODY_REQUEST_STARTED'
export const MESSAGE_BODY_REQUEST_SUCCESS = 'MESSAGE_BODY_REQUEST_SUCCESS'
export const fetchMessageBody = (id) => {
  return async (dispatch, getState) => {
    const message = getState().messages.id[id]
    dispatch({ type: MESSAGE_BODY_REQUEST_STARTED })

    const response = await fetch(message._links.self.href)
    const json = await response.json()

    dispatch({
      type: MESSAGE_BODY_REQUEST_SUCCESS,
      id,
      body: json.body
    })

    dispatch(markAsRead(message));
  }
}

export const MESSAGES_TOGGLE_COMPOSE = 'MESSAGES_TOGGLE_COMPOSE'
export function toggleComposMessage(requestData) {
  return async (dispatch) => {
    dispatch({
      type: MESSAGES_TOGGLE_COMPOSE
    })
  }
}

export const MESSAGE_SELECTION_TOGGLE = 'MESSAGE_SELECTION_TOGGLE'
export function selectMessage(id){
  return {
    type:MESSAGE_SELECTION_TOGGLE,
    id
  }
}

export const SELECT_ALL = 'SELECT_ALL'
export const UNSELECT_ALL = 'UNSELECT_ALL'
export function handleSelectAll(isAllMessagesSelected){
  if (isAllMessagesSelected){
    return{
      type:UNSELECT_ALL
    }
  }
  else {
  return {
    type:SELECT_ALL
  }
  }
}
export const MESSAGE_STAR_TOGGLE = 'MESSAGE_STAR_TOGGLE'
export function handleStarChange(id, starred){
  return async (dispatch) => {
       await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
           method: 'PATCH',
           body: JSON.stringify({
               messageIds: [id],
               command: 'star',
               star: !starred
           }),
           headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json',
             }
         });
         dispatch({
             type: MESSAGE_STAR_TOGGLE,
             id
         });
       }
      }
export const MESSAGES_SEND = 'MESSAGES_SEND'
export function sendMessage(subject, body, history) {
  return async (dispatch) => {
   const response=  await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
       method: 'POST',
       body: JSON.stringify({subject, body}),
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
       }
     })
     const json = await response.json()
    dispatch({
      type: MESSAGES_SEND,
      message: json
    })
    dispatch({
      type: MESSAGES_TOGGLE_COMPOSE
    })
    // history.push("/")
  }
}


export const MESSAGES_DELETE = 'MESSAGES_DELETE';
export function deleteSelected(messages) {
  return async (dispatch) => {
       await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
           method: 'PATCH',
           body: JSON.stringify({
               messageIds: messages.filter(message => message.selected)
                   .map(msg => msg.id),
               command: 'delete'
           }),
           headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json',
           }
       });
       dispatch({
           type: MESSAGES_DELETE
       });
   }
    }


export const APPLY_LABEL = 'APPLY_LABEL';
export function applyLabel(labelName, messages) {
    if (labelName !== 'Apply label') {
        return async (dispatch) => {
            await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
                method: 'PATCH',
                body: JSON.stringify({
                    messageIds: messages.filter(message =>
                        (message.selected
                        && !message.labels.some(label => (label === labelName))))
                        .map(msg => msg.id),
                    command: 'addLabel',
                    label: labelName
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            dispatch({
                type: APPLY_LABEL,
                labelName
            });
        }
    }
}

export const REMOVE_LABEL = 'REMOVE_LABEL';
export function removeLabel(labelName, messages) {
    if (labelName !== 'Remove label') {
        return async (dispatch) => {
            await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
                method: 'PATCH',
                body: JSON.stringify({
                    messageIds: messages.filter(message => message.selected).map(msg => msg.id),
                    command: 'removeLabel',
                    label: labelName
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            dispatch({
                type: REMOVE_LABEL,
                labelName
            });
        }
    }
}
export const MARK_AS_READ = 'MARK_AS_READ';
export function markAsRead(messages) {
    return async (dispatch) => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: messages.filter(message => message.selected)
                    .map(msg => msg.id),
                command: 'read',
                read: true
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        dispatch({
            type: MARK_AS_READ,
        });
    }
}

export const MARK_AS_UNREAD = 'MARK_AS_UNREAD';
export function markAsUnread(messages) {
    return async (dispatch) => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: messages.filter(message => message.selected)
                    .map(msg => msg.id),
                command: 'read',
                read: false
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        dispatch({
            type: MARK_AS_UNREAD
        });
    }
}
