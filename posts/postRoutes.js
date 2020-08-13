const express = require('express')
const router  = express.Router();
const base = require('../data/db')
 

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// POST  create post with info sent inside the body
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.post('/api/posts', (req, res)=> {
    const title = req.body.title;
    const contents = req.body.contents;
    const posts = req.params
    base.insert(req.body)
            .then(post => {
                if (! title || !contents) {
                    res.status(400).json({
                        BADREQUEST: 'Please provide title and contents for the post'
                         })
                } else (post) => {
                    res.status(201).json(posts)
                }
            })
            .catch(error => {
                res.status(500).json({ 
                    SERVERERROR: 'There was an error while saving the post to the database' })
            })
        })
          

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// POST creates comment for the post with the specified ID
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.post('/api/posts/:id/comments', (req, res) => {
    const body = req.body;
    const id = req.params.id;
    
    if (!body.text || !body.post_id) {
        res.status(400).json({
            errorMessage: "Please provide text for the comment or post id."
        })
    } else if (body.post_id != id){
        res.status(401).json({
            errorMessage: 'Post_id must match post.'
        })
    } else 
    base.findById(id)
        .then(post => {
            if (post) {
                base.insertComment(body)
                    .then(comment => {
                         res.status(201).json(comment)
                    })
                    .catch(error => {
                        res.status(500).json({
                            error: "There was an error while saving the comment to the database"
                        });
                })
            } else {
                res.status(400).json({error: `Could not find post with id ${id}`})
            }
        }) 
    })


    
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// GET  returns an array of all the posts objects contained in Database
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.get('/api/posts', (req, res) => {
    base.find(req.params)
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((error) =>{
        res.status(500).json({
            SERVERERROR: 'Error Retrieving Posts'
        })
    })
})

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// GET returns the post from specified ID
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.get('/api/posts/:id', (req, res) => {
     base.findById(req.params.id)
    .then((posts) => {
        if (!posts) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else (posts)
        res.status(200).json(posts)
    })
    .catch((error) =>{
        res.status(500).json({
            SERVERERROR: 'Error Retrieving Post'
        })
    })
})

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// GET returns an array of all the comment objects with post specified ID
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.get('/api/posts/:id/comments', (req, res) => {
    base.findCommentById(req.params.id)
        .then(comments => {
            if (comments) {
                res.status(200).json(comments)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }            
        })
        .catch(error => {
            res.status(500).json({
                error: "The comments information could not be retrieved."
            })
        })
})

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// DELETE removes post with specified ID returns the deleted post object
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.delete('/api/posts/:id', (req, res) => {
    base.remove(req.params.id) 
    .then(posts => {
        if(!posts) {
            res.status(404).json({ Message: 'That post does not exist in the system'})
        } else {
            res.status(200).json({Message : "Post was deleted"})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({SERvERERROR:'There was a problem removing the post'})
    })
})

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// PUT updates the post with specified ID using data from requestbody
// returns the modified object not the original
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
router.put('/api/posts/:id', (req, res) => {
    const changes = req.body;
    const {title, contents} = req.body;

    if (!title || !contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }

    base.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }            
        })
        .catch(error => {
         console.log(error)
            res.status(500).json({
                error: "The post information could not be modified."
            })
        })
})

module.exports = router;