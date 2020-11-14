import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { ScreenContext } from '../screen/screenContext'
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from '../types'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import { Http } from '../../http'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  }
  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async (title) => {
    clearError()
    try {
      const data = await Http.post(
        'https://rn-todo-app-950c1.firebaseio.com/todos.json',
        { title }
      )
      dispatch({ type: ADD_TODO, title, id: data.name })
    } catch (err) {
      showError('Something went wrong')
    }
  }
  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id)
    Alert.alert(
      'Delete element',
      `Delete "${todo.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await Http.delete(
              `https://rn-todo-app-950c1.firebaseio.com/todos/${id}.json`
            )
            changeScreen(null)
            dispatch({ type: REMOVE_TODO, id })
          },
        },
      ],
      { cancelable: false }
    )
  }
  const updateTodo = async (id, title) => {
    clearError()
    showLoader()
    try {
      await Http.patch(
        `https://rn-todo-app-950c1.firebaseio.com/todos/${id}.json`,
        { title }
      )
      dispatch({ type: UPDATE_TODO, id, title })
    } catch (err) {
      showError('Something went wrong, try again')
      console.log(err)
    } finally {
      hideLoader()
    }
  }
  const fetchTodos = async () => {
    clearError()
    showLoader()
    try {
      const data = await Http.get(
        'https://rn-todo-app-950c1.firebaseio.com/todos.json'
      )
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }))
      dispatch({ type: FETCH_TODOS, todos })
    } catch (err) {
      showError('Something went wrong, try again')
      console.log(err)
    } finally {
      hideLoader()
    }
  }

  const showLoader = () => dispatch({ type: SHOW_LOADER })
  const hideLoader = () => dispatch({ type: HIDE_LOADER })
  const showError = (error) => dispatch({ type: SHOW_ERROR, error })
  const clearError = () => dispatch({ type: CLEAR_ERROR })

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
