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
const EditarReceita = ({navigation}) => {
  // do a dynamic input for names
  const {logged, setLogged, user, setUser, loading, setLoading, page, setPage} =
    useContext(AuthContext);
  const [ingredientes, setIngredientes] = useState([]);
  const [passos, setPassos] = useState([]);
  const [imagem, setImagem] = useState('');
  const [titulo, setTitulo] = useState('');
  const [porcao, setPorcao] = useState('');
  const [response, setResponse] = useState({});
  const [mensagem, setMensagem] = useState('');
  const [verificar, setVerificar] = useState(false);
  const [navegar, setNavegar] = useState(false);
  const [tempo, setTempo] = useState('');
  const [categoria, setCategoria] = useState('')
  const [carregarPassos, setCarregarPassos] = useState('');
  const [navegar2, setNavegar2] = useState(false);
  const [navegar3, setNavegar3] = useState(false);
  let realizarCadastro = {};
  let realizarCadastroIngrediente = {};
  let realizarCadastroPasso = {};
  let i = 0;

  useEffect(() => {
    CarregarReceita();
    CarregarPassosIngredientes();
    // handleListarIngredientes();
  }, []);

  useEffect(() => {
    if (carregarPassos === true) {
      AtualizarPassos();
    }
  }, [carregarPassos]);

  useEffect(() => {
    if (navegar === true) {
    //  setLoading(!loading);
      setNavegar2(true);
      //navigation.navigate('ListarReceitas');
    }
  }, [navegar]);

  useEffect(() => {
    if(navegar2 === true){
      setNavegar(false);
      setLoading(!loading);
      setNavegar3(true);
    }
  }, [navegar2])

  useEffect(() => {
    if(navegar3 === true){
      navigation.navigate('ListarReceitas');
    }
  }, [navegar3])
  const handleAddIngrediente = () => {
    setIngredientes([...ingredientes, {NOME: ''}]);
  };

  const handleRemoveIngrediente = index => {
    setIngredientes(ingredientes.filter((_, i) => i !== index));
  };

  const handleChangeIngrediente = (index, value) => {
    const newIngredientes = [...ingredientes];
    newIngredientes[index] = {...newIngredientes[index], NOME: value};
    setIngredientes(newIngredientes);
  };
  const handleAddPasso = () => {
    setPassos([...passos, {DESCRICAO: ''}]);
  };
  const handleRemovePasso = index => {
    setPassos(passos.filter((_, i) => i !== index));
  };
  const handleChangePasso = (index, value) => {
    const newPassos = [...passos];
    newPassos[index] = {...newPassos[index], DESCRICAO: value};
    setPassos(newPassos);
  };

  const AtualizarReceita = () => {
    const funcAtualizar = async () => {
      //  console.log(page);
      try {
        const atualizar = await Api.put(`/receitas/${page}`, {
          TITULO: titulo,
          PORCAO: porcao,
          IMAGEM: imagem,
          TEMPO: tempo,
          CATEGORIA: categoria,
        });
        setResponse(atualizar.data);
      } catch {
        console.log('Erro ao Atualizar Receita');
      }
    };
    funcAtualizar();
  };
  const handleSubmit = () => {

    AtualizarReceita();
    ApagarPassosIngredientes();
    //  AtualizarIngredientesPassos();
    AtualizarIngredientes();
    
    //setNavegar(true);
  };

  const handleVerificar = () => {
    Verificar = true;

    if(tempo === '' || titulo === '' || imagem === '' || porcao === ''){
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
  
  }

  const AtualizarIngredientes = () => {
    if (ingredientes.length > 0) {
      const CadastrarIngredientes = async () => {
        for (i = 0; i < ingredientes.length; i++) {
          realizarCadastroIngrediente = await Api.post('/ingredientes', {
            ID_RECEITA: page,
            NOME: ingredientes[i].NOME,
          });
        }
      };
      CadastrarIngredientes();
    }
    setCarregarPassos(true);
  };
  const AtualizarPassos = () => {
    if (passos.length > 0) {
      const CadastrarPassos = async () => {
        for (i = 0; i < passos.length; i++) {
          realizarCadastroPasso = await Api.post('/passos', {
            ID_RECEITA: page,
            DESCRICAO: passos[i].DESCRICAO,
            NUMERO: i + 1,
          });
        }
      };

      CadastrarPassos();
    }
    setNavegar(true);
  };

  const ApagarPassosIngredientes = () => {
    const funcApagarPassos = async () => {
      const apagarPasso = await Api.delete(`/passosreceita/${page}`);
    };
    funcApagarPassos();

    const funcApagarIngredientes = async () => {
      const apagarIng = await Api.delete(`/ingredientesreceita/${page}`);
    };

    funcApagarIngredientes();
  };

  const CarregarReceita = () => {
    const funcCarregar = async () => {
      try {
        const carregar = await Api.get(`/receitas/${page}`);

        setTitulo(carregar.data.TITULO);
        setPorcao(carregar.data.PORCAO);
        setImagem(carregar.data.IMAGEM);
        setTempo(carregar.data.TEMPO);
        setCategoria(carregar.data.CATEGORIA)
      } catch {
        console.log('falha ao carregar');
      }
    };
    funcCarregar();
  };

  const CarregarPassosIngredientes = () => {
    const funcCarregar = async () => {
      try {
        const carregarPassos = await Api.get(`/passosreceita/${page}`);
        const carregarIngredientes = await Api.get(
          `/ingredientesreceita/${page}`,
        );
        setIngredientes(carregarIngredientes.data);
        setPassos(carregarPassos.data);
      } catch {
        console.log('falha ao carregar');
      }
    };
    funcCarregar();
  };

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
            placeholder="Coloque o link da imagem"></TextInput>
        </View>
        <Text style={styles.textoDoInput}>Porção</Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
            maxLength={100}
            style={styles.input}
            multiline={true}
            blurOnSubmit={true}
            placeholder=""
            value={porcao}
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
              value={ingrediente.NOME}
              onChangeText={value => handleChangeIngrediente(index, value)}
              style={styles.inputIngrediente}
              multiline={true}
              blurOnSubmit={true}
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
              value={passo.DESCRICAO}
              multiline={true}
              blurOnSubmit={true}
              maxLength={100}
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
            <Text style={styles.ingredienteText}>Editar</Text>
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
    paddingLeft: 20,
    elevation: 4,
    borderWidth: 2,
  },
  inputIngrediente: {
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
    paddingLeft: 20,
    elevation: 4,
    borderWidth: 2,
    marginBottom: 20,
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
    paddingLeft: 20,
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

export default EditarReceita;
