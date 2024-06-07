import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProvedorEstadoGlobal, useEstadoGlobal } from './hooks/EstadoGlobal';
import ProjectList from './components/ProjectList';
import ProjectInfo from './components/ProjectInfo';

const Stack = createNativeStackNavigator();

const AppContent: React.FC<{ navigation: any }> = ({ navigation }) => {
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
        <TouchableOpacity style={styles.button} onPress={handleAddProject}>
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
        <ProjectList />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProjectInfo')}>
          <Text style={styles.buttonText}>Sobre o Projeto</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const App: React.FC = () => (
  <ProvedorEstadoGlobal>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={AppContent} options={{ title: 'Gerenciamento de Projetos' }} />
        <Stack.Screen name="ProjectInfo" component={ProjectInfo} options={{ title: 'Sobre o Projeto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  </ProvedorEstadoGlobal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2937',
    padding: 32,
  },
  scrollContainer: {
    paddingTop: 56,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#e1f1ff',
  },
  input: {
    height: 64,
    backgroundColor: '#2f3a45',
    marginBottom: 24,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#455a64',
    fontSize: 20,
    color: '#fff',
  },
  button: {
    backgroundColor: '#d9534f',
    paddingVertical: 16,
    marginBottom: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default App;
