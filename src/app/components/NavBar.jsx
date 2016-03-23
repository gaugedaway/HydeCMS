import React from 'react'

export default function NavBar({ onChange, pages }) {
  return (
    <div>
      { pages.map(page => <button key={ page.id } onClick={ e => onChange(page.id) }>{ page.name }</button>) }
    </div>
  )
}