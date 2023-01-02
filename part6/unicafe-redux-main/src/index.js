import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const actionGoodOkBadReset = (action) => {
    store.dispatch({
      type: action
    })
  }

  return (
    <div>
      <button onClick={() => actionGoodOkBadReset('GOOD')}>good</button>
      <button onClick={() => actionGoodOkBadReset('OK')}>ok</button>
      <button onClick={() => actionGoodOkBadReset('BAD')}>bad</button>
      <button onClick={() => actionGoodOkBadReset('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)