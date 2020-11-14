import React, { useState, useEffect, useContext, useCallback } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'
import { AddTodo } from '../components/AddTodo/AddTodo'
import { Todo } from '../components/Todo/Todo'
import { AppLoader } from '../components/AppLoader/AppLoader'
import { THEME } from '../theme'

import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'
import { AppTextBold } from '../components/AppTextBold/AppTextBold'
import { AppButton } from '../components/AppButton/AppButton'

export const MainScreen = () => {
  const { todos, addTodo, removeTodo, fetchTodos, loading, error } = useContext(
    TodoContext
  )

  const { changeScreen } = useContext(ScreenContext)

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )

  const loadTodos = useCallback(async () => {
    await fetchTodos()
  }, [fetchTodos])

  useEffect(() => {
    loadTodos()
  }, [])

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

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={todos}
        renderItem={({ item }) => (
          <Todo onOpen={changeScreen} onRemove={removeTodo} todo={item} />
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

  if (loading) {
    return <AppLoader />
  }
  if (error) {
    return (
      <View>
        <AppTextBold style={styles.c}>{error}</AppTextBold>
        <AppButton onPress={loadTodos}>Try again</AppButton>
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
