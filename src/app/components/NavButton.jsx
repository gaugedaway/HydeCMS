import React from 'react'


export default function NavButton({ onClick, title, disabled }) {
  return <button onClick={ onClick } disabled={ disabled } >{ title }</button>
}