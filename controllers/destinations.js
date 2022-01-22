const router = require('express').Router()
const destinations = require('../models/destinations')

router.get("/", (req, res) => {
    res.send(destinations)
})

//Get by index
router.get("/:id", (req, res) => {
    let id = Number(req.params.id)
    let destinationIndex = destinations.findIndex(t => t.id === id)
    if(destinationIndex === -1){
        res.status(404)
            .send(`resource not found with id: ${id}`)
    }
    else {
        res.send(destinations[destinationIndex])
    }
    
})
    
//create
router.post("/", (req, res) => {
    try {

        let newdestination = req.body
        destinations.push(newdestination)
        
        res.status(201)
            .send({id: newdestination.id})
    } catch (error) {
        console.log(error)
        res.status(400)
            .send("Bad request")
    }
    
})

//update
router.put("/:id", (req, res) => {
    let id = Number(req.params.id)
    if(isNaN(id)){
        res.status(400)
            .send("id must be a number")
    }
    let destinationIndex = destinations.findIndex(t => t.id === id)
    if(destinationIndex === -1){
        res.status(404)
            .send(`resource not found with id: ${id}`)
    }
    let destination = destinations[destinationIndex]
    //TODO: update the destination
    res.send(destination)
})

//delete
router.delete("/:id", (req, res) => {
    let id = Number(req.params.id)
    if(isNaN(id)){
        res.status(400)
            .send("id must be a number")
    }
    let destinationIndex = destinations.findIndex(t => t.id === id)
    if(destinationIndex === -1){
        res.status(404)
            .send(`resource not found with id: ${id}`)
    }
    //remove now that we are valid
    destinations = destinations.filter(t => t.id !== id)
    res.send(`resource removed with id: ${id}`)
})

//export router
module.exports = router;