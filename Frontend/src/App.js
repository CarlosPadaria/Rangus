//import 'react-native-gesture-handler';
import React, {useContext, useState, useEffect, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Login from './Login';
import Cadastro from './Cadastro';
import Home from './Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthProvider, {AuthContext} from './contexts/Auth';
import Route from './Route';

const App = () => {
  const Stack = createNativeStackNavigator();
  const {logged, setLogged, user, setUser} = useContext(AuthContext);
 
  return (
    <NavigationContainer>
      <AuthProvider>
        <Route></Route>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
