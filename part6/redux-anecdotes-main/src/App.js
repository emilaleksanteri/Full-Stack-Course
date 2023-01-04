import AnecdoteForm from './components/NewAnecdote'
import AnecodeList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <AnecodeList />
      <AnecdoteForm />
    </div>
  )
}

export default App