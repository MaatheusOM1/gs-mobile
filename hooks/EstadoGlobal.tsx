import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

// Definindo tipos para Projeto e o contexto
export interface Projeto {
  id: number;
  titulo: string;
  descricao: string;
  objetivos: string;
  data_inicio: string;
  data_termino: string;
  meta_financiamento: number;
}

interface EstadoGlobalContextType {
  projetos: Projeto[];
  carregarProjetos: () => void;
  adicionarProjeto: (
    titulo: string,
    descricao: string,
    objetivos: string,
    data_inicio: string,
    data_termino: string,
    meta_financiamento: number
  ) => void;
  editarProjeto: (
    id: number,
    titulo: string,
    descricao: string,
    objetivos: string,
    data_inicio: string,
    data_termino: string,
    meta_financiamento: number
  ) => void;
  excluirProjeto: (id: number) => void;
}

const EstadoGlobalContext = createContext<EstadoGlobalContextType | undefined>(undefined);

interface ProvedorEstadoGlobalProps {
  children: ReactNode;
}

export const ProvedorEstadoGlobal: React.FC<ProvedorEstadoGlobalProps> = ({ children }) => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  const carregarProjetos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/projects');
      setProjetos(response.data);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    }
  };

  const adicionarProjeto = async (
    titulo: string,
    descricao: string,
    objetivos: string,
    data_inicio: string,
    data_termino: string,
    meta_financiamento: number
  ) => {
    try {
      const response = await axios.post('http://localhost:3000/projects', {
        titulo,
        descricao,
        objetivos,
        data_inicio,
        data_termino,
        meta_financiamento,
      });
      setProjetos([...projetos, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar projeto:', error);
    }
  };

  const editarProjeto = async (
    id: number,
    titulo: string,
    descricao: string,
    objetivos: string,
    data_inicio: string,
    data_termino: string,
    meta_financiamento: number
  ) => {
    try {
      await axios.put(`http://localhost:3000/projects/${id}`, {
        titulo,
        descricao,
        objetivos,
        data_inicio,
        data_termino,
        meta_financiamento,
      });
      setProjetos(projetos.map((projeto) => (projeto.id === id ? {
        id,
        titulo,
        descricao,
        objetivos,
        data_inicio,
        data_termino,
        meta_financiamento
      } : projeto)));
    } catch (error) {
      console.error('Erro ao editar projeto:', error);
    }
  };

  const excluirProjeto = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/projects/${id}`);
      setProjetos(projetos.filter((projeto) => projeto.id !== id));
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
    }
  };

  useEffect(() => {
    carregarProjetos();
  }, []);

  return (
    <EstadoGlobalContext.Provider value={{ projetos, carregarProjetos, adicionarProjeto, editarProjeto, excluirProjeto }}>
      {children}
    </EstadoGlobalContext.Provider>
  );
};

export const useEstadoGlobal = (): EstadoGlobalContextType => {
  const context = useContext(EstadoGlobalContext);
  if (!context) {
    throw new Error('useEstadoGlobal deve ser usado dentro de um ProvedorEstadoGlobal');
  }
  return context;
};
