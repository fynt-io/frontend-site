import { FlowInterface } from "./types";

export const DEFAULT_FLOW_STATES: FlowInterface[] = [
  {
    name: "Introdução",
    description:
      "A IA inicia a conversa com uma saudação calorosa, apresentando a empresa e como seus produtos ou serviços podem beneficiar os clientes, estabelecendo um tom acolhedor desde o começo.",
    is_active: true,
    fixed: true,
    auto_pilot: false,
    qualification: "",
    ai_answer: "",
    mandatory: true,
    hidden: false,
  },
  {
    name: "Qualificação",
    description:
      "A IA utiliza perguntas definidas pelo usuário para coletar informações importantes, ajudando a entender se os clientes são um bom match para os produtos ou serviços oferecidos.",
    is_active: false,
    fixed: false,
    auto_pilot: false,
    qualification: "",
    ai_answer: "",
    mandatory: false,
    hidden: false,
  },
  {
    name: "Proposta de Valor",
    description:
      "Destaca os benefícios e diferenciais do produto ou serviço, mostrando aos clientes como suas necessidades podem ser atendidas de forma eficaz.",
    is_active: false,
    fixed: false,
    auto_pilot: false,
    qualification: "",
    ai_answer: "",
    mandatory: false,
    hidden: false,
  },
  {
    name: "Follow-up",
    description:
      "A IA mantém o contato com os clientes, enviando lembretes ou mensagens de acompanhamento, demonstrando compromisso contínuo em atender às suas necessidades.",
    is_active: false,
    fixed: false,
    auto_pilot: false,
    qualification: "",
    ai_answer: "",
    mandatory: false,
    hidden: true,
  },
  {
    name: "Apresentação da Solução",
    description:
      "Apresenta o produto ou serviço como a solução ideal para os desafios dos clientes, com base nas informações coletadas durante a conversa.",
    is_active: false,
    fixed: false,
    auto_pilot: false,
    qualification: "",
    ai_answer: "",
    mandatory: false,
    hidden: false,
  },
  {
    name: "Enviar Materiais ou Apresentações",
    description:
      "Envia automaticamente materiais adicionais, como PDFs ou links, fornecendo aos clientes recursos valiosos para uma compreensão mais profunda da oferta.",
    is_active: false,
    fixed: false,
    auto_pilot: false,
    qualification: "",
    ai_answer: "",
    mandatory: false,
    hidden: false,
  },
  {
    name: "Tratamento de Objeções",
    description:
      "Responde a dúvidas ou preocupações específicas dos clientes, oferecendo informações detalhadas para superar quaisquer hesitações.",
    is_active: false,
    fixed: false,
    auto_pilot: false,
    qualification: "",
    ai_answer: "",
    mandatory: false,
    hidden: true,
  },
  {
    name: "Dúvidas Gerais",
    description:
      "A IA está preparada para esclarecer qualquer dúvida dos clientes em qualquer momento da conversa, fornecendo informações claras sobre uma ampla gama de tópicos.",
    is_active: false,
    fixed: false,
    auto_pilot: false,
    qualification: "",
    ai_answer: "",
    mandatory: false,
    hidden: true,
  },
  {
    name: "Atendimento Humano",
    description:
      "Facilita a transição para um atendimento humano quando necessário, garantindo uma experiência de atendimento contínua e personalizada.",
    is_active: false,
    fixed: false,
    auto_pilot: false,
    qualification: "",
    ai_answer: "",
    mandatory: true,
  },
  {
    name: "Encerrar Conversa",
    description:
      "Conclui a conversa de forma cortês se os clientes decidirem não prosseguir, agradecendo pelo interesse e deixando a porta aberta para futuras interações.",
    is_active: true,
    fixed: true,
    auto_pilot: false,
    qualification: "",
    ai_answer: "",
    mandatory: true,
    hidden: false,
  },
];
