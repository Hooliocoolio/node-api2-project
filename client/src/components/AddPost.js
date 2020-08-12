import React, {useState} from 'react';
import axios from 'axios';

const AddPost = (props) => {

const [posts, setPosts] = useState({})

 const handleChange = (e) => {
     setPosts({ ...posts, [e.target.name]: e.target.value})
 }


 const handleSubmit = (e) => {
     e.preventDefault();
        axios
          .post('http://localhost:4000/api/posts')
          .then(res => {
          console.log("APP", res.data)
          setPosts({
              title: res.title,
            contents: res.contents          
        })
         
        })
        .catch(error => {
          console.log('Something went wrong', error)
      
        })
    }


    return ( 
        <div className='add-post-form'>
        <form onSubmit={handleSubmit}>
            <label>Title of Movie</label>
            <input 
                type = "text"
                name = "title"
                onChange = {handleChange}
                placeholder="enter name of movie"
              /><br/>
               <label>Quote</label>
            <input 
                type = "text"
                name = "contents"
                onChange = {handleChange}
                placeholder="Enter the quote"
              />
             <br />
             <button>Submit</button>
        </form>

        </div>
     );
}
 
export default AddPost;