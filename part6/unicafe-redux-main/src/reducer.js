const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      const goodState = {...state}
      const newGood = { ...goodState, good: goodState.good += 1}
      state = {...newGood}
      return state
    case 'OK':
      const okState = {...state}
      const newOk = { ...okState, ok: okState.ok += 1}
      state = {...newOk}
      return state
    case 'BAD':
      const badState = {...state}
      const newBad = { ...badState, bad: badState.bad += 1}
      state = {...newBad}
      return state
    case 'ZERO':
      state = initialState
      return state
    default: return state
  }
  
}

export default counterReducer