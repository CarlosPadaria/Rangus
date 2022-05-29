import CheckBox from '@react-native-community/checkbox';
import React, {useState, useContext, useEffect, useRef} from 'react';
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
  FlatList,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import Api from './Api';
import {AuthContext} from './contexts/Auth';
//import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ListaReceitas = ({navigation}) => {
  const {logged, setLogged, user, setUser, loading, setLoading, setPage, page} =
    useContext(AuthContext);
  // INVERTER O ARRAY DE RECEITAS PARA QUE APAREÇA O ULTIMO CADASTRADO
  const [receitas, setReceitas] = useState([{}]);
  const [navegarPaginaReceita, setNavegarPaginaReceita] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalApagar, setModalApagar] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [filteredData, setFilteredData] = useState([{}]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    CarregarReceitas();
  }, [, loading]);

  const CarregarReceitas = () => {
    const funcCarregar = async () => {
      try {
        const carregar = await Api.get('/receitas');

        setReceitas(carregar.data);
        setFilteredData(carregar.data.reverse());
      } catch {
        console.log('falha ao carregar');
      }
    };
    funcCarregar();
  };

  const ApagarReceita = () => {
    const funcApagar = async () => {
      try {
        const apagar = await Api.delete(`/receitas/${page}`);
      } catch {
        console.log('falha ao apagar');
      }
    };
    funcApagar();
  };

  const SearchFilter = text => {
    if (text) {
      const newData = receitas.filter(item => {
        const itemData = item.TITULO
          ? item.TITULO.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData.reverse());
      setSearch(text);
    } else {
      setFilteredData(receitas.reverse());
      setSearch(text);
    }
  };

  return (
    <View style={{backgroundColor: '#48BF84', flex: 1, marginBottom: 10}}>
      <View style={{alignItems: 'center', marginBottom: 10, borderRadius: 28}}>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={text => SearchFilter(text)}
          placeholder='Pesquisar receita, ex: "pizza"'></TextInput>
      </View>
      <Icon size={25} style={styles.Icon} name="magnify"></Icon>
      <Modal
        visible={modalActive}
        onRequestClose={() => {
          setModalActive(false);
        }}
        transparent={true}>
        <View style={styles.outerview}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}></Text>
            <Pressable
            style={styles.modalButton}
              onPress={() => {
                setModalActive(false);
                navigation.navigate('EditarReceita');
              }}>
              <Text style={styles.submitText}>Editar</Text>
            </Pressable>
            <Pressable
            style={styles.modalButtonDelete}
              onPress={() => {
                setModalActive(false);
                setModalApagar(true);
              }}>
              <Text style={styles.submitText}>Excluir</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setModalActive(false);
              }}>
              <Text style={{fontSize: 18, color: '#cc0000'}}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalApagar}
        onRequestClose={() => {
          setModalApagar(false);
        }}
        transparent={true}>
        <View style={styles.outerview}>
          <View style={styles.modalView}>
            <CheckBox
              onValueChange={newValue => setCheckBox(newValue)}
              value={checkBox}></CheckBox>
            <Text style={{marginBottom: 10, fontSize: 18}}>Deseja excluir a receita?</Text>
            <Pressable
            style={styles.modalButtonDelete}
              onPress={() => {
                if (checkBox === true) {
                  ApagarReceita();
                  setModalApagar(false);
                  setLoading(!loading);
                }
              }}>
              <Text style={{fontSize: 18, color: '#ffffff'}} >Excluir</Text>
            </Pressable>
            <Pressable
            
              onPress={() => {
                setModalApagar(false);
              }}>
              <Text style={{fontSize: 18, color: '#cc0000'}}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <FlatList
        data={filteredData}
        //keyExtractor={(item, index) => index.toString()}
        style={{backgroundColor: '#F0F0F0'}}
        contentContainerStyle={{
         // flex: 1,
          marginHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        renderItem={({item}) => (
          // do the css to get the full image
          <TouchableWithoutFeedback
          onPress={()=>{
            setPage(item.ID_RECEITA);
                  setNavegarPaginaReceita(true);
                  navigation.navigate('PaginaReceita');
          }}
          >
          <View style={styles.listItem} >
            <SafeAreaView key={item.ID_RECEITA} /*style={{borderRadius: 30}}*/>
              <Image
                source={{uri: item.IMAGEM}}
                style={{
                  width: 360,
                  height: 150,
                  // elevation: 5,
                  //
                }}></Image>
              <TouchableOpacity
                onPress={() => {
                  setPage(item.ID_RECEITA);
                  setNavegarPaginaReceita(true);
                  navigation.navigate('PaginaReceita');
                  //setModalActive(true);
                  // open a little window to show the ingredients and steps
                }} /*onPress={()=>{
                
                }}*/
              >
                <Text
                  style={{
                    marginTop: 18,
                    fontSize: 20,
                    textAlign: 'center',
                    fontFamily: 'Outfit-Regular',
                    color: '#000000',
                  }}>
                  {item.TITULO}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    //backgroundColor: 'blue',
                    padding: 50,
                  }}>
                    
                  <Icon size={46} color='#48BF84' name="clock-outline"></Icon>
                  <Text
                  style={{
                    fontSize: 18,
                  }}
                  >tempo</Text>
                  <Text
                  style={{
                    fontSize: 26,
                    color: '#48BF84'
                  }}
                  >{item.TEMPO}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 50,
                  }}>
                  <Icon size={46} color='#48BF84' name="room-service-outline"></Icon>
                  <Text style={{
                    fontSize: 18,
                  }}>rendimento</Text>
                  <Text
                  style={{
                    color: '#48BF84',
                    fontSize: 26,
                  }}
                  >{item.PORCAO}</Text>
                </View>
                
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
              {item.ID_USUARIO === user.ID_USUARIO ? (
                <TouchableOpacity
                style={styles.button}
                  onPress={() => {
                    setModalActive(true);
                    setPage(item.ID_RECEITA);
                  }}>
                  <Text style={styles.submitText}>Alterar</Text>
                </TouchableOpacity>
              ) : null}
              </View>
            </SafeAreaView>
          </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Icon: {
    position: 'absolute',
    top: 27,
    left: 290,
  },
  button: {
    padding: 10,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#48BF84',
    width: '30%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    // paddingTop: 50,
  },
  modalButton: {
    padding: 10,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#48BF84',
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    // paddingTop: 50,
  },
  modalButtonDelete: {
    padding: 10,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#cc0000',
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    // paddingTop: 50,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 18,
   // fontWeight: 'bold',
   // padding: 50,
    
    fontFamily: 'Outfit-Regular',
  },
  closeText: {
    color: '#ffffff',
    fontSize: 18,
   // fontWeight: 'bold',
   // padding: 50,
    
    fontFamily: 'Outfit-Regular',
  },
  input: {
    paddingRight: 44,
    backgroundColor: '#ffffff',
    width: '70%',
    //marginBottom: 15,
    // marginTop: 35,
    color: '#000000',
    fontSize: 17,
    padding: 10,
    // borderBottomWidth: 2,
    // borderLeftWidth: 2,
    marginTop: 15,
    borderRadius: 30,
    // borderColor: '#D6D6D6',
    //borderBottomColor: '#ebebeb',
    fontFamily: 'Outfit-Regular',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
    color: '#595959',
  },
  outerview: {
    flex: 1,
    justifyContent: 'center',
     backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 35,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 30,
  },
  listItem: {
   // padding: 30,
    borderRadius: 10,
    marginTop: 40,
    // paddingLeft: 10,
    // marginRight: 10,
    //shadowOpacity: 10,
    //  shadowRadius: 0,
    // elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});

export default ListaReceitas;
