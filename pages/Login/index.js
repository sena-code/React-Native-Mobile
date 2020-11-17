import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {

    const[email, setEmail] = useState('');
    const[senha, setSenha ] = useState('');

    const salvar = async (value) => {
        try {
          await AsyncStorage.setItem('@jwt', value)
        } catch (e) {
          // saving error
        }
      }

    const Logar = () => {

        const loginn = {
            email : email,
            senha : senha
        }

        fetch('http://192.168.1.102:5000/api/Account/login', {

            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(loginn)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status != 404){
                alert('Seja Bem Vindx');

                navigation.push('Autenticado');

                salvar(data.token);
            }else{
                alert('Dados Inválidos');
            }
        })
    }

 return (
    
         <View style={styles.container}>
              <TextInput
                style={styles.input}
                 onChangeText={text => setEmail(text)}
                 value={email}
                 placeholder="Digite seu email"
    />
      <TextInput
                style={styles.input}
                 onChangeText={text => setSenha(text)}
                 value={senha}
                 placeholder="Digite sua Senha"
                 secureTextEntry={true}
    />
     <TouchableOpacity
        style={styles.button}
        onPress={Logar}
      >
        <Text style={styles.textbutton}>Logar</Text>
      </TouchableOpacity>

         </View>

         
    
 )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        width: '90%',height: 40, borderColor: 'gray', borderWidth: 1, marginTop : 20, padding: 5, borderRadius: 6,
    },
    button: {
        backgroundColor: 'black', 
        width: '90%',
        padding: 10,
        borderRadius: 6,
        marginTop : 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textbutton: {
        color: 'white',
        
    }
  });

export default Login;