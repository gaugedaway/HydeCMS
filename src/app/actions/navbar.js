export const SHOW_NAVBAR = 'SHOW_NAVBAR'
export const HIDE_NAVBAR = 'HIDE_NAVBAR'

export function showNavBar() {
  return {
    type: SHOW_NAVBAR
  }
}

export function hideNavBar() {
  return {
    type: HIDE_NAVBAR
  }
}