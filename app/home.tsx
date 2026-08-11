import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#c9f30e" }}>
    <View className=' view h-full w-full bg-[#edeee7] justify-center items-center'>
      <Text className='text-2xl font-bold text-black justify-content '>Welcome to story talks</Text>
    </View>
    </SafeAreaView>
  )
}

export default home
