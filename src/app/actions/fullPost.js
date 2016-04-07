import { getFileByUrl } from '../github.js'
import { parseFileWithFontMatter } from '../parsingFunctions.js'

export const FETCH_FULL_POST_START = 'FETCH_FULL_POST_START'
export const FETCH_FULL_POST_SUCCESS = 'FETCH_FULL_POST_SUCCESS'
export const FETCH_FULL_POST_ERROR = 'FETCH_FULL_POST_ERROR'
export const FETCH_FULL_POST_CANCEL = 'FETCH_FULL_POST_CANCEL'

export function fetchFullPostStart(sha) {
  return {
    type: FETCH_FULL_POST_START,
    payload: sha
  }
}

export function fetchFullPostSuccess(post) {
  return {
    type: FETCH_FULL_POST_SUCCESS,
    payload: post
  }
}

export function fetchFullPostError(error) {
  return {
    type: FETCH_FULL_POST_ERROR,
    payload: error
  }
}

export function fetchFullPostCancel() {
  return {
    type: FETCH_FULL_POST_CANCEL
  }
}

export function fetchFullPost(sha) {
  return async (dispatch, getState) => {
    try {
      let { token, login } = getState().account
      let post = getState().posts.elements.find(post => post.sha === sha)
      if(!post) throw new Error(`No post with such sha: ${ sha }`)
      dispatch(fetchFullPostStart(post.sha))

      let content = await getFileByUrl(post.url, token)
      content = Unibabel.base64ToUtf8(content.content)
      post = parseFileWithFontMatter(content)
      if(getState().fullPost.fetching === sha) dispatch(fetchFullPostSuccess(post))
    }
    catch(e) {
      if(getState().fullPost.fetching === sha) dispatch(fetchFullPostError(e))
    }
  }
}