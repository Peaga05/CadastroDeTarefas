import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FIRESTORE_DB } from '../../firebaseConfig';

const Lista = ({ navigation }: any) => {

    const [tarefa, setTarefa] = useState('');
    const [tarefas, setTarefas] = useState<any[]>([]);

    useEffect(() =>{
        const TarefasRef = collection(FIRESTORE_DB, 'Tarefas');
        const subscriber = onSnapshot(TarefasRef, {
            next: (snapshot) =>{
                const tarefas: any[] = [];
                snapshot.docs.forEach(doc => {
                    tarefas.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                })
                setTarefas(tarefas)
            }
        })
        return () => subscriber();
    },[])
    const addTarefa = async () => {
        const doc = addDoc(collection(FIRESTORE_DB, 'Tarefas'), { title: tarefa, done: false });
        setTarefa('');
    }

    const ExcluirElemento = async (id : any) => {
        try {
            const  colecao = collection(FIRESTORE_DB, "Tarefas");
            const elemnento = doc(colecao, id);
            await deleteDoc(elemnento);
            alert("Elemento excluido com suecesso")
        } catch (error) {
            alert("Falha ao excluir: " + error)
        }
    }

    const AlterarElemento = (id: any) =>{
        navigation.navigate('Alterar', { id });
    }

    return (
        <View>
            <View>
                {tarefas.map((tarefa) => (
                    <>
                     <Text key={tarefa.id}>{tarefa.title}</Text>
                     <TouchableOpacity
                        onPress={()=> ExcluirElemento(tarefa.id)}
                     >
                        <Text>Excluir</Text>
                     </TouchableOpacity>

                     <TouchableOpacity
                        onPress={()=> AlterarElemento(tarefa.id)}
                     >
                        <Text>Alterar</Text>
                     </TouchableOpacity>
                    </>  

                ))}
            </View>
            <Button
                title='Cadastrar tarefas'
                onPress={()=>{navigation.navigate('Cadastrar')}}
            />
        </View>
    );
}

export default Lista;

const styles = StyleSheet.create({
    
})