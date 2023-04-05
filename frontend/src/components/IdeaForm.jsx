import { useState } from "react"
import { useIdeasContext } from "../hooks/useIdeasContext"
import { useAuthContext } from "../hooks/useAuthContext"

const IdeaForm = () => {
  const { dispatch } = useIdeasContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {

    if (!user) {
      setError('You must be logged in')
      return
    }

    const idea = {title, note}

    const response = await fetch('http://localhost:4000/api/ideas', {
      method: 'POST',
      body: JSON.stringify(idea),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setNote('')
      setError(null)
      setEmptyFields([])
      console.log('new idea added', json)
      dispatch({type: 'CREATE_IDEA', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Idea</h3>

      <label>Idea Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Note:</label>
      <textarea 
        type="text"
        rows={6}
        onChange={(e) => setNote(e.target.value)}
        value={note}
        className={emptyFields.includes('note') ? 'error' : ''}
      />

      <button>Add Idea</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default IdeaForm