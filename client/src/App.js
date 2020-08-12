import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Posts from './components/Posts';
import axios from 'axios';
import  AddPost from './components/AddPost';
 



function App() {

  const [posts, setPosts] = useState([])
 
   useEffect(() => {
    axios
      .get('http://localhost:4000/api/posts')
      .then(res => {
      console.log("APP", res.data)
      setPosts(res.data)
     
    })
    .catch(error => {
      console.log('Something went wrong', error)
  
    })
  },[])

  const id = posts.id;
 

    const deleteData = e => {
 
    e.preventDefault();
 
   
      const url = 'http://localhost:4000/api/posts/';
     axios
       .delete(url+id)
       .then(data => {
        console.log("APP", data)
       })
       .catch(error => {
         console.log(error)
       })
    }

return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Node Api2 Project
      </header>
      <AddPost />
      <Posts posts={posts} deleteData={deleteData} id={posts.id}/>
     
    </div>
)
} 



export default App;
