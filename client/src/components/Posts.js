 import React   from 'react';
//  import axios from 'axios';  

 const Posts = (props) => {
  
//   const url = `http://localhost:4000/api/posts/${id}`;

  
 
//   const handleDelete = () => {

  
  
 
// axios
// .delete(url)
// .then(res => {

// console.log("APP", res.data)

// })
// .catch(error => {
// console.log('Something went wrong', error)
// })
// }

 

  return (
    <div className="posts-container"> 
      <h1>Posts</h1>
      <div className="posts">
      <ul>
      {props.posts.map(post => {
        return (
        <li 
          key={post.id}>
          {post.id}<br/>
          {post.title}<br/>
          {post.contents}<br/>
          {post.created_at}<br /> 
        <button 
          onClick= {props.deleteData}>
            Delete
              </button>
        </li>
        )
      })}</ul>
      </div>
    </div>
  )
  }
 
  export default Posts;