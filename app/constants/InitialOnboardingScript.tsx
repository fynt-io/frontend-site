// import { AiInstructionsInterface, CollaboratorInterface, OnboardingScriptInterface, SellerInterface } from "./types";

// export const INITIAL_ONBOARDING_SCRIPT = ({empresa, user, aiAssistant}:{empresa?:SellerInterface, user:CollaboratorInterface, aiAssistant:AiInstructionsInterface}): OnboardingScriptInterface[] =>  {
//   return [{
//     step: 0,
//     title: "",
//     statement: `Olá, ${user?.first_name}.\n Seja bem-vinda a Bren!`,
//     description: `Estamos contentes em ter você e a ${empresa?.trading_name} conosco!\n\n Para começar, eu vou te ajudar a configurar seu assistente de Inteligência Artificial em poucos minutos 😉`,
//     // voice:"/Brenda/voices/01.mp3"
//   },
//   {
//     step: 1,
//     title: "",
//     statement: "Primeiro, vamos dar um nome para assistente IA:",
//     description: "Este será o nome que seus clientes verão ao conversar com assistente IA.",
//     // voice:"/Brenda/voices/02.mp3"
//   },
//   {
//     step: 2,
//     title: "",
//     statement: `Qual a personalidade de ${aiAssistant.assistent_name}?`,
//     description: `A personalidade irá refletir em como ${aiAssistant.assistent_name} irá se comportar e se apresentar para seus clientes.`,
//     // voice:"/Brenda/voices/03.mp3"
//   },
//   {
//     step: 3,
//     title: "",
//     statement: `Como ${aiAssistant.assistent_name} deve se comunicar por texto?`,
//     description: `Uma escrita mais informal pode ser uma boa ideia para uma marca com personalidade jovem, enquanto uma escrita formal pode agradar clientes mais sérios.`,
//     // voice:"/Brenda/voices/04.mp3"
//   },
//   {
//     step: 4,
//     title: "",
//     statement: `Tamanho das respostas`,
//     description: `Escolha o tamanho da resposta que seu assistente irá usar com seus clientes.`,
//     // voice:"/Brenda/voices/05.mp3" 
//   },
//   {
//     step: 5,
//     title: "",
//     statement: `Muito bem! Agora vamos ensinar a ${aiAssistant.assistent_name} sobre sua marca e/ou produto.`,
//     description: ``,
//     // voice:"/Brenda/voices/06.mp3" 
//   },
//   {
//     step: 6,
//     title: "",
//     statement: `Representação da marca`,
//     description: `Conte para  ${aiAssistant.assistent_name}, em poucas palavras, quem ela representa.`,
//     // voice:"/Brenda/voices/07.mp3" 
//   },
//   {
//     step: 6,
//     title: "",
//     statement: `Apresentação da marca`,
//     description: `Essa é a frase que  ${aiAssistant.assistent_name} irá utilizar para apresentar sua empresa.`,
//     // voice:"/Brenda/voices/08.mp3" 
//   },
//   {
//     step: 7,
//     title: "",
//     statement: `História da marca`,
//     description: `Conte a história da sua marca para que ${aiAssistant.assistent_name} entenda de onde veio e tenha um melhor contexto para formular suas respostas.`,
//     // voice:"/Brenda/voices/09.mp3" 
//   },
//   {
//     step: 8,
//     title: "",
//     statement: `Endereço da matriz`,
//     description: `Se preferir, clique em avançar para pular e preencher depois.`,
//   },
//   {
//     step: 9,
//     title: "",
//     statement: `Horário de funcionamento`,
//     description: `Se preferir, clique em avançar para pular e preencher depois.`,
//   },
//   {
//     step: 10,
//     title: "",
//     statement: `Perfeito 🙌\n
//     Você concluiu a configuração inicial da ${aiAssistant.assistent_name}.`,
//     description: `Agora deixa eu te mostrar o que mais você pode fazer na Bren.`,
//   },
//   {
//     step: 11,
//     title: "",
//     statement: ``,
//     description: ``,
//   },
//   {
//     step: 12,
//     title: "",
//     statement: `Maravilha 🙌\n
//     Acabamos por aqui e já pode usar a plataforma.`,
//     description: `Para testar e IA é só enviar uma mensagem para seu número:`,
//   },
// ]};