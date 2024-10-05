// Login.js
import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dimensions = Dimensions.get('window');
  const imageWidth = dimensions.width;

  const openRegisterScreen = () => {
    navigation.navigate('Register');
  };

  const signin = () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        console.log(userCredential.user.uid);
        navigation.navigate('MyTab', { user_id: userCredential.user.uid });
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/hero.jpg')} style={{ width: imageWidth, height: 270, marginBottom: 30 }} /> */}

      <View style={styles.smallScreen}>
        <Input
          placeholder='Enter your email'
          label='Email'
          leftIcon={{ type: 'material', name: 'email' }}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder='Enter your password'
          label='Password'
          leftIcon={{ type: 'material', name: 'lock' }}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        {loading ? (
          <ActivityIndicator size="large" color="#4E50F7" />
        ) : (
          <>
            <TouchableOpacity
              onPress={signin}
              style={{
                backgroundColor: '#414242',
                paddingHorizontal: 5,
                paddingVertical: 10,
                width: '70%', borderRadius: 15,
                marginTop: 30,
                marginBottom: 15
              }}>
              <Text style={{
                textAlign: 'center', color: '#FFFFFF', fontSize: 18
              }}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openRegisterScreen}
              style={{
                backgroundColor: '#4E50F7',
                paddingHorizontal: 5,
                paddingVertical: 10,
                width: '70%', borderRadius: 15,
              }}>
              <Text style={{
                textAlign: 'center', color: '#FFFFFF', fontSize: 18
              }}>Register</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4E50F7'
  },
  smallScreen: {
    width: 0.9 * Dimensions.get('window').width,
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    padding: 20,
    alignItems: 'center',
    borderRadius: 4,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  }
});

export default Login;