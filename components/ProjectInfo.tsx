import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const ProjectInfo: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Solução Proposta
        {"\n\n"}
        É uma plataforma de crowdfunding voltada para projetos de economia azul, se apresenta como uma ferramenta estratégica para impulsionar iniciativas que visam solucionar desafios oceânicos. Com a integração da inteligência artificial (IA) nesse processo potencializa a capacidade de conectar investidores a projetos promissores, avaliando sua viabilidade e monitorando seu progresso de forma eficaz. 
        Além disso, a plataforma utiliza IA para avaliar a viabilidade e o impacto potencial dos projetos apresentados. Essa avaliação criteriosa garante que os investimentos sejam direcionados a iniciativas com maior probabilidade de sucesso e relevância, aumentando a confiança dos investidores na plataforma. 
        O monitoramento de desempenho é outra função importante, acompanhando o progresso dos projetos financiados, a plataforma fornece relatórios detalhados aos investidores, garantindo transparência e permitindo ajustes estratégicos quando necessário. 
        A plataforma também promove o engajamento comunitário, envolvendo as comunidades locais na concepção e implementação dos projetos. Esse engajamento é fundamental para garantir que as iniciativas atendam às necessidades reais das populações afetadas e promovam benefícios sociais.
        {"\n\n"}
        {"\n\n"}
        Integrantes:
        {"\n\n"}
        Breno Giacoppini Câmara/ RM: 98695
        {"\n\n"}
        Jaqueline Martins Dos Santos/ RM: 551744
        {"\n\n"}
        Mariana Bastos Esteves / RM: 97510
        {"\n\n"}
        Matheus Oliveira Macedo/ RM: 551155
        {"\n\n"}
        Victor Freitas Silva/ RM: 99982
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 50,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ProjectInfo;
