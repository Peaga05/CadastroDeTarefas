import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { FIRESTORE_DB } from '../../firebaseConfig';

const Cadastro = ({ navigation }: any) => {

    const [tarefa, setTarefa] = useState('');

    const addTarefa = async () => {
        const doc = addDoc(collection(FIRESTORE_DB, 'Tarefas'), { title: tarefa, done: false });
        setTarefa('');
        alert("Tarefa cadastrada")
    }
    return (
        <View>
            <Text>Lista</Text>
            <TextInput
            style={styles.txtTarefa}
                placeholder="Informe a tarefa..."
                onChangeText={(t: string) => setTarefa(t)}
                value={tarefa}
            />
            <Button
                onPress={() => addTarefa()}
                title="Adicionar Tarefa"
                disabled={tarefa === ''}
            />
             <Button
                title="Lista de tarefas"
                onPress={() => navigation.navigate("Lista")}
            />
 
        </View>
    );
}

const styles = StyleSheet.create({
    txtTarefa:{
        
    }
});

export default Cadastro;


