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


const OptionsScreen = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator>
      <Stack.Screen
        name="Options"
        component={Options}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AlterarNome"
    
        component={AlterarNome}
        options={{
          headerShown: true,
         // headerTransparent: true,
          headerShadowVisible: false,
          title: 'Atualizar Nome',
          headerTitleStyle:{
            fontFamily: 'Outfit-Medium',
          },
        }}
      />
      <Stack.Screen
        name="AlterarSenha"
    
        component={AlterarSenha}
        options={{
          headerShown: true,
         // headerTransparent: true,
          headerShadowVisible: false,
          //change the title font family
          headerTitleStyle:{
            fontFamily: 'Outfit-Medium',
          },
    
          title: 'Atualizar Senha',
        }}
      />
      <Stack.Screen
        name="DesativarConta"
    
        component={DesativarConta}
        options={{
          headerShown: true,
         // headerTransparent: true,
          headerShadowVisible: false,
          title: 'Desativar Conta',
          headerTitleStyle:{
            fontFamily: 'Outfit-Medium',
          },
        }}
      />
      </Stack.Navigator>
    );
  }

export default OptionsScreen;