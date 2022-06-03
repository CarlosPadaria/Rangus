import React, {useState, useRef, setString, useEffect, useContext} from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Api from './Api';
//import Clipboard from '@react-native-community/clipboard';
//import { useEffect } from 'react/cjs/react.production.min';
import {AuthContext} from './contexts/Auth';
const CadastrarReceitas = ({navigation}) => {
  // do a dynamic input for names
  const {logged, setLogged, user, setUser, loading, setLoading} = useContext(AuthContext);
  const [navegar, setNavegar] = useState(false);
  const [ingredientes, setIngredientes] = useState([]);
  const [passos, setPassos] = useState([]);
  const [imagem, setImagem] = useState('');
  const [titulo, setTitulo] = useState('');
  const [porcao, setPorcao] = useState('');
  const [response, setResponse] = useState({});
  const [mensagem, setMensagem] = useState('');
  const [verificar, setVerificar] = useState(false);
  const [verificar2, setVerificar2] = useState(false);
  const [verificar3, setVerificar3] = useState(false);
  const [categoria, setCategoria] = useState('');
  const [tempo, setTempo] = useState('');
 // let realizarCadastro = {};
  let realizarCadastroIngrediente = {};
  let realizarCadastroPasso = {};
  let i = 0;


  useEffect(() =>{
    if(navegar === true){
      setIngredientes([]);
      setPassos([]);
      setImagem('')
      setTempo('');
      setTitulo('')
      setPorcao('');
      setResponse({})
      setMensagem('')
      setVerificar(false)
      setVerificar2(false)
      setVerificar3(false)
      setNavegar(false);
      navigation.navigate('ListarReceitas');
    }
  },[navegar])

  useEffect(() =>{
    if(verificar3 === true){
      setNavegar(true);
    }
  },[verificar3])
  useEffect(() =>{
    if(verificar === true)
    {
        CadastrarIngredientes();
        setVerificar2(true);
       // setNavegar(true);
    }
  }, [verificar])

  useEffect(() =>{
    if(verificar2 === true)
    {
      CadastrarPassos();
    }
  },[verificar2])
  useEffect(() =>{
    setNavegar(false);
  },[])



  const CadastrarIngredientes = () => {
     const CadastrarIngrediente = async () => {
        for (i = 0; i < ingredientes.length; i++) {
          realizarCadastroIngrediente = await Api.post('/ingredientes', {
            ID_RECEITA: response.data.ID_RECEITA,
            NOME: ingredientes[i].ingrediente,
          });
        }
      };
      CadastrarIngrediente();
    }

    const CadastrarPassos = () => {
      const CadastrarPasso = async () => {
        for (i = 0; i < passos.length; i++) {
          realizarCadastroPasso = await Api.post('/passos', {
            ID_RECEITA: response.data.ID_RECEITA,
            DESCRICAO: passos[i].passo,
            NUMERO: i + 1,
          });
        }
      };
      CadastrarPasso();
      setVerificar3(true);
  }


  const handleAddIngrediente = () => {
    setIngredientes([...ingredientes, {ingrediente: ''}]);
  };

  const handleRemoveIngrediente = index => {
    setIngredientes(ingredientes.filter((_, i) => i !== index));
  };

  const handleChangeIngrediente = (index, value) => {
    const newIngredientes = [...ingredientes];
    newIngredientes[index] = {...newIngredientes[index], ingrediente: value};
    setIngredientes(newIngredientes);
  };
  const handleAddPasso = () => {
    setPassos([...passos, {passo: ''}]);
  };
  const handleRemovePasso = index => {
    setPassos(passos.filter((_, i) => i !== index));
  };
  const handleChangePasso = (index, value) => {
    const newPassos = [...passos];
    newPassos[index] = {...newPassos[index], passo: value};
    setPassos(newPassos);
  };

  const handleSubmit = () => {
    let Verificar = true;

    if (titulo === '' || porcao === '' || imagem === ''  || tempo === '') {
      Verificar = false;
    }

    if (passos.length === 0) {
      Verificar = false;
    } else {
      for (i = 0; i < passos.length; i++) {
        if (passos[i].passo === '') {
          Verificar = false;
          break;
        }
      }
    }

    if (ingredientes.length === 0) {
      Verificar = false;
    } else {
      for (i = 0; i < ingredientes.length; i++) {
        if (ingredientes[i].ingrediente === '') {
          Verificar = false;
          break;
        }
      }
    }

    if (Verificar === true) {
      const CadastrarReceita = async () => {
        try {
         const realizarCadastro = await Api.post('/receitas', {
            TITULO: titulo,
            ID_USUARIO: user.ID_USUARIO,
            IMAGEM: imagem,
            PORCAO: porcao,
            TEMPO: tempo,
            CATEGORIA: categoria,
            ATIVA: 'true',
          });
         // console.  log(realizarCadastro.data);
          setResponse(realizarCadastro);
          setVerificar(true);
        } catch {
          console.log('cadastro da receita falhou');
        }
      };
      CadastrarReceita();
      setLoading(!loading);
    } else {
      setMensagem('Algum campo não foi preenchido corretamente');
    }
  };

  /* const handleListarIngredientes = () => {
    for (i = 0; i < ingredientes.length; i++) {
      console.log(ingredientes[i].ingrediente);
    }
  };*/

  // do a text input with name useState
  return (
    <KeyboardAvoidingView style={styles.background}>
      <ScrollView>
        <Text style={styles.textoDoInput}>Título</Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
            maxLength={100}
            multiline={true}
            blurOnSubmit={true}
            style={styles.input}
            value={titulo}
            placeholder={'Digite o título da receita'}
            onChangeText={setTitulo}></TextInput>
        </View>
        <Text style={styles.textoDoInput}>Categoria</Text>
        <View
          style={{justifyContent: 'center', alignItems: 'center'}}
          removeClippedSubviews={false}>
          <TextInput
            maxLength={30}
            style={styles.input}
            multiline={true}
            blurOnSubmit={true}
            selectTextOnFocus={true}
            value={categoria}
            contextMenuHidden={false}
            onChangeText={setCategoria}
            placeholder='Coloque a categoria, ex: "Salgado", "Doce" '></TextInput>
        </View>
        <Text style={styles.textoDoInput}>Imagem</Text>
        <View
          style={{justifyContent: 'center', alignItems: 'center'}}
          removeClippedSubviews={false}>
          <TextInput
            maxLength={1000}
            style={styles.input}
            multiline={true}
            blurOnSubmit={true}
            selectTextOnFocus={true}
            value={imagem}
            textContentType="URL"
            contextMenuHidden={false}
            onChangeText={setImagem}
            placeholder="Coloque o link da imagem a ser utilizada"></TextInput>
        </View>
        <Text style={styles.textoDoInput}>Porção</Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
            maxLength={100}
            style={styles.input}
            multiline={true}
            blurOnSubmit={true}
            //placeholder=""
            value={porcao}
            placeholder={'Digite a porção da receita'}
            onChangeText={setPorcao}></TextInput>
        </View>
        <Text style={styles.textoDoInput}>Tempo</Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
            maxLength={30}
            style={styles.input}
            multiline={true}
            blurOnSubmit={true}
            //placeholder=""
            value={tempo}
            placeholder={'Digite o tempo da receita'}
            onChangeText={setTempo}></TextInput>
        </View>
        <Text style={styles.textoDoInput}>Ingredientes</Text>
        {ingredientes.map((ingrediente, index) => (
          <View
            key={index}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TextInput
              value={ingrediente.ingrediente}
              onChangeText={value => handleChangeIngrediente(index, value)}
              style={styles.inputIngrediente}
              multiline={true}
              //maxLength={100}
            
            /*  onBlur={()=>{
                setArrayStyleIngredientes({
                  ...ArrayStyleIngredientes,
                  [index+1]: styles.inputIngrediente,
                })
              }}*/
              blurOnSubmit={true}
              placeholder={'Digite o ingrediente'}
              maxLength={50}
            />
            <Icon
              name="close"
              size={29}
              color="red"
              onPress={() => handleRemoveIngrediente(index)}></Icon>
          </View>
        ))}
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.addIngrediente}
            onPress={handleAddIngrediente}>
            <Text style={styles.ingredienteText}>Adicionar Ingrediente</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textoDoInput}>Passos</Text>
        {passos.map((passo, index) => (
          <View
            key={index}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={styles.textoDoPasso}>{index + 1}</Text>
            <TextInput
              value={passo.passo}
              multiline={true}
              blurOnSubmit={true}
              maxLength={100}
              placeholder={'Digite o passo ' + (index + 1)}
              onChangeText={value => handleChangePasso(index, value)}
              style={styles.inputIngrediente}
            />
            <Icon
              name="close"
              size={29}
              color="red"
              onPress={() => handleRemovePasso(index)}></Icon>
          </View>
        ))}
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.addIngrediente}
            onPress={handleAddPasso}>
            <Text style={styles.ingredienteText}>Adicionar Passo</Text>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
            <Text style={styles.ingredienteText}>Cadastrar Receita</Text>
          </TouchableOpacity>
          <Text style={{color: 'red'}}>{mensagem}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // do the styles for the input
  addIngrediente: {
    backgroundColor: '#48BF84',
    width: '70%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    marginBottom: 20,
    // paddingTop: 50,
  },
  btnSubmit: {
    marginTop: 20,
    backgroundColor: '#48BF84',
    width: '50%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    marginBottom: 20,
    // paddingTop: 50,
  },
  ingredienteText: {
    color: '#ffffff',
    fontSize: 18,
    //fontWeight: 'bold',
    fontFamily: 'Outfit-SemiBold',
  },
  textoDoInput: {
    marginTop: 25,
    backgroundColor: '#ffffff',
    width: '70%',
    height: 45,
    // marginBottom: 15,
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Outfit-Regular',
    paddingLeft: 40,
  },

  textoDoPasso: {
    marginTop: 25,
    backgroundColor: '#ffffff',
    height: 45,
    // marginBottom: 15,
    color: '#525252',
    fontSize: 20,
    fontFamily: 'Outfit-Regular',
    marginRight: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    width: '70%',
    //marginTop: 50,
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
  inputIngrediente: {
    backgroundColor: '#ffffff',
    width: '70%',
    //marginTop: 50,
    marginBottom: 15,
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
  inputIngredienteFocus: {
    backgroundColor: '#ffffff',
    width: '70%',
    //marginTop: 50,
   // marginBottom: 15,
    color: '#000000',
    fontSize: 17,
   // padding: 10,
    //borderWidth: 2,
    //: '#000000',
    borderRadius: 25,
    borderColor: '#48BF84',
    fontFamily: 'Outfit-Regular',
    paddingLeft:20,
    elevation: 4,
    borderWidth: 2,
    marginBottom: 20,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default CadastrarReceitas;
