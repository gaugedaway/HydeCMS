import React from 'react'
import { Link } from 'react-router'

export default function PostRow({ post }) {
  return (
    <div>
      <strong>{ post.title }</strong> - <em>{ post.date.toDateString() }</em>&nbsp;
      <Link to={ `/posts/edit/${ post.sha }` }>edit</Link>
    </div>
  )
}