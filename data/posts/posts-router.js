const express = require("express");
const router = express.Router();
const db = require('../db');
const { response } = require("express");
 
// const dbpost = require('../posts/postsRouter');

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//  Creates a post using the information sent inside the `request body
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.post("/api/posts", (req, res) => {
    db.insert(req.body)
    .then(posts => {
        if (posts) {
            res.status(201).json(posts);
        } else {
            res.status(400).json({
                errorMessage: "Please provide title and contents for the post."
            });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "There was an error while saving the post to the database"
        });
    });
});

               

// //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// // Creates a comment for the post with the specified id using information sent 
// // inside of the `request body
// //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.post('/api/posts/:id/comments', (req, res) => {
    db.insertComment(req.params.id)
    .then(post => {
        if (post) {
            res.status(201).json(post);
        } else if (!req.body.id) {
            res.status(400).json({ 
                message: "The post with the specified ID does not exist." 
            });
            } else {
             res.status(404).json({ 
                message: "The post with the specified ID does not exist."
            });
        }
    })
          .catch(error => {
            console.log(error);
            res.status(500).json({
              error: "There was an error while saving the comment to the database"
            });
          });
      });
      


//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Returns an array of all the post objects contained in the database
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.get('/api/posts', (req, res) => {
          db.find(req.params)
      .then((posts) => {
          res.status(200).json(posts)
      })
      .catch((error) => {
          console.log(error)
          res.status(500).json({
              message: "Error retrieving posts"
          })
      })
     
  })

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Returns the post object with the specified id
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
      .then((post) => {
        if (post) {
            res.status(200).json(post) 
        } else if (post === []) {
            res.status(404).json({ 
                message: 'Post not found' 
            })
          } else {
            return post;
          }

      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ 
            errorMessage: 'Error getting post by ID'
        });
      })
  });


//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Returns an array of all the comment objects associated with the post with 
// the specified id
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.get('/api/posts/:id/comments', (req, res) => {
    const id = req.params.id;
    db.findPostComments(id)
      .then(post => {
        if(post.length === 0) {
          res.status(404).json({ message: 'Post not found' });
        } else {
          res.status(200).json(post)
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ errorMessage: 'Server error, could not get comments'})
      })
  })

 //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 // Removes the post with the specified id and returns the **deleted post 
 // object**. You may need to make additional calls to the database in order 
 // to satisfy this requirement.
 //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 router.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;
 
  // If the post with the specified id is not found:
    db.findById(id).then((post) => {
      console.log(post)
    if (post.length === 0) {
      res.status(404).json({
        errorMessage: "The post with the specified ID does not exist",
      });
    } else if (post.length > 0) {
      db.remove(id).then((removed) => {
        if (removed=== 1) {
          db.find().then((post) => {
            if (post) {
              res.status(200).json(post);
              // If there's an error in retrieving the posts from the database:
            }
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: "The post could not be removed" });
        }
      });
    }
  });
});
  //     let id = req.params.id;
  //   db.remove(id)
  //     .then(res => {
  //       console.log('App', id)
  //       if(id) {
  //         res.status(200).json({ message: 'Post deleted!' })
  //       } else {
  //         res.status(404).json({ message: 'Post could not be located.' })
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json({ message: '** Server error removing the post **', error })
  //     })
  // });

 //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 // Updates the post with the specified `id` using data from the `request body`. 
 // Returns the modified document, **NOT the original**
 //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 router.put('/api/posts/:id', (req, res) => {
    const changes = req.body;
    db.update(req.params.id, changes)
      .then(post => {
        { post ? res.status(200).json(post) : res.status(404).json({ message: 'Post could not be found' })}
      })
      .catch(error => {
        res.status(500).json({ errorMessage: '** Server error updating the post **', error });
      })
  });

module.exports = router