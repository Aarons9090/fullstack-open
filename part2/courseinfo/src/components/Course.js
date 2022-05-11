
const Header = ({ name }) => <div><h2>{name}</h2></div>

const Content = ({ parts }) => {
  // map courses to Part modules
  return <div>
    {parts.map(part =>
      <Part key={part.id} part={part.name} exercises={part.exercises} />)}
  </div>

}

const Part = ({ part, exercises }) => <div><p>{part} {exercises}</p></div>

const Total = ({ parts }) => {
  //calculate total sum
  const value = parts.reduce((sum, part) => sum + part.exercises, 0)

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

  export default Course