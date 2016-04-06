import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PostsActions from '../actions/posts.js'

import PostsList from './PostsList.jsx'
import LogoutButton from './LogoutButton.jsx'

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    return (
      <div>
        <h1>Posts:</h1>
        {
          this.props.posts.fetching ? <p>Wait...</p> : (
            this.props.posts.error ? <p>Error!</p> : (
              this.props.posts.elements ? <PostsList posts={ this.props.posts.elements } /> : null
            )
          )
        }
        <LogoutButton />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)