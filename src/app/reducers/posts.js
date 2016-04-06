import * as PostsActions from '../actions/posts.js'

export default function posts(state = { elements: null, error: null, fetching: false }, action) {
  switch (action.type) {
    case PostsActions.FETCH_POSTS_START:
      return Object.assign({}, state, {
        fetching: true
      })

    case PostsActions.FETCH_POSTS_SUCCESS:
      return {
        elements: action.payload,
        error: null,
        fetching: false
      }

    case PostsActions.FETCH_POSTS_ERROR:
      return {
        elements: null,
        error: action.payload,
        fetching: false
      }

    case PostsActions.FETCH_POSTS_CANCEL:
      return Object.assign({}, state, {
        fetching: false
      })

    default:
      return state
  }
}