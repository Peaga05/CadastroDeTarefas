import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FIRESTORE_DB } from '../../firebaseConfig';

const Lista = ({ navigation }: any) => {

    const [tarefa, setTarefa] = useState('');
    const [tarefas, setTarefas] = useState<any[]>([]);

    useEffect(() => {
        const TarefasRef = collection(FIRESTORE_DB, 'Tarefas');
        const subscriber = onSnapshot(TarefasRef, {
            next: (snapshot) => {
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
    }, [])
    const addTarefa = async () => {
        const doc = addDoc(collection(FIRESTORE_DB, 'Tarefas'), { title: tarefa, done: false });
        setTarefa('');
    }

    const ExcluirElemento = async (id: any) => {
        try {
            const colecao = collection(FIRESTORE_DB, "Tarefas");
            const elemnento = doc(colecao, id);
            await deleteDoc(elemnento);
            alert("Elemento excluido com suecesso")
        } catch (error) {
            alert("Falha ao excluir: " + error)
        }
    }

    const AlterarElemento = (id: any) => {
        navigation.navigate('Alterar', { id });
    }

    return (
        <View>
            <View>
                {tarefas.map((tarefa) => (
                    <View style={styles.container}>
                        <View style={styles.listagem}>
                            <Text key={tarefa.id}>{tarefa.title}</Text>
                            <View style={styles.botoes}>
                                <TouchableOpacity
                                    style={styles.botaoExcluir}
                                    onPress={() => ExcluirElemento(tarefa.id)}
                                >
                                    <FontAwesomeIcon style={styles.textoBotao} icon={faTrash} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.botaoAlterar}
                                    onPress={() => AlterarElemento(tarefa.id)}
                                >
                                    <FontAwesomeIcon style={styles.textoBotao} icon={faPencil} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                ))}
            </View>
            <Button
                title='Cadastrar tarefas'
                onPress={() => { navigation.navigate('Cadastrar') }}
            />
        </View>
    );
}

export default Lista;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listagem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 200,
        marginVertical: 10,
        justifyContent: 'space-between'
    },
    botaoExcluir: {
        backgroundColor: '#F64',
        width: 100,
        height: 40,
        alignItems: 'center',
        marginHorizontal: 30,
        justifyContent: 'center',
        borderRadius: 5,
    },
    botaoAlterar: {
        backgroundColor: '#46F',
        width: 100,
        height: 40,
        alignItems: 'center',
        marginHorizontal: 30,
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: 10,
    },
    textoBotao: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    botoes: {
        flexDirection: 'row',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 10,
    }
});