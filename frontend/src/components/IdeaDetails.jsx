import { useIdeasContext } from '../hooks/useIdeasContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const IdeaDetails = ({ idea }) => {
  const { dispatch } = useIdeasContext()
  const { user } = useAuthContext() 

  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch('http://localhost:4000/api/ideas/' + idea._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_IDEA', payload: json})
    }
  }

  return (
    <div className="idea-details">
      <h4>{idea.title}</h4>
      <p><strong>Note: </strong>{idea.note}</p>
      <p>{formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default IdeaDetails