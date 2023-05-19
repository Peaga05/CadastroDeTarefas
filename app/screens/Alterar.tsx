import { collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import { firestore } from 'react-native-firebase';
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
        navigation.navigate("Lista");
    }

    return (
        <View>
            <TextInput
                value={tarefa.title}
                onChangeText={(t) => handleAtualuzaTexto('title', t)}
            />
            <TextInput
                value={tarefa.done}
                onChangeText={(t) => handleAtualuzaTexto('done', t)}
            />
            <Button title='Alterar' onPress={handleUpdateTarefa} />
        </View>
    );
}

export default Alterar;

