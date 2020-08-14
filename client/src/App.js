import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Posts from './components/Posts';
import axios from 'axios';

function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/posts')
      .then(res => {
      console.log("APP", res.data)
      setPosts(res.data)
     
    })
    .catch(error => {
      console.log('Something went wrong', error)
  
    })
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        NODE API 2
        </p>
       
      </header>
      <Posts posts={posts} id={posts.id}  />
    </div>
  );
}

export default App;
