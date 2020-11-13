import React, { useState } from 'react'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import { MainLayout } from './src/MainLayout'
import { TodoState } from './src/context/todo/TodoState'
import { ScreenState } from './src/context/screen/ScreenState'

async function lodaApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/Fonts/Roboto/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/Fonts/Roboto/Roboto-Bold.ttf'),
    'roboto-light': require('./assets/Fonts/Roboto/Roboto-Light.ttf'),
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  if (!isReady) {
    return (
      <AppLoading
        startAsync={lodaApplication}
        onError={(err) => console.log('error')}
        onFinish={() => setIsReady(true)}
      />
    )
  }
  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  )
}
