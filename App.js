// import React from 'react'
// import { useState, useEffect, useContext } from 'react'
// import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
// import database from '@react-native-firebase/database'
// import auth from '@react-native-firebase/auth';

// const App = () => {
//   const [data, setData] = useState([]);

//   useEffect (()=>{
//     database().ref('Admin/user').once('value', function (snapshot) {
//       setData(Object.values(snapshot.val()));
//       console.log(snapshot.val())
//   });
//   })
//   return (
    // <View>
    //   <Text>Hello</Text>
    // </View>
//   )
// }

// export default App

import React from 'react'
import Providers from './Navigation'

const App = () => {
  return (
   <Providers />
  )
}

export default App



