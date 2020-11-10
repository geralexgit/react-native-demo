import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Alert } from 'react-native'
import { Navbar } from './src/components/Navbar/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'

export default function App() {
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([
    // { id: '1', title: 'Learn React Native' }
  ])
  const addTodo = (title) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
      },
    ])
  }
  const removeTodo = (id) => {
    const todo = todos.find((t) => t.id === id)
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
          onPress: () => {
            setTodoId(null)
            setTodos((prev) => prev.filter((todo) => todo.id !== id))
          },
        },
      ],
      { cancelable: false }
    )
  }

  const updateTodo = (id, title) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          todo.title = title
        }
        return todo
      })
    )
  }
  let content = (
    <MainScreen
      openTodo={setTodoId}
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
    />
  )
  if (todoId) {
    const selectedTodo = todos.find((todo) => todo.id === todoId)
    content = (
      <TodoScreen
        removeTodo={removeTodo}
        todo={selectedTodo}
        goBack={() => setTodoId(null)}
        onSave={updateTodo}
      />
    )
  }
  return (
    <View>
      <Navbar title={'Todo App'} />
      <View style={styles.container}>{content}</View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
})
