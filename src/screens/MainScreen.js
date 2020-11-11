import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'
import { AddTodo } from '../components/AddTodo/AddTodo'
import { Todo } from '../components/Todo/Todo'
import { THEME } from '../theme'

export const MainScreen = ({ todos, addTodo, removeTodo, openTodo }) => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )
  useEffect(() => {
    const updateWidth = () => {
      const width =
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
      setDeviceWidth(width)
    }
    Dimensions.addEventListener('change', updateWidth)
    return () => {
      Dimensions.removeEventListener('change', updateWidth)
    }
  })

  // const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={todos}
        renderItem={({ item }) => (
          <Todo onOpen={openTodo} onRemove={removeTodo} todo={item} />
        )}
      />
    </View>
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
