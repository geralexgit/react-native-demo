import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Alert } from 'react-native'
import * as Font from 'expo-font'

import { AppLoading } from 'expo'

import { Navbar } from './src/components/Navbar/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'
import { THEME } from './src/theme'

async function lodaApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/Fonts/Roboto/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/Fonts/Roboto/Roboto-Bold.ttf'),
    'roboto-light': require('./assets/Fonts/Roboto/Roboto-Light.ttf'),
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([
    { id: '12', title: 'Learn React Native' },
  ])

  if (!isReady) {
    return (
      <AppLoading
        startAsync={lodaApplication}
        onError={(err) => console.log('error')}
        onFinish={() => setIsReady(true)}
      />
    )
  }

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
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 10,
  },
})
