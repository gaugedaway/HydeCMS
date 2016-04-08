import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { markdown } from 'markdown'
import TinyMCE from 'react-tinymce'

import * as FullPostActions from '../actions/fullPost.js'

class EditPost extends React.Component {
  constructor(props) {
    super(props)
  }

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
              <TinyMCE config={{ height: 600 }} content={ markdown.toHTML(this.props.post.content) } />
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