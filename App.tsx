import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, ScrollView } from 'react-native';
import { ProvedorEstadoGlobal, useEstadoGlobal } from './hooks/EstadoGlobal';
import ProjectList from './components/ProjectList';

const AppContent: React.FC = () => {
  const { adicionarProjeto } = useEstadoGlobal();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [objetivos, setObjetivos] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataTermino, setDataTermino] = useState('');
  const [metaFinanciamento, setMetaFinanciamento] = useState('');

  const handleAddProject = () => {
    if (titulo && descricao && objetivos && dataInicio && dataTermino && metaFinanciamento) {
      adicionarProjeto(titulo, descricao, objetivos, dataInicio, dataTermino, parseFloat(metaFinanciamento));
      setTitulo('');
      setDescricao('');
      setObjetivos('');
      setDataInicio('');
      setDataTermino('');
      setMetaFinanciamento('');
    } else {
      alert('Por favor, preencha todos os campos');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Cadastro de Projetos</Text>
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
        <Button title="Adicionar Projeto" onPress={handleAddProject} />
        <ProjectList />
      </ScrollView>
    </SafeAreaView>
  );
};

const App: React.FC = () => (
  <ProvedorEstadoGlobal>
    <AppContent />
  </ProvedorEstadoGlobal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
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

export default App;
