const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPerson} >
        <div>
          {/* At input we take the value as newName in our useState, once the user starts putting data on field, personName function is called*/}
          {props.name} <input 
          value={props.nameValue}
          onChange={props.nameChange} 
          />
        </div>
        <div>
        {/* At input we take the value as newName in our useState, once the user starts putting data on field, personNumber function is called*/}
          {props.number} <input 
          value={props.numberValue}
          onChange={props.numberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm