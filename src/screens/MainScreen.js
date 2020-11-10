import React from 'react'
import { StyleSheet, View, FlatList, Image } from 'react-native'
import { AddTodo } from '../components/AddTodo/AddTodo'
import { Todo } from '../components/Todo/Todo'

export const MainScreen = ({ todos, addTodo, removeTodo, openTodo }) => {
  let content = (
    <FlatList
      keyExtractor={(item) => item.id}
      data={todos}
      renderItem={({ item }) => (
        <Todo onOpen={openTodo} onRemove={removeTodo} todo={item} />
      )}
    />
  )

  if (!todos.length) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.img}
          resizeMode="contain"
          source={require('../../assets/no-items.png')}
        ></Image>
      </View>
    )
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  imgWrap: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
  },
})
