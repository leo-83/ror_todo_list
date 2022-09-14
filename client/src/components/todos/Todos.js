import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import TodoList from './TodoList';
import TodoForm from './TodoForm';

const Todos = () => {
  const [todos, setTodos] = useState([])

  // useparams allow you to grab the ListId from the url
  const { listId } = useParams()
  // the list id should match with the what we have as a placeholder in the app

  // useLocation grab stuff we pass through state
  const location = useLocation()
  const { ListTitle } = location.state

  useEffect( () => {
    axios.get(`/api/lists/${listId}/todos`)
      .then( res => setTodos(res.data) )
      .catch( err => console.log(err))
  }, [])

  const addTodo = (todo) => {
    axios.post(`/api/lists/${listId}/todos`, { todo })
      .then( res => setTodos([ ...todos, res.data ]))
      .catch( err => console.log(err))
  }

  const updateTodo = (id, todo) => {
    axios.put(`/api/lists/${listId}/todos/${id}`, { todo })
      .then( res => {
        const newUpdatedTodos = todos.map( t => {
          if (t.id === id) {
            return res.data
          }
          return t
        })
        setTodos(newUpdatedTodos)
      })
      .catch( err => console.log(err))
  }

  const deleteTodo = (id) => {
    axios.delete(`/api/lists/${listId}/todos/${id}`)
      .then( res => {
        setTodos(todos.filter( t => t.id !== id ))
      })
      .catch( err => console.log(err))
  }

  return (
    <>
      <TodoForm addTodo={addTodo} />
      <h1>{ListTitle} Todos</h1>
      <TodoList
        todos={todos}
        updateTodo={updateTodo} 
        deleteTodo={deleteTodo}
      />
    </>
  )
}

export default Todos;