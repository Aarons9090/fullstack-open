import { updateFilter } from "../reducers/filterReducer"
import { connect } from "react-redux"

const Filter = (props) => {

    const handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      event.preventDefault()
      const content = event.target.value
      props.updateFilter(content)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  const mapDispatchToProps = {
    updateFilter,
  }

  const mapStateToProps = (state) => {
    return {
      filter: state.filter
    }
  }

  const ConnectedFilter = connect(
    mapStateToProps,
    mapDispatchToProps
    )(Filter)
  export default ConnectedFilter