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
      toggleState,
    }
  })

  return (
    <div>
      <div style={hideChild}>
        <button onClick={toggleState} className='mx-5 text-xl text-zinc-100 font-extrabold hover:text-green-500 border-2 rounded-md
        border-zinc-100 hover:border-green-500 p-2'
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showChild}>
        {props.children}
        <button onClick={toggleState} className='mx-5 text-xl text-zinc-100 font-extrabold hover:text-rose-500 border-2 rounded-md
        border-zinc-100 hover:border-rose-500 p-2'
        >
          cancel
        </button>
      </div>
    </div>
  )
})

ToggleVisibility.displayName = 'ToggleVisibility'

ToggleVisibility.propTypes = {
  buttonLabel: propTypes.string.isRequired,
}

export default ToggleVisibility
