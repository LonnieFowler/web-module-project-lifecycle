import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error:'',
    todoInput:'',
    displayComplete: true,
  }

  onInputChange = evt => {
    const {value} = evt.target
   this.setState({...this.state, todoInput: value})
  }


resetForm = () => {this.setState({...this.state, todoInput: ''})}

setAxiosError = err => this.setState({...this.state, error: err.response.data.message})


  postNewChore = () => {
    axios.post(URL, {name: this.state.todoInput})
    .then(res =>{
      this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
      this.resetForm()
    })
    .catch(this.setAxiosError)
  }


  onTodoFormSubmit = evt => {
    evt.preventDefault()
    this.postNewChore()
  }


  fetchAllTodos = () => {
    axios.get(URL)
    .then(res =>{
     this.setState({...this.state, todos: res.data.data})
    })
    .catch(this.setAxiosError)
  }


toggleCompleted = id => () => {
  axios.patch(`${URL}/${id}`)
  .then(res => {
    this.setState({...this.state, todos: this.state.todos.map(todo =>{
      if (todo.id !== id) return todo
      return res.data.data
    })})
  })
  .catch(this.setAxiosError)
}

toggleDisplayComplete = () => {
  this.setState({...this.state, displayComplete:!this.state.displayComplete})
}


  componentDidMount() {
    this.fetchAllTodos()
  }


  render() {
    return (
      <div>
        <div id='error'>Error: {this.state.error}</div>

        <TodoList 
        todos={this.state.todos}
        displayComplete={this.state.displayComplete}
        toggleCompleted={this.toggleCompleted}
        />
       
        <Form
        onTodoFormSubmit={this.onTodoFormSubmit}
        onInputChange={this.onInputChange}
        toggleDisplayComplete={this.toggleDisplayComplete}
        todoInput={this.state.todoInput}
        displayComplete={this.state.displayComplete}
        />
      </div>
    )
  }
}
