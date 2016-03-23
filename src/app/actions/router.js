export const CHANGE_PAGE = 'CHANGE_PAGE'

export function changePage(id) {
  return {
    type: CHANGE_PAGE,
    id: id
  }
}