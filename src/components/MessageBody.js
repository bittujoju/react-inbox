import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchMessageBody} from '../actions'
import {withRouter} from 'react-router-dom'

export class MessageBody extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    console.log("test", this.props);
    fetchMessageBody(this.props.id)

    }

  render() {
    return (
      <div className="row message-body">
        <div className="col-xs-11 col-xs-offset-1">test
          { this.props.body }
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, { id }) => {
  const messages = state.messages.id;

  const { body } = messages.filter(message => message.id === id)
  return {
    id,
    body
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMessageBody
}, dispatch)
console.log("#####", mapDispatchToProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBody)
