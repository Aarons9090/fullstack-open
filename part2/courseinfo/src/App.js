

const Header = ({ name }) => <div><h1>{name}</h1></div>

const Content = ({ parts }) => {
  return <div>
    {parts.map(part =>
      <Part key={part.id} part={part.name} exercises={part.exercises} />)}
  </div>

}

const Part = ({ part, exercises }) => <div><p>{part} {exercises}</p></div>

const Total = ({ parts }) => {
  //calculate total sum
  const value = parts.reduce( (sum, part) => sum + part.exercises, 0)
  
  return (
    <div>
      <h4>Number of exercises {value}</h4>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>

  )
}

export default App