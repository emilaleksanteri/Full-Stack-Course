import { useState, forwardRef, useImperativeHandle } from 'react'
import propTypes from 'prop-types'

const ToggleVisibility = forwardRef((props, refs) => {
  const [visibility, setVisibility] = useState(false)

  const hideChild = { display: visibility ? 'none' : '' }
  const showChild = { display: visibility ? '' : 'none' }

  const toggleState = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleState
    }
  })

  return (
    <div>
      <div style={hideChild}>
        <button onClick={toggleState}>{props.buttonLabel}</button>
      </div>
      <div style={showChild}>
        {props.children}
        <button onClick={toggleState}>cancel</button>
      </div>
    </div>
  )
})

ToggleVisibility.displayName = 'ToggleVisibility'

ToggleVisibility.propTypes = {
  buttonLabel: propTypes.string.isRequired
}

export default ToggleVisibility