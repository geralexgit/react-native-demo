import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Modal, Alert } from 'react-native'
import { THEME } from '../../theme'
import { AppButton } from '../AppButton/AppButton'

export const EditModal = ({ visible, toggleModal, value, onSave }) => {
  const [title, setTitle] = useState(value)
  const saveHandler = () => {
    if (title.trim().lengh < 3) {
      Alert.alert(
        'Error',
        `Minimal lenght 3 simbols. Current length ${
          title.trim().lengh
        } символов`
      )
    } else {
      console.log('save')
      onSave(title)
    }
  }
  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View style={styles.wrap}>
        <TextInput
          placeholder="Введите название"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={64}
          style={styles.input}
          onChangeText={setTitle}
          value={title}
        />
        <View style={styles.buttons}>
          <AppButton
            onPress={() => toggleModal(false)}
            color={THEME.DANGER_COLOR}
          >
            Cancel
          </AppButton>
          <AppButton onPress={saveHandler}>save</AppButton>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%',
  },
  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
