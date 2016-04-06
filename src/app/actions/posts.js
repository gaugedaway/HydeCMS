import * as Github from '../github.js'
import { parsePostFilename } from '../parsingFunctions.js'

export const FETCH_POSTS_START = 'FETCH_POSTS_START'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR'
export const FETCH_POSTS_CANCEL = 'FETCH_POSTS_CANCEL'

export function fetchPostsStart() {
  return {
    type: FETCH_POSTS_START
  }
}

export function fetchPostsSuccess(posts) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts
  }
}

export function fetchPostsError(error) {
  return {
    type: FETCH_POSTS_ERROR,
    payload: error
  }
}

export function fetchPostsCancel() {
  return {
    type: FETCH_POSTS_CANCEL
  }
}

export function fetchPosts() {
  return async (dispatch, getState) => {
    dispatch(fetchPostsStart())
    let { token, login } = getState().account

    try {
      let filesList = await Github.getDir('/_posts', token, login, login + '.github.io')
      filesList = filesList.filter(file => parsePostFilename(file.name)).map(file => {
        return Object.assign({}, parsePostFilename(file.name), {
          url: file.url,
          sha: file.sha
        })
      })
      dispatch(fetchPostsSuccess(filesList))
    }
    catch(e) {
      dispatch(fetchPostsError)
    }
  }
}