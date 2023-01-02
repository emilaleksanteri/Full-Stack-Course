import AnecdoteForm from './components/NewAnecdote'
import AnecodeList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <AnecdoteForm />
      <AnecodeList />
    </div>
  )
}

export default App