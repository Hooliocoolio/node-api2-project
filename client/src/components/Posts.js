import React from 'react';


const Posts = (props) => {
    return (
    <div className="posts-container"> 
    <h1>Posts</h1>
    <div className="posts">
    <ul>
    {props.posts.map(post => {
        return (
        <li key={post.id}>
        {post.id}<br/>
        {post.title}<br/>
        {post.contents}<br/>
        {post.created_at}<br /> 
     
      </li>
    )
      })}</ul>
    </div>
    </div>
    )
    }


export default Posts;