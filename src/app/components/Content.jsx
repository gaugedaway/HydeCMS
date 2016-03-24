import React from 'react'


function Content({ page }) {
  switch(page) {
    case 'main':
      return <h1>This is the main page's content</h1>
      
    case 'second':
      return <h1>This is the second page's content</h1>
      
    default:
      return <h1>Error: page not found!</h1>
  }
}