import { IdeasContext } from "../context/IdeasContext"
import { useContext } from "react"

export const useIdeasContext = () => {
  const context = useContext(IdeasContext)

  if(!context) {
    throw Error('useIdeasContext must be used inside an IdeasContextProvider')
  }

  return context
}