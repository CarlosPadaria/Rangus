import React, {useContext, useEffect, useState} from 'react';
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
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/AntDesign';
import {styles} from './styles/styleLogin';
import {AuthContext} from './contexts/Auth';
import Api from './Api';

const Login = ({navigation}) => {
  const {user, setUser, logged, setLogged} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [response, setResponse] = useState({});
  const [inputEmail, setInputEmail] = useState(styles.inputEmail);
  const [inputSenha, setInputSenha] = useState(styles.inputSenha);
  const [carregando, setCarregando] = useState(false);
  const [mensagemEmail, setMensagemEmail] = useState("");
  const [mensagemSenha, setMensagemSenha] = useState("");
  const [loginAceito, setLoginAceito] = useState(false);
  const [verificar, setVerificar] = useState(false);
  // ADICIONAR USE EFFECT PARA VERIFICAR SE OS CAMPOS ESTÃO VÁZIOS!

  useEffect(() => {
    if (verificar == true) {
      setUser(response.data);
      setLogged(true);
    }
  }, [verificar]);

  useEffect(() => {
    //setEmail(email.replace(/ /g, ''));
    if (email != '') {
      setInputEmail({
        ...styles.inputEmail,
        borderWidth: 2,
        borderColor: '#48bf84',
        elevation: 0,
      });
    }
    setMensagemEmail('');
  }, [email]);

  useEffect(() => {
    if (senha != '') {
      setInputSenha({
        ...styles.inputSenha,
        borderWidth: 2,
        borderColor: '#48bf84',
        elevation: 0,
      });
    }
    setMensagemSenha('');
  }, [senha]);


  const btnSubmit = () => {
    let deveCarregar = true;
    if (email === '') {
      setInputEmail({
        ...styles.inputEmail,
        borderWidth: 2,
        borderColor: 'red',
        elevation: 4,
      });
      setMensagemEmail('Email não pode ser vazio');
      deveCarregar = false;
    }
    if (senha === '') {
      setInputSenha({
        ...styles.inputSenha,
        borderColor: 'red',
        borderWidth: 2,
        elevation: 4,
      });
      setMensagemSenha('Senha não pode ser vazia');
      deveCarregar = false;
    }
    if (deveCarregar === true) {
      const Logar = async () => {
        try {
          const realizarLogin = await Api.post('/login', {
            EMAIL: email,
            SENHA: senha,
          });
          setResponse(realizarLogin);
          setVerificar(true);
        } catch {
          setInputEmail({
            ...styles.inputEmail,
            borderColor: '#ff0000',
            borderWidth: 2,
          });
          setMensagemEmail('Email ou Senha incorretos');
          console.log('falha, dados incorretos');
        }
      };
      setCarregando(true);
      Logar();
      setCarregando('carregado');
    }
  };
  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../images/novalogo.png')}
          style={{
            width: 260,
            height: 110,
          }}></Image>
      </View>

      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          style={inputEmail}
          value={email}
          onFocus={() => {
            setInputEmail({
              ...styles.inputEmail,
              borderWidth: 2,
              borderColor: '#48bf84',
              elevation: 4,
            });
            setMensagemEmail('');
          }}
          onBlur={() => {
            setMensagemEmail('');
            setInputEmail({
              ...styles.inputEmail,
              borderWidth: 2,
              elevation: 4,
            });
          
          }
        }
          onChangeText={setEmail}
          autoCorrect={false}
          autoComplete={'email'}
          maxLength={100}
          autoCapitalize={'none'}
          placeholderTextColor={'#474747'}
        />
        <Icon name="mail" style={styles.IconEmail} size={25}></Icon>
        <Text style={styles.mensagemEmail}>{mensagemEmail}</Text>
        <TextInput
          placeholder="Senha"
          style={inputSenha}
          value={senha}
          onChangeText={setSenha}
          autoComplete={'password'}
          secureTextEntry={true}
          maxLength={32}
          autoCapitalize={'none'}
          placeholderTextColor={'#474747'}
          onFocus={() => {
            setMensagemSenha('');
            setInputSenha({
              ...styles.inputSenha,
             // borderWidth: 2,
              borderColor: '#48bf84',
              elevation: 0,
            });
          }}
          onBlur={() => {
            setMensagemSenha('');
          
         
            setInputSenha({
              ...styles.inputSenha,
             // borderWidth: 0,
              elevation: 4,
            });
          }}
        />
        <Icon name="lock" style={styles.IconSenha} size={29}></Icon>
        <Text style={styles.mensagemEmail}>{mensagemSenha}</Text>
        <TouchableOpacity style={styles.btnSubmit} onPress={btnSubmit}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>

        <Text style={styles.createAccountText}>
          Não possui conta?
          <Text
            onPress={() => {
              setInputSenha({
                ...styles.inputSenha,
               // borderWidth: 0,
               // borderColor: '#48bf84',
                elevation: 4,
              });
              setMensagemSenha('');
              setInputEmail({
                ...styles.inputEmail,
              //  borderWidth: 0,
                elevation: 4
              })
              setMensagemEmail('');
              navigation.navigate('Cadastro');
            }}
            style={styles.createAccountTextButton}>
            {' '}
            Crie agora!
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};
export default Login;
