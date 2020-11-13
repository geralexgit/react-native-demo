import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Alert, Keyboard } from 'react-native'
import { THEME } from '../../theme'
import { AntDesign } from '@expo/vector-icons'

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('')
  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value)
      setValue('')
      Keyboard.dismiss()
    } else {
      Alert.alert('Empty input!')
    }
  }
  return (
    <View style={styles.block}>
      <TextInput
        value={value}
        onChangeText={(text) => setValue(text)}
        style={styles.input}
        placeholder="Input todo"
        autoCorrect={false}
        autoCapitalize={'none'}
      />
      <AntDesign.Button name="plus" onPress={pressHandler}>
        Add
      </AntDesign.Button>
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    padding: 10,
    width: '75%',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
  },
  button: {
    width: '20%',
  },
})
