import React from 'react'

const Message = ({
                     id,
                     message,
                     checkboxChange,
                     starChange,
                     messageBodyChange
                 }) => {

    let rowStyle = "row message"
    let bodyRowStyle = "row message-body collapsed"
    if (message.expanded === true) {
        bodyRowStyle = "row message-body"
    }
    if (message.selected === true) {
        rowStyle += " selected"
    }
    if (message.read === true) {
        rowStyle += " read"
    } else {
        rowStyle += " unread"
    }

    let starStyle = "star fa fa-star"
    if (message.starred !== true) {
        starStyle += "-o"
    }

    return (
      <div>
        <div className={rowStyle} >
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input
                            type="checkbox"
                            name="checkbox"
                            onChange={(e) => checkboxChange(e, id)}
                            checked={message.selected ? true : false}
                        />
                    </div>
                    <div className="col-xs-2">
                        <i className={starStyle} onClick={(e) => starChange(e, id)}></i>
                    </div>
                </div>
            </div>
            <div className="col-xs-11" onClick={(e) => messageBodyChange(e, id)}>
                {message.labels.map((msg, i) =>
                    <span key={i} className="label label-warning">{msg}</span>
                )
                }
                <a href="#">
                    {message.subject}
                </a>
            </div>
        </div>
        <div className={bodyRowStyle}>
            {message.body}

        </div>
      </div>
    )
}

export default Message
