const express = require('express')
const {
  createIdea,
  getIdeas,
  getIdea,
  deleteIdea,
  updateIdea
} = require('../controllers/ideaController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all idea routes
router.use(requireAuth)

// GET all ideas
router.get('/', getIdeas)

//GET a single Idea
router.get('/:id', getIdea)

// POST a new idea
router.post('/', createIdea)

// DELETE a idea
router.delete('/:id', deleteIdea)

// UPDATE a idea
router.patch('/:id', updateIdea)


module.exports = router