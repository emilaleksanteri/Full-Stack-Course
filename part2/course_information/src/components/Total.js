const Total = ({ total }) => {
    // return an object from reduce by using the {} around the augmented object
    // inside the object exercises, we will add they keys of the array object passed in
    const sum = total.reduce((s, p) => {return {exercises: s.exercises + p.exercises};})

   // returning a bolded paragraph element with the object sum and specifying exercises key to be returned 
    return (
        <b>total of {sum.exercises} exercises</b>
    )
}
    
export default Total