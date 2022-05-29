import React, {useContext, useState, useEffect, useCallback} from 'react';
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
  BackHandler,
  Alert,
} from 'react-native';
import Api from './Api';
import CheckBox from '@react-native-community/checkbox';
import {AuthContext} from './contexts/Auth';

const DesativarConta = ({navigation}) => {
  const {user, setUser, logged, setLogged} = useContext(AuthContext);
  const patternNome =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,'-]+$/u;

  let tempNome = user.NOME;
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemEmail, setMensagemEmail] = useState('');
  const [mensagemSenha, setMensagemSenha] = useState('');
  const [styleInputEmail, setStyleInputEmail] = useState(styles.inputEmail);
  const [styleInputSenha, setStyleInputSenha] = useState(styles.inputSenha);
  const [response, setResponse] = useState({});
  const [verificar, setVerificar] = useState(false);
  const [checkBox, setCheckBox] = useState(false);

  useEffect(() => {
    setStyleInputSenha({
        ...styleInputSenha,
        borderColor: '#ffffff',
    })
    setMensagemSenha('');
  },[senha])

  useEffect(() => {
    setStyleInputEmail({
        ...styleInputEmail,
        borderColor: '#ffffff',
    })
    setMensagemEmail('')
  }, [email])
  
  const handleSubmit = () => {
    let Valido = true;
    if (email === '') {
      setStyleInputEmail({
        ...styleInputEmail,
        borderColor: '#ff0000',
      });
      setMensagemEmail('Preencha o campo email');
        Valido = false;
    }
    else if(email != user.EMAIL){
        setStyleInputEmail({
            ...styleInputEmail,
            borderColor: '#ff0000',
        })
        setMensagemEmail('Email incorreto');
        Valido = false;
    }
    if (senha === '') {
        setStyleInputSenha({
            ...styleInputSenha,
            borderColor: '#ff0000',
        })
        setMensagemSenha('Preencha o campo senha');
        Valido = false;
    }
    else if(senha != user.SENHA){
        setStyleInputSenha({
            ...styleInputSenha,
            borderColor: '#ff0000',
        })
        setMensagemSenha('Senha incorreta');
        Valido = false;
    }
    if(checkBox === false){
        Valido = false;
    }

    

   
    if (Valido === true) {
        const DesativarConta = async () => {
            try {
            const realizarExcluir = await Api.delete(
                '/usuarios/'+user.ID_USUARIO
            );
            setResponse(realizarExcluir);
            setUser({});
            setLogged(false);
            } catch {
            console.log('Erro ao desativar conta');
            }
        };
        DesativarConta();
    }
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
      <Text style={styles.textoDoInput}>Email</Text>
      <TextInput
        placeholder="Digite seu email para confirmar"
        style={styleInputEmail}
        value={email}
        onChangeText={setEmail}
        autoCorrect={false}
        onFocus={() => {
          setStyleInputEmail({
            ...styleInputEmail,
            borderColor: '#48BF84',
          });
          setMensagemEmail('');
        }}
        onBlur={() => {
          setStyleInputEmail({
            ...styleInputEmail,
            borderColor: '#ffffff',
          })
        }}
        maxLength={100}></TextInput>
      <Text style={styles.desativarContaText}>{mensagemEmail}</Text>
      <Text style={styles.textoDoInput}>Senha</Text>
      <TextInput
        placeholder="Digite sua senha para confirmar"
        style={styleInputSenha}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
        autoCorrect={false}
        maxLength={32}
        onFocus={() => {
          setStyleInputSenha({
            ...styleInputSenha,
            borderColor: '#48BF84',
          });
          setMensagemEmail('');
        }}
        
        onBlur={() => {
          setStyleInputSenha({
            ...styleInputSenha,
            borderColor: '#ffffff',
          })
        }}>
        </TextInput>
      <Text style={styles.desativarContaText}>{mensagemSenha}</Text>
      <View style={styles.containerFatherInput}>
        <View style={styles.inputContainer}>
          <CheckBox
            style={styles.checkBox}
            disabled={false}
            value={checkBox}
            onValueChange={newValue => setCheckBox(newValue)}
            onFillColor={'#cc0000'}></CheckBox>
          <Text style={styles.desativarContaText}>
            Concordo em desativar a minha conta
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={handleSubmit} style={styles.btnSubmit}>
            <Text style={styles.submitText}>Desativar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  textoDoInput: {
    marginTop: 25,
    backgroundColor: '#ffffff',
    width: '70%',
    height: 45,
    // marginBottom: 15,
    color: '#525252',
    fontSize: 20,
    fontFamily: 'Outfit-Regular',
    paddingLeft: 15,
  },
  desativarContaText: {
    color: '#ff0000',
    marginBottom: 25,
  },
  checkBox: {
    marginBottom: 22,
  },
  mensagemNome: {
    color: '#ff0000',
  },
  containerFatherInput: {
    flex: 1,
    flexDirection: 'column',
  },
  inputSenha: {
    backgroundColor: '#ffffff',
    width: '80%',
   // marginTop: 50,
   // marginBottom: 15,
    color: '#000000',
    fontSize: 17,
   // padding: 10,
    //borderWidth: 2,
    //: '#000000',
    borderRadius: 25,
    borderColor: '#ffffff',
    fontFamily: 'Outfit-Regular',
    paddingLeft:20,
    elevation: 4,
    borderWidth: 2,
  },

  inputEmail: {
    backgroundColor: '#ffffff',
    width: '80%',
   // marginTop: 50,
   // marginBottom: 15,
    color: '#000000',
    fontSize: 17,
   // padding: 10,
    //borderWidth: 2,
    //: '#000000',
    borderRadius: 25,
    borderColor: '#ffffff',
    fontFamily: 'Outfit-Regular',
    paddingLeft:20,
    elevation: 4,
    borderWidth: 2,
   // marginTop: 20,
  },
  btnSubmit: {
    padding: 10,
    marginTop: 20,
    marginBottom: 15,
    marginLeft: 80,
    backgroundColor: '#cc0000',
    width: '30%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,

    // paddingTop: 50,
  },
  btnCancel: {
    padding: 10,
    marginBottom: 15,
    marginLeft: 20,
    backgroundColor: '#cc0000',
    width: '30%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    // paddingTop: 50,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  /*containerFatherInput: {
    flex: 1,
    flexDirection: 'column',
  },*/
  inputContainer: {
    // flex: 1,
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    // paddingBottom: 50,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 18,
    //fontWeight: 'bold',
    fontFamily: 'Outfit-SemiBold',
  },
});
export default DesativarConta;
