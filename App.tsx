import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { createContext, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Authcontext } from './context/AuthContext';
import { UserContext } from './context/UserContext';
import Login from './pages/login';
import AlreadyEat from './pages/user/AlreadyEat';
import Dashboard from './pages/user/Dashboard';
import UserMap from './pages/user/Map';
import WantToEat from './pages/user/WantToEat';


const Stack = createNativeStackNavigator();

function HomeScreen({navigation} : any){
  return(
    <View style={styles.container}>
        <View style={styles.container}>
          <Button title="Login" onPress={() => { navigation.navigate('Login') }}></Button>
        </View>
      <StatusBar style="auto" />
    </View>
  )
}

export default function App() {

  const [user, setUser] = useState({})

  const [isSignedIn, setSignIn] = useState(false)


  useEffect(()=>{
    Promise.resolve(AsyncStorage.getItem('@user')).then(user =>{
      if(user){
        setSignIn(true)
      }
    });
  }, [])

  return (
    <NavigationContainer>
      <Authcontext.Provider value={{isSignedIn, setSignIn}}>
        <UserContext.Provider value={{user, setUser}}>
            <Stack.Navigator screenOptions={{ headerShown:false}}>
              { isSignedIn ? (
              <>
              <Stack.Screen name="userDashboard" component={Dashboard}  />
              <Stack.Screen name="AlreadyEat" component={AlreadyEat}  />
              <Stack.Screen name="WantToEat" component={WantToEat}  />
              <Stack.Screen name="Map" component={UserMap}  />
              </>
              ):(
              <>
              <Stack.Screen name="Home" component={HomeScreen}  />
              <Stack.Screen name="Login" component={Login}  />
              </>
              )}
            </Stack.Navigator>
        </UserContext.Provider>
      </Authcontext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
