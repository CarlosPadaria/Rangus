import React from "react"
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
    BackHandler
  } from 'react-native';
import Options from "./Options";
import AlterarNome from "./AlterarNome";
import AlterarSenha from "./AlterarSenha";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DesativarConta from "./DesativarConta";
import ListaReceitas from "./ListaReceitas";
import PaginaReceita from "./PaginaReceita";
import EditarReceita from "./EditarReceita";
const Receita = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator>
      <Stack.Screen
        name="ListarReceitas"
        component={ListaReceitas}
        options={{
          headerShown: false,
         // headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="PaginaReceita"
    
        component={PaginaReceita}
        options={{
          headerShown: true,
         // headerTransparent: true,
          headerShadowVisible: false,
          title: '',
        }}
      />
      <Stack.Screen
        name="EditarReceita"
    
        component={EditarReceita}
        options={{
          headerShown: true,
         // headerTransparent: true,
          headerShadowVisible: false,
          title: '',
        }}
      />
      </Stack.Navigator>
    );
  }

export default Receita;