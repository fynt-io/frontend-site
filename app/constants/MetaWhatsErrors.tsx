interface ErrorResponse {
    simplifiedResponse: string;
    detailedResponse?: string;
}

interface NestedErrorResponse {
    [errorDetail: string]: ErrorResponse;
}
  

export const META_WHATS_ERRORS: { [key: number]: NestedErrorResponse | ErrorResponse} = {
    0: {
      simplifiedResponse: "Não foi possível autenticar a aplicação do usuário.",
      detailedResponse: "A autenticação falhou devido a credenciais inválidas ou falta de permissão.",
    },
    3: {
      simplifiedResponse: "Problema de capacidade ou permissões.",
      detailedResponse: "O aplicativo encontrou um problema de capacidade ou falta de permissões necessárias.",
    },
    10: {
      simplifiedResponse: "Permissão não concedida ou removida.",
      detailedResponse: "O usuário não concedeu ou removeu a permissão necessária para essa operação.",
    },
    190: {
      simplifiedResponse: "O token de acesso expirou.",
      detailedResponse: "O token de acesso fornecido expirou e precisa ser renovado.",
    },
    200: {
      simplifiedResponse: "Permissão não concedida ou removida.",
      detailedResponse: "O usuário não concedeu ou removeu a permissão necessária para essa operação.",
    },
    4: {
      simplifiedResponse: "O aplicativo atingiu seu limite de chamadas à API.",
      detailedResponse: "O número de chamadas à API permitidas foi excedido.",
    },
    80007: {
      simplifiedResponse: "Problemas de limite de taxa.",
      detailedResponse: "O aplicativo encontrou problemas devido ao limite de taxa atingido.",
    },
    130429: {
      simplifiedResponse: "Limite de taxa atingido.",
      detailedResponse: "O número máximo de solicitações permitidas foi alcançado.",
    },
    131048: {
      simplifiedResponse: "Limite de taxa de spam atingido.",
      detailedResponse: "A conta atingiu o limite de taxa de mensagens consideradas spam.",
    },
    131056: {
      simplifiedResponse: "Limite de taxa de par (Conta Comercial, Conta do Consumidor) atingido.",
      detailedResponse: "O limite de taxa para mensagens entre contas comerciais e do consumidor foi atingido.",
    },
    133016: {
      simplifiedResponse: "Limite de tentativas de registro ou cancelamento de registro excedido.",
      detailedResponse: "O número máximo de tentativas de registro ou cancelamento de registro foi excedido.",
    },
    368: {
      simplifiedResponse: "Bloqueado temporariamente por violações de políticas.",
      detailedResponse: "A conta foi bloqueada temporariamente devido a violações de políticas.",
    },
    131031: {
      simplifiedResponse: "Conta bloqueada.",
      detailedResponse: "Conta comercial bloqueada. Entre em contato com o suporte para mais informações.",
    },
    1: {
      simplifiedResponse: "Requisição inválida ou possível erro no servidor.",
      detailedResponse: "A requisição feita é inválida ou houve um possível erro no servidor.",
    },
    2: {
      simplifiedResponse: "Temporário devido a tempo de inatividade ou sobrecarga.",
      detailedResponse: "O serviço está temporariamente indisponível devido a tempo de inatividade ou sobrecarga.",
    },
    33: {
      simplifiedResponse: "Valor do parâmetro inválido.",
      detailedResponse: "O valor fornecido para o parâmetro é inválido.",
    },
    100: {
      simplifiedResponse: "Parâmetro inválido.",
      detailedResponse: "Parâmetro inválido. Verifique os dados inseridos e tente novamente.",
    },
    130472: {
      "User's number is part of an experiment": 
      {
        simplifiedResponse: "Número do usuário faz parte de um experimento.",
        detailedResponse: "Este número faz parte de um experimento da Meta e não pode receber mensagens do tipo marketing. Sendo assim, não é possível iniciar uma conversa com ele utilizando modelos de mensagens sem antes ele interagir primeiro.",
      }
    },
    131000: {
      simplifiedResponse: "Algo deu errado.",
      detailedResponse: "Ocorreu um erro desconhecido.",
    },
    131005: {
      simplifiedResponse: "Acesso negado.",
      detailedResponse: "O acesso foi negado devido a permissões insuficientes.",
    },
    131008: {
      simplifiedResponse: "Parâmetro obrigatório ausente.",
      detailedResponse: "Um parâmetro obrigatório está ausente.",
    },
    131009: {
      simplifiedResponse: "Valor do parâmetro inválido.",
      detailedResponse: "O valor fornecido para o parâmetro é inválido.",
    },
    131016: {
      simplifiedResponse: "Serviço indisponível.",
      detailedResponse: "O serviço não está disponível no momento.",
    },
    131021: {
      simplifiedResponse: "O destinatário não pode ser o remetente.",
      detailedResponse: "O destinatário e o remetente não podem ser a mesma pessoa.",
    },
    131026: {
      "(#131026) Receiver is incapable of receiving this message": {
        simplifiedResponse: "Mensagem não entregue.",
        detailedResponse: "O receptor é incapaz de receber a mensagem, possivelmente devido a restrições ou configurações. Verifique se o número é um número de WhatsApp válido."
      },
      "Message undeliverable": {
        simplifiedResponse: "Mensagem não entregue.",
        detailedResponse: "Mensagem não entregue. Verifique a conexão e o número do destinatário, e tente novamente."
      }
    },
    131042: {
      simplifiedResponse: "Problema de pagamento de elegibilidade comercial.",
      detailedResponse: "Houve um problema com o pagamento de elegibilidade comercial.",
    },
    131045: {
      simplifiedResponse: "Certificado incorreto.",
      detailedResponse: "O certificado fornecido está incorreto.",
    },
    131047: {
      simplifiedResponse: "Mensagem de reengajamento.",
      detailedResponse: "Não foi possível enviar a mensagem de reengajamento. Tente novamente mais tarde ou entre em contato com o suporte.",
    },
    131051: {
      simplifiedResponse: "Tipo de mensagem não suportado.",
      detailedResponse: "O tipo de mensagem não é suportado pelo sistema.",
    },
    131052: {
      simplifiedResponse: "Erro ao baixar mídia.",
      detailedResponse: "Houve um erro ao tentar baixar a mídia.",
    },
    131053: {
      simplifiedResponse: "Erro ao enviar mídia.",
      detailedResponse: "Não foi possível enviar a mídia. Verifique se o arquivo está de acordo com o formato permitido e tente novamente.",
    },
    131057: {
      simplifiedResponse: "Conta em modo de manutenção.",
      detailedResponse: "A conta está atualmente em modo de manutenção.",
    },
    132000: {
      simplifiedResponse: "Contagem de parâmetros do template não coincide.",
      detailedResponse: "Número de parâmetros não corresponde ao esperado. Verifique e ajuste os parâmetros fornecidos.",
    },
    132001: {
      simplifiedResponse: "Template não existe.",
      detailedResponse: "O template especificado não existe.",
    },
    132005: {
      simplifiedResponse: "Texto traduzido do template é muito longo.",
      detailedResponse: "O texto traduzido do template excede o comprimento permitido.",
    },
    132007: {
      simplifiedResponse: "Política de caracteres de formatação do template violada.",
      detailedResponse: "A formatação do template viola a política de caracteres permitidos.",
    },
    132012: {
      simplifiedResponse: "Formato de parâmetros do template incorreto.",
      detailedResponse: "Formato de parâmetro não corresponde ao formato dos modelos de mensagens criados. Verifique e corrija os dados de entrada.",
    },
    132015: {
      simplifiedResponse: "Template pausado.",
      detailedResponse: "O template foi pausado e não está atualmente ativo.",
    },
    132016: {
      simplifiedResponse: "Template desativado.",
      detailedResponse: "O template foi desativado e não pode ser usado.",
    },
    132068: {
      simplifiedResponse: "Fluxo bloqueado.",
      detailedResponse: "O fluxo foi bloqueado devido a uma restrição ou política.",
    },
    132069: {
      simplifiedResponse: "Fluxo com limitação de taxa.",
      detailedResponse: "O fluxo está sujeito a limitações de taxa impostas pelo sistema.",
    },
    133000: {
      simplifiedResponse: "Deregistro incompleto.",
      detailedResponse: "O processo de deregistro não foi concluído com sucesso.",
    },
    133004: {
      simplifiedResponse: "Servidor temporariamente indisponível.",
      detailedResponse: "O servidor está temporariamente indisponível devido a manutenção ou problemas técnicos.",
    },
    133005: {
      simplifiedResponse: "PIN de verificação em duas etapas incorreto.",
      detailedResponse: "O PIN de verificação em duas etapas fornecido está incorreto.",
    },
    133006: {
      simplifiedResponse: "Número de telefone precisa ser verificado antes do registro.",
      detailedResponse: "O número de telefone deve ser verificado antes que o registro possa ser concluído.",
    },
    133008: {
      simplifiedResponse: "Muitas tentativas de adivinhar o PIN de verificação em duas etapas.",
      detailedResponse: "Houve muitas tentativas de adivinhar o PIN de verificação em duas etapas, e o sistema bloqueou temporariamente.",
    },
    133009: {
      simplifiedResponse: "PIN de verificação em duas etapas digitado muito rapidamente.",
      detailedResponse: "O PIN de verificação em duas etapas foi inserido muito rapidamente, sugerindo um possível ataque automatizado.",
    },
    133010: {
      simplifiedResponse: "Número de telefone não registrado.",
      detailedResponse: "O número de telefone fornecido não está registrado no sistema.",
    },
    133015: {
      simplifiedResponse: "Aguarde alguns minutos antes de tentar registrar este número de telefone.",
      detailedResponse: "Houve tentativas excessivas de registro para este número de telefone. Por favor, aguarde alguns minutos antes de tentar novamente.",
    },
    135000: {
      simplifiedResponse: "Erro genérico do usuário.",
      detailedResponse: "Houve um erro genérico no sistema, relacionado à operação do usuário.",
    },
    1800:{
      simplifiedResponse: "O payload está incorreto.",
      detailedResponse: "Há um problema com os dados enviados, possivelmente por causa de informações ausentes ou incorretas. Revise e corrija as informações e tente novamente.",
    },
    5211:{
      simplifiedResponse: "Os parâmetros de corpo e botões estão ausentes no payload.",
      detailedResponse: `Os campos "corpo de texto" e "botões" são necessários, mas estão faltando nos dados enviados. Adicione esses campos e tente novamente.`,
    },
    987654:{
      simplifiedResponse: "A mensagem não foi enviada devido a um erro desconhecido.",
      detailedResponse: "Os possíveis motivos para esse erro incluem: o número de telefone não está registrado no WhatsApp, o número pode estar participando de um experimento da Meta que restringe o recebimento de mensagens de marketing, ou o número foi bloqueado pelo destinatário. Por favor, verifique se o número está correto antes de tentar enviar novamente a mensagem.",
    },
    987655:{
      simplifiedResponse: "Erro no gatilho da campanha.",
      detailedResponse: "Erro ao enviar a mensagem da campanha. Ocorreu um problema com os dados. Verifique os parâmetros e tente novamente. Se o problema persistir, entre em contato com a equipe de suporte.",
    },
  };