"use client";

import { useState } from "react";
import { 
  Home, 
  FileText, 
  Calendar, 
  MessageSquare, 
  User, 
  Plus, 
  Users, 
  Clock, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X,
  CircleDollarSign,
  Sparkles,
  FileCheck,
  TrendingUp,
  PieChart,
  Send,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Download,
  Upload
} from "lucide-react";

type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type Paciente = {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  dataNascimento: string;
  convenio: string;
};

type Consulta = {
  id: number;
  pacienteNome: string;
  data: string;
  horario: string;
  tipo: string;
  status: "agendada" | "confirmada" | "realizada" | "cancelada";
};

type Atendimento = {
  id: number;
  pacienteNome: string;
  data: string;
  queixa: string;
  evolucao: string;
  cid: string;
};

export default function IMedConsultas() {
  const [activeMenu, setActiveMenu] = useState("inicio");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"paciente" | "consulta" | "atendimento" | "ia" | "nota" | null>(null);

  // Estados para formulários
  const [novoPaciente, setNovoPaciente] = useState<Partial<Paciente>>({});
  const [novaConsulta, setNovaConsulta] = useState<Partial<Consulta>>({});
  const [novoAtendimento, setNovoAtendimento] = useState<Partial<Atendimento>>({});

  // Dados mockados
  const [pacientes] = useState<Paciente[]>([
    { id: 1, nome: "Maria Santos", cpf: "123.456.789-00", telefone: "(11) 98765-4321", email: "maria@email.com", dataNascimento: "15/03/1985", convenio: "Particular" },
    { id: 2, nome: "Pedro Oliveira", cpf: "987.654.321-00", telefone: "(11) 91234-5678", email: "pedro@email.com", dataNascimento: "22/07/1990", convenio: "Unimed" },
    { id: 3, nome: "Ana Costa", cpf: "456.789.123-00", telefone: "(11) 99876-5432", email: "ana@email.com", dataNascimento: "10/11/1978", convenio: "Bradesco Saúde" },
  ]);

  const [consultas] = useState<Consulta[]>([
    { id: 1, pacienteNome: "Maria Santos", data: "2024-01-15", horario: "09:00", tipo: "Consulta de Rotina", status: "confirmada" },
    { id: 2, pacienteNome: "Pedro Oliveira", data: "2024-01-15", horario: "10:30", tipo: "Retorno", status: "agendada" },
    { id: 3, pacienteNome: "Ana Costa", data: "2024-01-15", horario: "14:00", tipo: "Primeira Consulta", status: "agendada" },
  ]);

  const [atendimentos] = useState<Atendimento[]>([
    { id: 1, pacienteNome: "Maria Santos", data: "2024-01-10", queixa: "Dor de cabeça persistente", evolucao: "Paciente apresenta melhora após medicação prescrita", cid: "R51 - Cefaleia" },
    { id: 2, pacienteNome: "Pedro Oliveira", data: "2024-01-12", queixa: "Dor nas costas", evolucao: "Iniciado tratamento fisioterápico", cid: "M54.5 - Dor lombar baixa" },
  ]);

  const menuItems: MenuItem[] = [
    { id: "inicio", label: "Início", icon: <Home className="w-5 h-5" /> },
    { id: "prontuarios", label: "Prontuários", icon: <FileText className="w-5 h-5" /> },
    { id: "agenda", label: "Agenda", icon: <Calendar className="w-5 h-5" /> },
    { id: "contabilidade", label: "Contabilidade", icon: <CircleDollarSign className="w-5 h-5" /> },
    { id: "mensagens", label: "Mensagens", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "ia-medica", label: "IA Médica", icon: <Sparkles className="w-5 h-5" /> },
  ];

  const openModal = (type: typeof modalType) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setNovoPaciente({});
    setNovaConsulta({});
    setNovoAtendimento({});
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "inicio":
        return renderInicio();
      case "prontuarios":
        return renderProntuarios();
      case "agenda":
        return renderAgenda();
      case "contabilidade":
        return renderContabilidade();
      case "mensagens":
        return renderMensagens();
      case "ia-medica":
        return renderIAMedica();
      default:
        return renderInicio();
    }
  };

  const renderInicio = () => (
    <>
      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button 
            onClick={() => openModal("paciente")}
            className="bg-gradient-to-br from-pink-100 to-pink-50 hover:from-pink-200 hover:to-pink-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-pink-200 rounded-lg group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5 text-pink-700" />
              </div>
              <h4 className="font-bold text-pink-900">Novo Paciente</h4>
            </div>
            <p className="text-sm text-pink-700">Cadastrar novo paciente no sistema</p>
          </button>

          <button 
            onClick={() => openModal("consulta")}
            className="bg-gradient-to-br from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-200 rounded-lg group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5 text-amber-700" />
              </div>
              <h4 className="font-bold text-amber-900">Novo Agendamento</h4>
            </div>
            <p className="text-sm text-amber-700">Agendar consulta para paciente</p>
          </button>

          <button 
            onClick={() => openModal("nota")}
            className="bg-gradient-to-br from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-200 rounded-lg group-hover:scale-110 transition-transform">
                <FileCheck className="w-5 h-5 text-blue-700" />
              </div>
              <h4 className="font-bold text-blue-900">Emitir Nota Fiscal</h4>
            </div>
            <p className="text-sm text-blue-700">Gerar nota fiscal de atendimento</p>
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximas Consultas */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Próximas Consultas</h3>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {consultas.slice(0, 3).map((consulta) => (
              <div key={consulta.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                <div className="w-12 h-12 bg-[#4A90E2] rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{consulta.pacienteNome}</p>
                  <p className="text-sm text-gray-500">{consulta.tipo}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-[#4A90E2]">{consulta.horario}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    consulta.status === "confirmada" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {consulta.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Estatísticas de Hoje</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
              <Users className="w-8 h-8 text-green-600 mb-2" />
              <p className="text-2xl font-bold text-green-900">12</p>
              <p className="text-sm text-green-700">Pacientes Atendidos</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
              <Calendar className="w-8 h-8 text-blue-600 mb-2" />
              <p className="text-2xl font-bold text-blue-900">8</p>
              <p className="text-sm text-blue-700">Consultas Agendadas</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
              <CircleDollarSign className="w-8 h-8 text-purple-600 mb-2" />
              <p className="text-2xl font-bold text-purple-900">R$ 2.400</p>
              <p className="text-sm text-purple-700">Receita do Dia</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
              <MessageSquare className="w-8 h-8 text-orange-600 mb-2" />
              <p className="text-2xl font-bold text-orange-900">5</p>
              <p className="text-sm text-orange-700">Mensagens Pendentes</p>
            </div>
          </div>
        </div>
      </div>

      {/* IA Médica Banner */}
      <div className="mt-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold mb-1">IA Médica Disponível</h3>
            <p className="text-sm text-white/90">Gere laudos, atestados e declarações automaticamente com inteligência artificial</p>
          </div>
          <button 
            onClick={() => setActiveMenu("ia-medica")}
            className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all whitespace-nowrap"
          >
            Experimentar Agora
          </button>
        </div>
      </div>
    </>
  );

  const renderProntuarios = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">Prontuários dos Pacientes</h3>
        <button 
          onClick={() => openModal("atendimento")}
          className="bg-[#4A90E2] text-white px-4 py-2 rounded-lg hover:bg-[#3A7BC8] transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nova Evolução
        </button>
      </div>

      {/* Lista de Pacientes */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h4 className="font-bold text-gray-800 mb-4">Pacientes Cadastrados</h4>
        <div className="space-y-3">
          {pacientes.map((paciente) => (
            <div key={paciente.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#4A90E2] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{paciente.nome}</p>
                    <p className="text-sm text-gray-600">CPF: {paciente.cpf}</p>
                    <p className="text-sm text-gray-600">Telefone: {paciente.telefone}</p>
                    <p className="text-sm text-gray-600">Convênio: {paciente.convenio}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-all">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-red-100 rounded-lg transition-all">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Atendimentos Recentes */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h4 className="font-bold text-gray-800 mb-4">Atendimentos e Evoluções</h4>
        <div className="space-y-4">
          {atendimentos.map((atendimento) => (
            <div key={atendimento.id} className="p-4 border border-gray-200 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-800">{atendimento.pacienteNome}</p>
                  <p className="text-sm text-gray-500">{atendimento.data}</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{atendimento.cid}</span>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Queixa Principal:</p>
                  <p className="text-sm text-gray-600">{atendimento.queixa}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Evolução:</p>
                  <p className="text-sm text-gray-600">{atendimento.evolucao}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAgenda = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">Agenda de Consultas</h3>
        <button 
          onClick={() => openModal("consulta")}
          className="bg-[#4A90E2] text-white px-4 py-2 rounded-lg hover:bg-[#3A7BC8] transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nova Consulta
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="space-y-4">
          {consultas.map((consulta) => (
            <div key={consulta.id} className="p-4 border-l-4 border-[#4A90E2] bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#4A90E2]">{consulta.horario}</p>
                    <p className="text-xs text-gray-500">{consulta.data}</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{consulta.pacienteNome}</p>
                    <p className="text-sm text-gray-600">{consulta.tipo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    consulta.status === "confirmada" ? "bg-green-100 text-green-700" :
                    consulta.status === "realizada" ? "bg-blue-100 text-blue-700" :
                    consulta.status === "cancelada" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {consulta.status}
                  </span>
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-all">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContabilidade = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Contabilidade e Finanças</h3>

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
          <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
          <p className="text-sm text-green-700 mb-1">Receita Total (Mês)</p>
          <p className="text-3xl font-bold text-green-900">R$ 48.500</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl">
          <CircleDollarSign className="w-8 h-8 text-red-600 mb-3" />
          <p className="text-sm text-red-700 mb-1">Despesas (Mês)</p>
          <p className="text-3xl font-bold text-red-900">R$ 12.300</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
          <PieChart className="w-8 h-8 text-blue-600 mb-3" />
          <p className="text-sm text-blue-700 mb-1">Lucro Líquido</p>
          <p className="text-3xl font-bold text-blue-900">R$ 36.200</p>
        </div>
      </div>

      {/* Gráfico de Pizza - Distribuição de Pacientes */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h4 className="font-bold text-gray-800 mb-4">Distribuição de Pacientes</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Particular</span>
              <span className="font-bold text-blue-700">45 (35%)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">Unimed</span>
              <span className="font-bold text-green-700">38 (30%)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-gray-700">Bradesco Saúde</span>
              <span className="font-bold text-purple-700">28 (22%)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="text-gray-700">Outros Convênios</span>
              <span className="font-bold text-orange-700">17 (13%)</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 via-green-400 to-purple-400 flex items-center justify-center">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-800">128</p>
                  <p className="text-sm text-gray-600">Pacientes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notas Fiscais Emitidas */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-800">Notas Fiscais Emitidas</h4>
          <button 
            onClick={() => openModal("nota")}
            className="bg-[#4A90E2] text-white px-4 py-2 rounded-lg hover:bg-[#3A7BC8] transition-all flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Emitir Nota
          </button>
        </div>
        <div className="space-y-3">
          {[
            { numero: "001234", paciente: "Maria Santos", valor: "R$ 200,00", data: "15/01/2024" },
            { numero: "001235", paciente: "Pedro Oliveira", valor: "R$ 150,00", data: "15/01/2024" },
            { numero: "001236", paciente: "Ana Costa", valor: "R$ 200,00", data: "14/01/2024" },
          ].map((nota, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800">NF-e {nota.numero}</p>
                <p className="text-sm text-gray-600">{nota.paciente}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-700">{nota.valor}</p>
                <p className="text-xs text-gray-500">{nota.data}</p>
              </div>
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-all">
                <Download className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMensagens = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Sistema de Mensagens Automáticas</h3>

      {/* Configurações de Mensagens */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h4 className="font-bold text-gray-800 mb-4">Configurações de Envio</h4>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-800">Confirmação de Consulta</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className="text-sm text-gray-600 ml-8">Enviar mensagem 1 dia antes da consulta</p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-gray-800">Lembrete de Retorno</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className="text-sm text-gray-600 ml-8">Enviar após 2 consultas perdidas</p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-800">Mensagem de Alta</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className="text-sm text-gray-600 ml-8">Desativar mensagens automáticas após alta</p>
          </div>
        </div>
      </div>

      {/* Mensagens Enviadas */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h4 className="font-bold text-gray-800 mb-4">Mensagens Recentes</h4>
        <div className="space-y-3">
          {[
            { paciente: "Maria Santos", tipo: "Confirmação", status: "Enviada", data: "14/01/2024 18:00" },
            { paciente: "Pedro Oliveira", tipo: "Confirmação", status: "Lida", data: "14/01/2024 17:30" },
            { paciente: "Carlos Souza", tipo: "Retorno", status: "Enviada", data: "13/01/2024 10:00" },
          ].map((msg, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-800">{msg.paciente}</p>
                  <p className="text-sm text-gray-600">{msg.tipo}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs px-3 py-1 rounded-full ${
                  msg.status === "Lida" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                }`}>
                  {msg.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">{msg.data}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIAMedica = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-lg p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Sparkles className="w-12 h-12" />
          <div>
            <h3 className="text-3xl font-bold">IA Médica</h3>
            <p className="text-white/90">Geração automática de documentos médicos</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => openModal("ia")}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group"
        >
          <div className="p-3 bg-purple-100 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="font-bold text-gray-800 mb-2">Gerar Laudo</h4>
          <p className="text-sm text-gray-600">Crie laudos médicos automaticamente com base no CID e evolução</p>
        </button>

        <button 
          onClick={() => openModal("ia")}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group"
        >
          <div className="p-3 bg-blue-100 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform">
            <FileCheck className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-bold text-gray-800 mb-2">Gerar Atestado</h4>
          <p className="text-sm text-gray-600">Emita atestados médicos de forma rápida e profissional</p>
        </button>

        <button 
          onClick={() => openModal("ia")}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group"
        >
          <div className="p-3 bg-green-100 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="font-bold text-gray-800 mb-2">Gerar Declaração</h4>
          <p className="text-sm text-gray-600">Crie declarações médicas personalizadas instantaneamente</p>
        </button>
      </div>

      {/* Exemplo de Uso */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h4 className="font-bold text-gray-800 mb-4">Como Funciona</h4>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-purple-600">1</span>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Selecione o Paciente</p>
              <p className="text-sm text-gray-600">Escolha o paciente e o atendimento que deseja documentar</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-purple-600">2</span>
            </div>
            <div>
              <p className="font-semibold text-gray-800">IA Analisa os Dados</p>
              <p className="text-sm text-gray-600">A inteligência artificial processa o CID, evolução e histórico</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-purple-600">3</span>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Documento Pronto</p>
              <p className="text-sm text-gray-600">Receba o documento formatado e pronto para uso em segundos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
            <h3 className="text-xl font-bold text-gray-800">
              {modalType === "paciente" && "Novo Paciente"}
              {modalType === "consulta" && "Nova Consulta"}
              {modalType === "atendimento" && "Nova Evolução"}
              {modalType === "ia" && "Gerar Documento com IA"}
              {modalType === "nota" && "Emitir Nota Fiscal"}
            </h3>
            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {modalType === "paciente" && (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Digite o nome completo" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">CPF</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="000.000.000-00" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Data de Nascimento</label>
                    <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                    <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="(00) 00000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="email@exemplo.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Convênio</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Particular</option>
                    <option>Unimed</option>
                    <option>Bradesco Saúde</option>
                    <option>SulAmérica</option>
                    <option>Amil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Anamnese (Histórico Médico)</label>
                  <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={4} placeholder="Histórico de doenças, alergias, medicamentos em uso..."></textarea>
                </div>
                <button type="submit" className="w-full bg-[#4A90E2] text-white py-3 rounded-lg font-semibold hover:bg-[#3A7BC8] transition-all">
                  Cadastrar Paciente
                </button>
              </form>
            )}

            {modalType === "consulta" && (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Selecionar Paciente</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Selecione um paciente</option>
                    {pacientes.map(p => <option key={p.id}>{p.nome}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Data</label>
                    <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Horário</label>
                    <input type="time" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Consulta</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Primeira Consulta</option>
                    <option>Consulta de Rotina</option>
                    <option>Retorno</option>
                    <option>Emergência</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Observações</label>
                  <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3} placeholder="Observações sobre a consulta..."></textarea>
                </div>
                <button type="submit" className="w-full bg-[#4A90E2] text-white py-3 rounded-lg font-semibold hover:bg-[#3A7BC8] transition-all">
                  Agendar Consulta
                </button>
              </form>
            )}

            {modalType === "atendimento" && (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Selecionar Paciente</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Selecione um paciente</option>
                    {pacientes.map(p => <option key={p.id}>{p.nome}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Data do Atendimento</label>
                  <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Queixa Principal</label>
                  <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3} placeholder="Descreva a queixa principal do paciente..."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Evolução do Quadro</label>
                  <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={4} placeholder="Descreva a evolução do paciente, tratamento realizado..."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CID (Código Internacional de Doenças)</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ex: R51 - Cefaleia" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Prescrição/Conduta</label>
                  <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3} placeholder="Medicamentos prescritos, orientações..."></textarea>
                </div>
                <button type="submit" className="w-full bg-[#4A90E2] text-white py-3 rounded-lg font-semibold hover:bg-[#3A7BC8] transition-all">
                  Salvar Evolução
                </button>
              </form>
            )}

            {modalType === "ia" && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                  <p className="text-sm text-gray-700">
                    <strong>Como funciona:</strong> Selecione um paciente e atendimento. A IA irá gerar automaticamente o documento baseado no CID, evolução e histórico do paciente.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Documento</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Laudo Médico</option>
                    <option>Atestado Médico</option>
                    <option>Declaração</option>
                    <option>Receita Médica</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Selecionar Paciente</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Selecione um paciente</option>
                    {pacientes.map(p => <option key={p.id}>{p.nome}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Selecionar Atendimento</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Selecione um atendimento</option>
                    {atendimentos.map(a => <option key={a.id}>{a.data} - {a.queixa}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Informações Adicionais (Opcional)</label>
                  <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3} placeholder="Adicione informações extras que deseja incluir no documento..."></textarea>
                </div>
                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Gerar Documento com IA
                </button>
              </div>
            )}

            {modalType === "nota" && (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Selecionar Paciente</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Selecione um paciente</option>
                    {pacientes.map(p => <option key={p.id}>{p.nome}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição do Serviço</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ex: Consulta médica" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Valor (R$)</label>
                    <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="200,00" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Data</label>
                    <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Forma de Pagamento</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Dinheiro</option>
                    <option>Cartão de Crédito</option>
                    <option>Cartão de Débito</option>
                    <option>PIX</option>
                    <option>Convênio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Observações</label>
                  <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={2} placeholder="Observações sobre a nota fiscal..."></textarea>
                </div>
                <button type="submit" className="w-full bg-[#4A90E2] text-white py-3 rounded-lg font-semibold hover:bg-[#3A7BC8] transition-all flex items-center justify-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  Emitir Nota Fiscal
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#4A90E2]">iMed Consultas</h1>
          <p className="text-sm text-gray-500 mt-1">Sistema Médico Completo</p>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeMenu === item.id
                  ? "bg-[#4A90E2] text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all mt-4">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Configurações</span>
        </button>
      </aside>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-lg shadow-lg"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
          <aside className="w-64 bg-white h-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-8 mt-12">
              <h1 className="text-2xl font-bold text-[#4A90E2]">iMed Consultas</h1>
              <p className="text-sm text-gray-500 mt-1">Sistema Médico Completo</p>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeMenu === item.id
                      ? "bg-[#4A90E2] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Clínica Saúde & Vida</h2>
              <p className="text-sm text-gray-500 mt-1">Cuidando de você com excelência</p>
              <div className="flex items-center gap-2 mt-2">
                <User className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-600">Dr. João Silva - CRM 12345</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-10 h-10 bg-[#4A90E2] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">JS</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        {renderContent()}
      </main>

      {/* Modal */}
      {renderModal()}
    </div>
  );
}
