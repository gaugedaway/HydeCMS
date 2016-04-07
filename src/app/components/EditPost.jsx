import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { markdown } from 'markdown'

import * as FullPostActions from '../actions/fullPost.js'

class EditPost extends React.Component {
  componentDidMount() {
    this.props.fetchFullPost(this.props.params.sha)
  }

  componentWillUnmount() {
    this.props.fetchFullPostCancel()
  }

  render() {
    return (
      <div>
        {
          this.props.post ? (
            <div>
              <h1>{ this.props.post.title }</h1>
              <div dangerouslySetInnerHTML={{ __html: markdown.toHTML(this.props.post.content) }}></div>
            </div>
          )

          : null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    post: state.fullPost.post
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FullPostActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)