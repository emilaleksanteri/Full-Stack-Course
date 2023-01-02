const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      let goodState = {...state} // copy of state objext
      goodState = { ...goodState, good: goodState.good += 1} // 
      state = {...goodState}
      return state
    case 'OK':
      let okState = {...state}
      okState = { ...okState, ok: okState.ok += 1}
      state = {...okState}
      return state
    case 'BAD':
      let badState = {...state}
      badState = { ...badState, bad: badState.bad += 1}
      state = {...badState}
      return state
    case 'ZERO':
      state = initialState
      return state
    default: return state
  }
  
}

export default counterReducer