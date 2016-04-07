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