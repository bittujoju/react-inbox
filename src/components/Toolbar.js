import React from 'react'
import ComposingForm from './ComposingForm'

const Toolbar = ({
                     messages,
                     handleAddMessage,
                     handleToolbarMessageCheckboxClick,
                     handleMarkAsRead,
                     handleMarkAsUnread,
                     handleRemoveMessages,
                     handleApplyLabel,
                     handleRemoveLabel,
                     handleDeleteMessages
                 }) => {

    let isMessagesSelected = true
    let checkedMessagesStyle = "fa fa-minus-square-o"
    let selectedMessages = messages.filter(message => message.selected === true)
    if (selectedMessages.length === 0) {
        isMessagesSelected = false
        checkedMessagesStyle = "fa fa-square-o"
    } else if (selectedMessages.length === messages.length) {
        checkedMessagesStyle = "fa fa-check-square-o"
    }
    const unreadMessages = messages.filter(message => message.read === false)
    const buildMessage = (e) => {
      e.preventDefault()
      document.getElementById("composing-form").style.display = "none"
      const message = {subject: e.target.subject.value, body: e.target.body.value}
      handleAddMessage(message)
    }
    const closeComposeForm = (e) => {
      e.preventDefault()
      document.getElementById("composing-form").style.display = "inline"
      document.getElementById("subject").value = ""
      document.getElementById("body").value = ""
    }
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unreadMessages.length} </span>
                  {unreadMessages.length === 1 ? `unread message` : `unread messages`}
          </p>

    <a className="btn btn-danger" onClick={closeComposeForm}>
      <i className="fa fa-plus"></i>
    </a>

    <button className="btn btn-default" onClick={handleToolbarMessageCheckboxClick}>
                    <i className={checkedMessagesStyle}></i>
    </button>

    <button className="btn btn-default" disabled={!isMessagesSelected} onClick={handleMarkAsRead}>
      Mark As Read
    </button>

    <button className="btn btn-default" disabled={!isMessagesSelected} onClick={handleMarkAsUnread}>
      Mark As Unread
    </button>

    <select className="form-control label-select" disabled={!isMessagesSelected}
                        value="Apply label"
                        onChange={handleApplyLabel}>
      <option>Apply label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <select className="form-control label-select"  disabled={!isMessagesSelected}
                    value="Remove label"
                    onChange={handleRemoveLabel}>
      <option>Remove label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <button className="btn btn-default" disabled={!isMessagesSelected} onClick={handleDeleteMessages}>
                    <i className="fa fa-trash-o"></i>
                </button>
  </div>
  <div id="composing-form" className="composing-form">
  <ComposingForm
    buildMessage={buildMessage}
  />
</div>
</div>

    )
}

export default Toolbar;
