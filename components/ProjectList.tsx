import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, Modal } from 'react-native';
import { useEstadoGlobal, Projeto } from '../hooks/EstadoGlobal';

const ProjectList: React.FC = () => {
  const { projetos, editarProjeto, excluirProjeto } = useEstadoGlobal();
  const [selectedProjeto, setSelectedProjeto] = useState<Projeto | null>(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [objetivos, setObjetivos] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataTermino, setDataTermino] = useState('');
  const [metaFinanciamento, setMetaFinanciamento] = useState('');

  const handleEditPress = (projeto: Projeto) => {
    setSelectedProjeto(projeto);
    setTitulo(projeto.titulo);
    setDescricao(projeto.descricao);
    setObjetivos(projeto.objetivos);
    setDataInicio(projeto.data_inicio);
    setDataTermino(projeto.data_termino);
    setMetaFinanciamento(projeto.meta_financiamento.toString());
  };

  const handleSavePress = () => {
    if (selectedProjeto) {
      editarProjeto(
        selectedProjeto.id,
        titulo,
        descricao,
        objetivos,
        dataInicio,
        dataTermino,
        parseFloat(metaFinanciamento)
      );
      setSelectedProjeto(null);
    }
  };

  return (
    <>
      <FlatList
        data={projetos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.titulo}</Text>
            <Text>{item.descricao}</Text>
            <Text>Objetivos: {item.objetivos}</Text>
            <Text>Data de Início: {item.data_inicio}</Text>
            <Text>Data de Término: {item.data_termino}</Text>
            <Text>Meta de Financiamento: {item.meta_financiamento}</Text>
            <Button title="Editar" onPress={() => handleEditPress(item)} />
            <Button title="Excluir" onPress={() => excluirProjeto(item.id)} />
          </View>
        )}
      />
      <Modal visible={selectedProjeto !== null} animationType="slide">
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={titulo}
            onChangeText={setTitulo}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
          />
          <TextInput
            style={styles.input}
            placeholder="Objetivos"
            value={objetivos}
            onChangeText={setObjetivos}
          />
          <TextInput
            style={styles.input}
            placeholder="Data de Início"
            value={dataInicio}
            onChangeText={setDataInicio}
          />
          <TextInput
            style={styles.input}
            placeholder="Data de Término"
            value={dataTermino}
            onChangeText={setDataTermino}
          />
          <TextInput
            style={styles.input}
            placeholder="Meta de Financiamento"
            value={metaFinanciamento}
            onChangeText={setMetaFinanciamento}
            keyboardType="numeric"
          />
          <Button title="Salvar" onPress={handleSavePress} />
          <Button title="Cancelar" onPress={() => setSelectedProjeto(null)} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    paddingHorizontal: 10,
  },
});

export default ProjectList;
