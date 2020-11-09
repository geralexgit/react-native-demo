import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'
import { AddTodo } from './src/components/AddTodo/AddTodo'
import { Navbar } from './src/components/Navbar/Navbar'
import { Todo } from './src/components/Todo/Todo'

export default function App() {
  const [todos, setTodos] = useState([])
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
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  return (
    <View>
      <Navbar title={'Todo App'} />
      <View style={styles.container}>
        <AddTodo onSubmit={addTodo} />
        <FlatList
          keyExtractor={(item) => item.id}
          data={todos}
          renderItem={({ item }) => <Todo onRemove={removeTodo} todo={item} />}
        />
      </View>
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
