import React, {useEffect, useState, useContext} from 'react';
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
import CheckBox from '@react-native-community/checkbox';
import {AuthContext} from './contexts/Auth';
import Api from './Api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const PaginaReceita = () => {
  const {logged, setLogged, user, setUser, loading, setLoading, setPage, page} =
    useContext(AuthContext);

  const [checked, setChecked] = useState({})
  const [receita, setReceita] = useState({});
  const [ingredientes, setIngredientes] = useState([{NOME: ''}]);
  const [passos, setPassos] = useState([{DESCRICAO: ''}]);
  const [loadingData, setLoadingData] = useState(false);
  const [ArrCheckBoxPassos, setArrCheckBoxPassos] = useState([]);
  useEffect(() => {
    CarregarReceita();
    CarregarIngredientes();
    CarregarPassos();
    setLoadingData(true);
    //console.log(page);
  }, []);

  useEffect(() =>{
    if(ArrCheckBoxPassos === true){
      let arr = [];
      for(i = 0; i < passos.length; i++){
        arr.push(false);
      //  console.log(arr[i]);
      }
      setChecked(arr);
    }
  },[ArrCheckBoxPassos])
  const CarregarReceita = () => {
    const funcCarregar = async () => {
      try {
        const carregar = await Api.get(`/receitas/${page}`);

        setReceita(carregar.data);
      } catch {
        console.log('falha ao carregar');
      }
    };
    funcCarregar();
  };
  const CarregarIngredientes = () => {
    const funcCarregar = async () => {
      try {
        const carregar = await Api.get(`/ingredientesreceita/${page}`);

        setIngredientes(carregar.data);
      } catch {
        console.log('falha ao carregar');
      }
    };
    funcCarregar();
  };
  const CarregarPassos = () => {
    const funcCarregar = async () => {
      try {
        const carregar = await Api.get(`/passosreceita/${page}`);

        setPassos(carregar.data);
        setArrCheckBoxPassos(true);
      } catch {
        console.log('falha ao carregar');
      }
    };
    funcCarregar();
  };

  return (
    <ScrollView style={{backgroundColor: '#F0F0F0'}}>
      <View
        style={{
          backgroundColor: '#ffffff',
          marginTop: 25,
          paddingBottom: 20,
          marginBottom: 5,
        }}>
        <Image
          source={{uri: receita.IMAGEM}}
          style={{
            width: 412,
            height: 250,
          }}></Image>
        <View style={{marginTop: 20}}>
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
                backgroundColor: '#F0F0F0',
                padding: 50,
                marginRight: 5,
              }}>
              <Icon size={46} color="#48BF84" name="clock-outline"></Icon>
              <Text
                style={{
                  fontSize: 18,
                }}>
                tempo
              </Text>
              <Text
                style={{
                  fontSize: 26,
                  color: '#48BF84',
                }}>
                {receita.TEMPO}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 50,
                marginLeft: 5,
                // borderLeftWidth: 2,
                //  borderColor: '#ADADAD',
                backgroundColor: '#F0F0F0',
              }}>
              <Icon
                size={46}
                color="#48BF84"
                name="room-service-outline"></Icon>
              <Text
                style={{
                  fontSize: 18,
                }}>
                rendimento
              </Text>
              <Text
                style={{
                  color: '#48BF84',
                  fontSize: 26,
                }}>
                {receita.PORCAO}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#ffffff',
          marginTop: 10,
          paddingTop: 25,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '80%',
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            // justifyContent: 'center',
            //  alignItems: 'center',
          }}>
          <Icon size={46} color="#48BF84" name="food"></Icon>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <Text
              style={{
                left: '20%',
                fontSize: 18,
                color: '#48BF84',
              }}>
              Ingredientes
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          // width: '70%',
          backgroundColor: '#ffffff',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 20,
        }}>
        {loadingData === true ? (
          ingredientes.map((item, index) => (
            <View
              style={{
                flexDirection: 'row',
                width: '70%',
                // paddingTop: 25,
              }}
              key={index}>
              <Icon name="circle-medium" color={'#F25744'} size={25}></Icon>
              <Text
                style={{
                  fontSize: 18,
                }}>
                {item.NOME}
              </Text>
            </View>
          ))
        ) : (
          <Text>Carregando</Text>
        )}
      </View>
      <View
        style={{
          backgroundColor: '#ffffff',
          // marginTop: 10,
          paddingTop: 25,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '80%',
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            // justifyContent: 'center',
            //  alignItems: 'center',
          }}>
          <Icon size={46} color="#48BF84" name="blender"></Icon>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <Text
              style={{
                left: '20%',
                fontSize: 18,
                color: '#48BF84',
              }}>
              Passos
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          // width: '70%',
          backgroundColor: '#ffffff',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 20,
          paddingBottom: 20,
        }}>
        {loadingData === true ? (
          passos.map((item, index) => (
        
            <View
              style={{
                flexDirection: 'row',
                width: '60%',
                // paddingTop: 25,
                alignItems: 'center',
                //justifyContent: 'center',
              }}
              key={index}>
                <Text
                style={{
                  fontSize: 45,
                  color: '#48BF84',
                }}
                >{index + 1} </Text>
              <Text
                style={{
                  fontSize: 18,
                }}>
                {item.DESCRICAO}
              </Text>
              
              <View style={{
                //width: "40%",
              //  backgroundColor: 'blue',
                justifyContent: 'flex-start'
              }}>
             <CheckBox
              style={{
               // marginLeft: 'auto'
                //paddingLeft: 10
              }}
            value={checked[index]}
            onValueChange={()=>{
              setChecked(checked.map((itemc, indexc) => {
                if(index === indexc){
                //return only the item that is checked
                return !itemc
                  
                }
                else{
                  return itemc
                }
              }))
            }}
            //set this onValueChange to a function that deals with array of usestate
              ></CheckBox>
              </View>
            </View>
            
          ))
        ) : (
          <Text>Carregando</Text>
        )}
      </View>
    </ScrollView>
  );
};
export default PaginaReceita;
