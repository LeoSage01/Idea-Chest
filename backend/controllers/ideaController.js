const Idea = require('../models/ideaModel')
const mongoose = require('mongoose')

// get all ideas
const getIdeas = async (req, res) => {
  const user_id = req.user.id

  const ideas = await Idea.find({user_id}).sort({createdAt: -1})

  res.status(200).json(ideas)
}

// get a single idea
const getIdea = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such idea'})
  }

  const idea = await Idea.findById(id)

  if (!idea) {
    return res.status(404).json({error: 'No such idea'})
  }
  
  res.status(200).json(idea)
}


// create new idea
const createIdea = async (req, res) => {
  const {title, note} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!note) {
    emptyFields.push('note')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const idea = await Idea.create({title, note, user_id})
    res.status(200).json(idea)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a idea
const deleteIdea = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such idea'})
  }

  const idea = await Idea.findOneAndDelete({_id: id})

  if (!idea) {
    return res.status(400).json({error: 'No such idea'})
  }

  res.status(200).json(idea)
}

// update a idea
const updateIdea = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such idea'})
  }

  const idea = await Idea.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!idea) {
    return res.status(400).json({error: 'No such idea'})
  }

  res.status(200).json(idea)
}


module.exports = {
  getIdeas,
  getIdea,
  createIdea,
  deleteIdea,
  updateIdea
}