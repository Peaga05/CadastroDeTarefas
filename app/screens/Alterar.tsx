import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Button, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';;
import { FIRESTORE_DB } from '../../firebaseConfig';

const Alterar = ({navigation,  route }: any) => {
    const { id } = route.params;
    const [tarefa, setTarefa] = useState<any>({});

    useEffect(() => {
        const fetchTarefa = async () => {
            const colecao = doc(FIRESTORE_DB, 'Tarefas', id);
            const colecaoSnapshot = await getDoc(colecao);
            if(colecaoSnapshot.exists()){
                setTarefa({
                    id: colecaoSnapshot.id,
                    ...colecaoSnapshot.data()
                });
            }
        }
        fetchTarefa();
    }, []);

    const handleAtualuzaTexto = (key: string, value: string) =>{
        setTarefa({
            ...tarefa,
            [key]: value
        });
    }

    const handleUpdateTarefa = async () => {
        const colecao = doc(FIRESTORE_DB, 'Tarefas', id);
        await updateDoc(colecao, tarefa);
        alert("Dados alterados com sucesso")
        navigation.navigate("Lista");
    }

    return (
        <View>
            <TextInput
                style={styles.input}
                value={tarefa.title}
                onChangeText={(t) => handleAtualuzaTexto('title', t)}
            />
            <TextInput
                style={styles.input}
                value={tarefa.done}
                onChangeText={(t) => handleAtualuzaTexto('done', t)}
            />
            <TouchableOpacity style={styles.alterar} onPress={handleUpdateTarefa}>
                <Text style={styles.textoBotao}>Alterar</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Alterar;

const styles = StyleSheet.create({
    input:{
        height: 40,
        margin: 10,
        fontSize: 20,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
    },
    alterar:{
        backgroundColor: '#46F',
        width: 200,
        height: 40,
        alignItems: 'center',
        marginHorizontal: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginLeft: 10,
    },
    textoBotao: {
        color: '#FFF',
        fontWeight: 'bold'
    },
})