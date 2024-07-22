import React, { useState } from "react";
import BrenIcon from "../Layout/Icons/BrenIcon";

function FAQItem({
  question,
  answer,
  currentQuestion,
  setCurrentQuestion,
}: {
  question: string;
  answer: any;
  currentQuestion: string;
  setCurrentQuestion: any;
}) {
  return (
    <div className=" mb-5 border-2  border-cloudy-blue/50 w-full rounded-2xl cursor-pointer relative overflow-hidden max-w-full transition-[0.2s]">
      <div
        className="p-7 flex items-center justify-between max-w-full relative w-full"
        onClick={() =>
          setCurrentQuestion(question === currentQuestion ? "" : question)
        }
      >
        <span className="text-[20px]">{question}</span>
        <BrenIcon
          icon={question === currentQuestion ? "chevron-down" : "chevron-right"}
        />
      </div>
      <div
        className={`${question === currentQuestion ? "p-7 border-t-2 h-auto" : "h-0 "} max-w-full relative w-full transition-[0.2s] leading-[23px] font-light border-cloudy-blue/50`}
      >
        <div
          className={`${question === currentQuestion ? "loadComponent h-auto" : " opacity-0 h-0 "} overflow-hidden  [&>*]:!text-[15px] !w-full`}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

export const FAQSection = () => {
  const [currentOpenedFAQ, setCurrentOpenedFAQ] = useState("");

  return (
    <div className="!scale-[85%] lg:!scale-[85%] xl:!scale-100 mx-10 max-w-[1200px] md:mx-0 mb-0 lg:mb-[200px] h-auto relative flex items-center justify-center py-20 lg:py-10">
      <div className="lg:container lg:mx-auto h-full flex flex-col justify-start items-center leading-[45px] overflow-hidden relative text-white ">
        <h2 className="mx-[30px] lg:mx-0 text-[40px] font-light text-center lg:mt-[70px] inline">
          <span className="text-[40px] font-bold inline">
            Ficou com alguma dúvida?
          </span>
        </h2>
        <p className="text-[18px] font-light mb-10 text-center leading-[25px] mt-4">
          Aqui você encontra a resposta para as perguntas mais frequentes
        </p>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full relative oveflow-hidden lg:mx-3">
            <FAQItem
              question="Como faço para treinar meu assistente?"
              setCurrentQuestion={setCurrentOpenedFAQ}
              currentQuestion={currentOpenedFAQ}
              answer={
                <p>
                  Dentro da nossa plataforma, você terá a possibilidade de
                  incluir as informações sobre seu negócio, que a nossa IA vai
                  aprender. Você poderá utilizar materiais comerciais que já
                  utiliza no dia-a-dia, por exemplo.
                  <br />
                  <br />
                  Nosso objetivo é fazer com que esse processo seja o mais
                  rápido possível e por isso você poderá utilizar de diversos
                  tipos de documentos que expliquem seu modelo de negócio e como
                  seu fluxo comercial deve acontecer. É assim que IA da Bren vai
                  aprender
                </p>
              }
            />
            <FAQItem
              question="A Bren é um chatbot?"
              setCurrentQuestion={setCurrentOpenedFAQ}
              currentQuestion={currentOpenedFAQ}
              answer={
                <p>
                  A Bren não é um chatbot. Entregamos uma experiência muito
                  superior a um chatbot, tanto para seu cliente quanto para
                  você, que está comandando esse processo de vendas.
                  <br />
                  <br />
                  <b>
                    Nossa IA tem a capacidade de estabelecer uma conversa
                    natural com seus clientes durante o processo de vendas
                  </b>
                  , sem depender da criação manual de fluxos com perguntas e
                  respostas de um chatbot tradicional, que geralmente não são
                  eficientes, deixando o cliente preso num fluxo infinito, e
                  principalmente, frustrado.
                </p>
              }
            />
            <FAQItem
              question="É possível fazer venda direto no WhatsApp, pela IA?"
              setCurrentQuestion={setCurrentOpenedFAQ}
              currentQuestion={currentOpenedFAQ}
              answer={
                <p>
                  É possível que você utilize a IA da Bren para conduzir seu
                  lead por todo o <b>processo de vendas</b> do seu negócio.
                  Entretanto, a concretização da venda pode acontecer fora do
                  WhatsApp. Nesses casos, podemos direcionar o seu lead para um
                  fluxo de atendimento humano (alguém do seu time de vendas) ou
                  para um link com check-out externo.
                </p>
              }
            />
          </div>
          <div className="w-full relative oveflow-hidden  lg:mx-3">
            <FAQItem
              question="Como a IA reage se não souber a resposta do cliente?"
              setCurrentQuestion={setCurrentOpenedFAQ}
              currentQuestion={currentOpenedFAQ}
              answer={
                <p>
                  Caso sua empresa receba alguma pergunta que não estava
                  prevista no treinamento e o assistente não tenha o
                  conhecimento necessário para responder, essa mensagem vai para
                  um fluxo de atendimento humano a ser respondido manualmente
                  por algum vendedor da empresa.
                  <br />
                  <br />
                  <b>Aqui vai uma dica</b>: caso seja uma pergunta genérica e
                  recorrente, e que você acredita que possa ser feita outras
                  vezes, vale incluir ela no material e fazer um novo
                  treinamento!
                </p>
              }
            />
            <FAQItem
              question="Posso usar meu número atual do WhatsApp?"
              setCurrentQuestion={setCurrentOpenedFAQ}
              currentQuestion={currentOpenedFAQ}
              answer={
                <p>
                  Como somos uma empresa{" "}
                  <b>conectada de forma oficial ao WhatsApp (Meta)</b>{" "}
                  precisaremos criar um novo número de telefone para o
                  atendimento da sua empresa. Isso oferece mais <b>segurança</b>{" "}
                  ao seu negócio, <b>minimizando riscos</b> de bloqueio do
                  número por exemplo, algo muito comum em plataformas não
                  oficiais.
                </p>
              }
            />
            <FAQItem
              question="Quais são os limites de uso do plano?"
              setCurrentQuestion={setCurrentOpenedFAQ}
              currentQuestion={currentOpenedFAQ}
              answer={
                <p>
                  Os planos de contratação da Bren são feitos pelo{" "}
                  <b>número de atendimentos por mês</b>. Cada atendimento tem
                  duração máxima de 24 (vinte e quatro) horas a contar da data
                  de envio da sua primeira mensagem (seja pelo Assistente ou por
                  um vendedor da sua equipe). Caso você queira vender ainda mais
                  para a sua empresa, é possível contratar pacotes adicionais de
                  atendimento.
                  <br />
                  <br />
                  <b>Dica:</b> na aba Dashboard na Plataforma, você encontrará
                  dados sobre quantos atendimentos já foram usados.
                </p>
              }
            />
          </div>
        </div>

        <div className="text-[17px] w-full max-w-[600px] mx-10 font-light text-center leading-[25px] mt-10">
          Caso ainda tenha alguma dúvida,{" "}
          <span className="font-semibold text-[17px]">
            entre em contato com a Bren!
          </span>
          <br />
          Você encontra nossas informações de contato aqui embaixo.
        </div>
      </div>
    </div>
  );
};
