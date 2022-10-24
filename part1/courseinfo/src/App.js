const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content part1={course.parts[0].name} part2={course.parts[1].name} part3={course.parts[2].name} 
               exercise1={course.parts[0].exercises} exercise2={course.parts[1].exercises} exercise3={course.parts[2].exercises} />
      <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return (
    <div>
      <Part content={props.part1} exercises={props.exercise1} />
      <Part content={props.part2} exercises={props.exercise2} />
      <Part content={props.part3} exercises={props.exercise3} />
    </div>
  )
}


const Part = (props) => {
return <p>Name of the course: {props.content} - {props.exercises} Exercises</p>
}

const Total = (props) => {
  return <p>Total number of exercises: {props.total}</p>
}

export default App