import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const Navbar = (props) => {
  const { title } = props
  return (
    <View style={styles.navbar}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#3949ab',
    paddingBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
})
