import React, { useState } from "react";
import TabSections from "../Layout/Tabs/TabSections";
import BrenIcon from "../Layout/Icons/BrenIcon";

function FeatureItem({
  id,
  currentId,
  title,
  description,
  miniFeatures,
  image,
  triggerAction,
}: {
  id: string;
  currentId: string;
  title: string;
  description: string;
  miniFeatures: Array<{ title: string; icon: string }>;
  image: string;
  triggerAction?: any;
}) {
  const fixItemTitles = (title: string) => {
    const fixeds = [
      {
        original: "Qualificação de Leads",
        fixed: "Qualificando leads via tráfego pago",
      },
      { original: "Campanhas Inteligentes", fixed: "Campanhas Inteligentes" },
      { original: "Follow Up", fixed: "Follow Up" },
      { original: "Automações", fixed: "Automações" },
    ];
    const fixed = fixeds.find((f) => f.original === title);
    return fixed ? fixed.fixed : title;
  };

  return (
    id === currentId && (
      <div className="w-full flex justify-start items-start loadComponent">
        <div className="flex items-center justify-center w-full">
          <div className=" w-[300px] md:w-[40%] md:mr-[10%]">
            <h2 className="text-[36px] leading-[40px] font-black text-center md:text-left">
              {fixItemTitles(title)}
            </h2>
            <p className="text-[18px] font-light text-center md:text-left mt-5">
              {description}
            </p>
            <div className="w-full flex md:flex-row flex-col justify-start mt-5 md:mt-10">
              {miniFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-row md:flex-col items-center justify-center md:pt-0 pt-2 md:p-3 w-full"
                >
                  <BrenIcon
                    icon={feature.icon}
                    size="50px"
                    color="text-yellowgreenish"
                  />
                  <span className="text-[14px] ml-4 md:ml-0 font-light text-center">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <button
                className="mt-10 text-[15px] border border-yellowgreenish text-yellowgreenish py-3 px-5 rounded-full cursor-pointer"
                onClick={triggerAction}
              >
                Ver Planos e preços
              </button>
            </div>
          </div>
          <div
            className="hidden md:flex w-[40%]"
            style={{ perspective: "560px" }}
          >
            <img
              src={image}
              alt={title}
              className="max-h-[500px] transition  !duration-700 [transform:rotateY(350deg)] hover:[transform:rotateY(355deg)] "
              style={{
                filter: "drop-shadow(10px 10px 200px rgba(0, 0, 0, 1))",
              }}
            />
          </div>
        </div>
      </div>
    )
  );
}

export const BrenFeaturesSection = ({
  triggerAction,
}: {
  triggerAction: any;
}) => {
  const [featureSection, setFeatureSection] = useState("reunioes");

  return (
    <>
      <div
        className="pt-[50px] pb-[200px] w-screen mx-auto flex items-center justify-center"
        style={{ background: "url(/home/curve.svg) top center no-repeat" }}
      >
        <div className=" relative font-bold  w-full max-w-[1024px] mt-[50px] h-full text-white ">
          <div className=" mt-10 mx-10 flex items-center justify-center p-10 rounded-3xl flex-col  ">
            <div className="font-light text-center text-[20px]">
              As equipes de vendas são{" "}
              <span className="font-bold text-[20px] text-yellowgreenish">
                fundamentais
              </span>{" "}
              para impulsionar o crescimento de uma empresa. Por isso é
              essencial a implementação de estratégias que{" "}
              <span className="font-bold text-[20px] text-yellowgreenish">
                aumentem a produtividade
              </span>{" "}
              e tornem os processos mais eficientes.
            </div>
          </div>

          <div className=" h-[100px] mt-[50px] !w-full relative mx-auto  max-w-[240px] md:max-w-[800px] ">
            <TabSections
              pill
              classname=" flex items-center justify-between [&>*]:!justify-between [&>*]:!flex indent-[-999px] md:indent-[0px]"
              changeSection={(section: string) => setFeatureSection(section)}
              selectedTab={featureSection}
              pillColor="bg-light-grey/25 md:bg-transparent !border-0 !h-[20px] !w-[20px] !p-0 md:!px-5 md:!py-2 md:!w-auto md:!h-auto"
              pillColorSelected="!font-bold bg-bren-gradient-2 !border-0 !text-black h-[20px] w-[20px] !p-0 md:!px-5 md:!py-2 md:w-auto md:h-auto"
              tabs={[
                // {
                //   name: "Qualificação de Leads",
                //   slug: "leads",
                // },
                {
                  name: "Agendamento de Reuniões",
                  slug: "reunioes",
                },
                {
                  name: "Campanhas Inteligentes",
                  slug: "campanhas",
                },
                {
                  name: "Follow-Up",
                  slug: "follow-up",
                },
                {
                  name: "Automações",
                  slug: "automacoes",
                },
              ]}
            />
          </div>

          <div className="flex items-center flex-col justify-start w-full md:mt-[5vh] ">
          <FeatureItem
              id={"reunioes"}
              currentId={featureSection}
              title="Agendamento de Reuniões"
              description="Facilite a marcação de reuniões com seus clientes através de um link personalizado, que permite a escolha do melhor horário para ambos."
              miniFeatures={[
                { title: "Agendamento por IA", icon: "ai" },
                { title: "Direto do WhatsApp®", icon: "whatsapp" },
                {
                  title: "Seu link do Calendly®",
                  icon: "calendar",
                },
      
              ]}
              image="/home/features/reunioes.webp"
              triggerAction={triggerAction}
            />
            <FeatureItem
              id={"leads"}
              currentId={featureSection}
              title="Qualificação de Leads"
              description="Com base em critérios específicos e personalizáveis, a IA classifica os leads e permite priorizar esforços de vendas e marketing."
              miniFeatures={[
                { title: "Integração com o WhatsApp®", icon: "whatsapp" },
                {
                  title: "IA personalizada para seu negócio",
                  icon: "sparkles",
                },
                { title: "CRM dedicado embutido", icon: "users" },
              ]}
              image="/home/features/qualificacoes.webp"
              triggerAction={triggerAction}
            />
            <FeatureItem
              id={"campanhas"}
              currentId={featureSection}
              title="Campanhas Inteligentes"
              description="A chave para alcançar e engajar centenas de clientes. Com o disparo em massa, sua campanha atinge todos os contatos, enquanto a IA possibilita a interação simultânea e em tempo real com eles."
              miniFeatures={[
                { title: "Mensagens em Massa", icon: "paper-plane" },
                { title: "Integração com o WhatsApp®", icon: "whatsapp" },
                { title: "Agendamento de campanhas", icon: "calendar" },
              ]}
              image="/home/features/campanha_inteligente.webp"
              triggerAction={triggerAction}
            />
            <FeatureItem
              id={"follow-up"}
              currentId={featureSection}
              title="Follow Up"
              description="Fortaleça conexões, reforce o interesse e aumente a chance de conversão. Esse recurso possibilita manter o engajamento com o cliente através de mensagens que são automaticamente enviadas com uma frequência definida."
              miniFeatures={[
                { title: "Integração com o WhatsApp®", icon: "whatsapp" },
                { title: "Respostas Programadas", icon: "clock" },
                { title: "Customização da resposta", icon: "pencil" },
              ]}
              image="/home/features/follow_up.webp"
              triggerAction={triggerAction}
            />
            <FeatureItem
              id={"automacoes"}
              currentId={featureSection}
              title="Automações"
              description="Liberte seu potencial de vendas: Nossa ia mantém seu funil de vendas sempre atualizado. Permita que os profissionais de vendas foquem apenas em vender, enquanto a tecnologia cuida do resto"
              miniFeatures={[
                { title: "Base atualizada automaticamente", icon: "refresh" },
                { title: "Automações Personalizadas", icon: "controls" },
                { title: "Processos realizados por IA", icon: "ai" },
              ]}
              image="/home/features/automacoes.webp"
              triggerAction={triggerAction}
            />
          </div>
        </div>
      </div>
    </>
  );
};
