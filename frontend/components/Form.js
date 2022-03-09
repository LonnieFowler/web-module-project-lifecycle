import React from 'react'

export default class Form extends React.Component {
  render() {
    
    return (
      <>
      <form id='todoForm' onSubmit={this.props.onTodoFormSubmit}>
          <input 
          value={this.props.todoInput} 
          onChange={this.props.onInputChange} 
          type='text' 
          placeholder='Type your chore'></input>
          <input type='submit'></input>
          </form>
        <button 
        onClick={this.props.toggleDisplayComplete}>
          {this.props.displayComplete ? 'Hide' : 'Show'}Complete
          </button>
        </>
    )
    
  }
}
