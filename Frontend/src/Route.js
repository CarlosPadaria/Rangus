import React,{useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';
import Cadastro from './Cadastro';
import Home from './Home';
import {AuthContext} from './contexts/Auth';


const Route = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator()
  // if logged == true, go to home screen
  const {logged, setLogged, user, setUser} = useContext(AuthContext);
  return (
    <Stack.Navigator>
      {logged == false ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{
              headerTransparent: true,
              headerShadowVisible: false,
              title: '',
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default Route;
