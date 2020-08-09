 import React, {useState} from 'react';
 import axios from 'axios';

 const Posts = () => {
      const [state, setstate] = useState(initialState)

      axios
        .get('http://localhost:8888/api/posts')
        .then((res)=> {
            console.log("AXIOS", res.data)
            setstate({res})
        })  
        .catch(()=> {

        })
 }
feel 