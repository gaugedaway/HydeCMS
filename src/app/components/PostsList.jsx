import React from 'react'

import PostRow from './PostRow.jsx'

export default function PostsList({ posts }) {
  return (
    <div>
      <ul>
        { posts.map(post => <li key={ post.sha }><PostRow post={ post } /></li>) }
      </ul>
    </div>
  )
}