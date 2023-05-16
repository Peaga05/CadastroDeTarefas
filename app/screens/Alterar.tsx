import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import { firestore } from 'react-native-firebase';
import { FIRESTORE_DB } from '../../firebaseConfig';

const Alterar = ({ route }: any) => {
    const id = route.params?.id;
    const [title, setTitle] = useState('');
    const [done, setDone] = useState('');

    useEffect(() => {
        const TarefasRef = collection(FIRESTORE_DB, 'Tarefas');
        const subscriber = onSnapshot(TarefasRef, {
            next: (snapshot) => {
                const tarefas: any[] = [];
                snapshot.docs.forEach(doc => {
                    if (doc.id === id) {
                        tarefas.push({
                            id: doc.id,
                            ...doc.data(),
                        })

                    }
                })
                setTitle(tarefas[0].title);
                setDone(tarefas[0].done);
            }
        })
        return () => subscriber();
    }, [])

    const Atualizar = async () =>{
        try{
            await firestore()
            .collection('Tarefas')
            .doc(id)
            .update({
                title: title,
                done: done,
            })
        }catch(error){
            alert("Deu ruim!" + error)
        }
    }

    return (


        <View>
            <TextInput
                value={title}
                onChangeText={(t) => setTitle(t)}
            />
            <TextInput
                value={done}
                onChangeText={(t) => setDone(t)}
            />
            <Button title='Alterar' onPress={Atualizar} />
        </View>




    );
}

export default Alterar;

