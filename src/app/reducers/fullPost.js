import * as FullPostActions from '../actions/fullPost.js'

export default function fullPost(state = { post: null, error: null, fetching: null }, action) {
  switch(action.type) {
    case FullPostActions.FETCH_FULL_POST_START:
      return Object.assign({}, state, {
        fetching: action.payload
      })

    case FullPostActions.FETCH_FULL_POST_SUCCESS:
      return {
        post: action.payload,
        error: null,
        fetching: null
      }

    case FullPostActions.FETCH_FULL_POST_ERROR:
      return {
        post: null,
        error: action.payload,
        fetching: null
      }

    case FullPostActions.FETCH_FULL_POST_CANCEL:
      return Object.assign({}, state, {
        fetching: null
      })

    default:
      return state
  }
}