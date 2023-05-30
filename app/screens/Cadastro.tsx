import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { FIRESTORE_DB, FIRESTORE_STORAGE } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';




const Cadastro = ({ navigation }: any) => {

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [imagem, setImagem] = useState('');

    const getImagem = async () =>{
        let imagem = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });        

       if(!imagem.canceled){
           setImagem(imagem.assets[0].uri);
       }
    }

    const addNoticia = async () => {
        const doc = addDoc(collection(FIRESTORE_DB, 'Noticias'), { titulo: titulo, descricao: descricao, data: data });
        setTitulo('');
        setDescricao('')
        alert("Noticia cadastrada!")
    }

    return (
        <View>
            <Text>CADASTRAR NOTICIA</Text>
            <TextInput
            style={styles.inputTxt}
                placeholder="Informe o titulo..."
                onChangeText={(t: string) => setTitulo(t)}
                value={titulo}
            />
            <TextInput
            style={styles.inputTxt}
                placeholder="Informe a descrição..."
                onChangeText={(t: string) => setDescricao(t)}
                value={descricao}
            />
            <Button
                onPress={getImagem}
                title="Selecionar imagem"
            />
            <Button
                onPress={() => addNoticia()}
                title="Adicionar Tarefa"
                disabled={titulo === '' && descricao === ''}
            />
             <Button
                title="Lista de tarefas"
                onPress={() => navigation.navigate("Lista")}
            />
             <Button
                title="Lista de noticias"
                onPress={() => navigation.navigate("Noticias")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputTxt:{
        
    }
});

export default Cadastro;


