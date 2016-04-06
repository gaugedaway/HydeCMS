import React from 'react'

export default function PostRow({ post }) {
  return (
    <div>
      <strong>{ post.title }</strong> - <em>{ post.date.toDateString() }</em>&nbsp;
    </div>
  )
}