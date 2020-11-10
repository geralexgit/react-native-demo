import React from 'react'
import { View, StyleSheet } from 'react-native'
import { THEME } from '../../theme'
import { AppTextBold } from '../AppTextBold/AppTextBold'

export const Navbar = (props) => {
  const { title } = props
  return (
    <View style={styles.navbar}>
      <AppTextBold style={styles.text}>{title}</AppTextBold>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: THEME.MAIN_COLOR,
    paddingBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
})
