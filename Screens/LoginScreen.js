import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, Keyboard, ImageBackground } from 'react-native'
import FormInput from '../Components/FormInput';
import FormButton from '../Components/FormButton';
import SocialButton from '../Components/SocialButton';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AuthContext } from '../Navigation/AuthProvider'

const LoginScreen = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { login, googleLogin } = useContext(AuthContext);

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('Keyboard dismissed')
    }}>
      <View style={styles.container}>
          <ImageBackground
            source={require('../assets/bday2.jpeg')}
            style={styles.imgBackground}
            resizeMode='center'
          />

          <Text style={styles.text}>Birthday Fund App</Text>

          <FormInput
            labelValue={email}
            onChangeText={(userEmail) => setEmail(userEmail)}
            placeholderText="Email"
            iconType="user"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <FormInput
            labelValue={password}
            onChangeText={(userPassword) => setPassword(userPassword)}
            placeholderText="Password"
            iconType="lock"
            secureTextEntry={true}
          />

          <FormButton
            buttonTitle="Sign In"
            onPress={() => login(email, password)}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
      </View>
   </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'thistle'
  },
  content: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 30,
    marginBottom: 10,
    color: '#051d5f',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'relative'
  }
});


export default LoginScreen;
