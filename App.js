import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import 'react-native-gesture-handler';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AntDesign from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';



const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
  },
};


const Stack = createStackNavigator();

const Navigation = () => {
  const [user, setuser] = useState('')
  useEffect(() => {
    const unregister = auth().onAuthStateChanged(userExist => {
      if (userExist) {

        firestore().collection('users')
          .doc(userExist.uid)
          .update({
            status: "online"
          })
        setuser(userExist)


      }

      else setuser("")
    })

    return () => {
      unregister()
    }

  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "green"
        }}

      >
        {user ?

          <>
            <Stack.Screen name='Home' options={{
              headerRight: () => <AntDesign
                name="logout" size={24}
                color="green"
                style={{ marginRight: 15 }}
                onPress={() => { auth().signOut() }}
              />,
              title: "Messages"
            }}

            >
              {props => <HomeScreen {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name='Chat' options={({ route }) => ({ title: route.params.name })}>
              {props => <ChatScreen {...props} user={user} />}
            </Stack.Screen>
          </>
          :
          <>
            <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="signup" component={SignupScreen} options={{ headerShown: false }} />
          </>
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
}



const App = () => {


  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor="green" />
        <View style={styles.container}>
          <Navigation />
        </View>
      </PaperProvider>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default App;