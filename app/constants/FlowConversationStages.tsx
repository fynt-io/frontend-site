import { ConversationFlow } from "../api/callers/conversationFlow";


export const FLOW_CONVERSATION_STAGES : ConversationFlow[] = [
    {      
        order:0,
        id:1,
        title: "Introdução",
        value: "INTRODUCAO",
        content_preview: "Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Ame...",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.",
        x: 50,
        y: 50,
        icon: "\ue84c",
        type: "sales_stage",
        sections:["Configurações", "Contexto", "Ferramentas"],
        configuration:[
            {
                title: "Introdução Fixa",
                info: "Mensagem de boas-vinque será exibida sempre que o usuário iniciar uma conversa.",
                type: "toggle-switch",
                back_end_key_field: "fixed_introduction",
                back_end_value_field: false
            },
            {
                title: "",
                info: "",
                max_characters: 255,
                type: "text-area",
                back_end_key_field: "fixed_introduction_content",
                placeholder: "Ex.: Olá, tudo bem? Como posso te ajudar hoje?",
                back_end_value_field: "",
                toggle_switch_parent_back_end_key: "fixed_introduction"

            },
            {
                title: "Perguntar Nome do Cliente",
                info: "Perguntar o nome do cliente antes de iniciar a conversa.",
                type: "toggle-switch",
                back_end_key_field: "ask_client_name",
                back_end_value_field: false
            }
            
        ],
        context:{},
        tools:[
            {
                title: "Envio de Materiais",
                info: "Permite o envio de materiais para o cliente.",
                type: "toggle-switch",
                back_end_key_field: "send_files",
                back_end_value_field: false
            }
        ],
        mandatory: false,
    },
    {
        order:0,
        title: "Qualificação",
        value: "QUALIFICACAO",
        content_preview: "Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Ame...",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.",
        x: 0,
        y: 0,
        icon: "\ue832",
        type: "sales_stage",
        sections:["Configurações", "Contexto", "Ferramentas"],
        configuration:[
            {
                title: "Pergunta de Qualificação",
                info: "Pergunta que será feita ao cliente para qualificá-lo enquanto lead.",
                max_characters: 255,
                type: "text-area",
                back_end_key_field: "qualification_question",
                back_end_value_field: "",

            }
        ],
        context:{},
        tools:[
            {
                title: "Envio de Materiais",
                info: "Permite o envio de materiais para o cliente.",
                type: "toggle-switch",
                back_end_key_field: "send_files",
                back_end_value_field: false
            }
        ],        mandatory: false,
    },
    {
        order:0,
        title: "Cadastro Inteligente",
        value: "PRE_REGISTRO",
        content_preview: "Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Ame...",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.",
        x: 0,
        y: 0,
        icon: "\ue806",
        type: "sales_stage",
        sections:["Configurações", "Perguntas", "Condicional"],
        configuration:[
            {
                title: "Objetivo do Cadastro",
                info: "Defina o objetivo do cadastro inteligente.",
                max_characters: 255,
                type: "text-area",
                back_end_key_field: "smart_registration_question",
                back_end_value_field: "",
            },
            {
                title: "O que acontece caso o cliente se recuse a realizar o cadastro:",
                type: "html_content",
                back_end_key_field: "",
                back_end_value_field: "",
            },
            {
                title: "Tentar Convenver o Cliente",
                info: "Tentar convencer o cliente a realizar o cadastro inteligente.",
                type: "toggle-switch",
                back_end_key_field: "try_to_convince_client",
                back_end_value_field: true
            },
            {
                title: "Enviar para atendimento humano",
                info: "Enviar o cliente para atendimento humano caso ele se recuse a realizar o cadastro inteligente.",
                type: "toggle-switch",
                back_end_key_field: "ask_human_attendance",
                back_end_value_field: false
            },
            {
                title: "Encerrar Atendimento",
                info: "Encerrar o atendimento caso o cliente se recuse a realizar o cadastro inteligente.",
                type: "toggle-switch",
                back_end_key_field: "close_attendance",
                back_end_value_field: false
            },

        ],
        context:{},
        tools:{},
        mandatory: false,
    },
    {
        order:0,
        title: "Atendimento Humano",
        value: "ATENDIMENTO_HUMANO",
        content_preview: "Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Ame...",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.",
        x: 0,
        y: 0,
        icon: "\ue84c",
        type: "sales_stage",
        sections:["Configurações"],
        configuration:[
            {
                title: "Mensagem de Direcionamento Fixa",
                info: "Mensagem que será exibida sempre que o cliente for direcionado para o atendimento humano.",
                placeholder:"Digite aqui",
                type: "toggle-switch",
                back_end_key_field: "fixed_redirect_message",
                back_end_value_field: false
            },
            {
                title: "",
                info: "",
                max_characters: 255,
                type: "text-area",
                back_end_key_field: "fixed_redirect_message_content",
                back_end_value_field: "",
                toggle_switch_parent_back_end_key: "fixed_redirect_message"

            }
        ],
        context:{},
        tools:{},
        mandatory: false,
    },
    {
        order:0,
        title: "Apresentação da Empresa",
        value: "APRESENTACAO_SOLUCAO",
        content_preview: "Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Ame...",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.",
        x: 0,
        y: 0,
        icon: "\ue855",
        type: "sales_stage",
        sections:["Configurações", "Contexto", "Ferramentas"],
        configuration:[
            {
                title: "Argumento de Venda",
                info: "Argumento de venda da empresa.",
                max_characters: 255,
                type: "text-area",
                back_end_key_field: "sale_argument",
                back_end_value_field: "",

            }
        ],
        context:{},
        tools:[
            {
                title: "Envio de Materiais",
                info: "Permite o envio de materiais para o cliente.",
                type: "toggle-switch",
                back_end_key_field: "send_files",
                back_end_value_field: false
            }
        ],
        mandatory: false,
    },
    {
        order:0,
        title: "Análise de Necessidades",
        value: "ANALISE_NECESSIDADES",
        content_preview: "Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Ame...",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.",
        x: 0,
        y: 0,
        icon: "\ue849",
        type: "sales_stage",
        sections:["Configurações"],
        configuration:[
            {
                title: "Necessidade 1",
                info: "Critério de análise de necessidade.",
                max_characters: 255,
                type: "text-area",
                back_end_key_field: "need_1",
                back_end_value_field: "",
            },{
                title: "Necessidade 2",
                info: "Critério de análise de necessidade.",
                max_characters: 255,
                type: "text-area",
                back_end_key_field: "need_2",
                back_end_value_field: "",
            },{
                title: "Necessidade 3",
                info: "Critério de análise de necessidade.",
                max_characters: 255,
                type: "text-area",
                back_end_key_field: "need_3",
                back_end_value_field: "",
            },
            {
                title: "Análise Inteligente",
                info: "Análise inteligente é a capacidade de usar IA para estabelecer as necessidades da empresa",
                type: "toggle-switch",
                back_end_key_field: "smart_analysis",
                back_end_value_field: false
            }

        ],
        context:{},
        tools:{},
        mandatory: false,
    },
    {
        order:0,
        title: "Encerramento",
        value: "FECHAMENTO",
        content_preview: "Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Ame...",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.",
        x: 0,
        y: 0,
        icon: "\ue874",
        type: "sales_stage",
        sections:["Configurações", "Ferramentas"],
        configuration:[
            {
                title: "Mensagem de Encerramento Fixa",
                info: "Mensagem de encerramento será exibida sempre que o usuário encerrar a conversa.",
                type: "toggle-switch",
                back_end_key_field: "fixed_closure",
                back_end_value_field: false
            },
            {
                title: "",
                info: "",
                max_characters: 255,
                type: "text-area",
                back_end_key_field: "fixed_closure_content",
                placeholder: "Ex.: Obrigado por entrar em contato conosco. Até a próxima!",
                back_end_value_field: "",
                toggle_switch_parent_back_end_key: "fixed_closure"

            },
            {
                title: "Encerramento inteligente",
                info: "Encerramento inteligente é a capacidade de usar IA para encerrar a conversa.",
                type: "toggle-switch",
                back_end_key_field: "smart_closure",
                back_end_value_field: false
            },
            {
                title: "Direcionar para atendimento Humano",
                info: "Direcionar o cliente para atendimento humano caso ele deseje encerrar a conversa.",
                type: "toggle-switch",
                back_end_key_field: "closure_to_human_attendance",
                back_end_value_field: false
            }
        ],
        context:{},
        tools:[
            {
                title: "Envio de Materiais",
                info: "Permite o envio de materiais para o cliente.",
                type: "toggle-switch",
                back_end_key_field: "send_files",
                back_end_value_field: false
            }
        ],
        mandatory: false,
    },
    {
        order:0,
        title: "Agendar Reunião",
        value: "AGENDAR_REUNIAO",
        content_preview: "Agendamento de Reunião pelo Calandly",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.",
        x: 0,
        y: 0,
        icon: "\ue835",
        type: "action",
        sections:["Configurações"],
        configuration:[

            {
                title: "Link do Calendly®",
                info: "Link do Calendly® para agendamento de reunião.",
                max_characters: 255,
                type: "text",
                back_end_key_field: "calendly_link",
                placeholder: "Ex.: https://calendly.com/...",
                back_end_value_field: "",

            },
        ],
        context:{},
        tools:{},
        mandatory: false,
    },
    {
        order:0,
        title: "Enviar Link Externo",
        value: "ENVIAR_LINK_EXTERNO",
        content_preview: "Envio de Link Externo",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.",
        x: 0,
        y: 0,
        icon: "\ue805",
        type: "action",
        sections:["Configurações"],
        configuration:[
            {
                title: "Título do Link",
                info: "Título do link que será enviado ao cliente.",
                max_characters: 255,
                type: "text",
                back_end_key_field: "external_link_title",
                back_end_value_field: "",
            },
            {
                title: "URL",
                info: "URL do link que será enviado ao cliente.",
                max_characters: 255,
                type: "text",
                back_end_key_field: "external_link_url",
                placeholder: "Ex.: https://",
                back_end_value_field: "",
            },
        ],
        context:{},
        tools:{},
        mandatory: false,
    },

]