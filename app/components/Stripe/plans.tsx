import { useState, useEffect } from "react";
import BrenIcon from "../Layout/Icons/BrenIcon";
// import PaymentStripe from "./PaymentStripe";
import { BREN_PRICE } from "@/app/constants/BrenPrices";
import { useSearchParams } from "next/navigation";
import { BrenPriceTier } from "@/app/constants/types";
import { TabSectionInterface } from "@/app/constants/types";
import Logo from "../Layout/Logos/Logo";
import { BREN_CONSTANTS } from "@/app/constants/constants";
import { BREN_PRICE_FIXED } from "@/app/constants/BrenPrices";
import { BREN_SERVICES_QUANTITY } from "@/app/constants/BrenPrices";
interface PlanType {
  quantity: number;
  frequency: string;
  total_cost: number;
  unit: number;
}

interface PlanFeature {
  title: string;
  description: string;
  details?: string;
}

function formatToBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

{
  /* Plano Dinâmico */
}
const DynamicPlan = ({
  goToSinup,
  signupLead,
  selectPlan,
}: {
  goToSinup?: any;
  signupLead?: any;
  selectPlan?: any;
}) => {
  const [creditQuantity, setCreditQuantity] = useState(0);
  const [features, setFeatures] = useState<PlanFeature[]>([
    {
      title: "Inteligência Artificial Personalizada",
      description: "Crie sua própria IA para atender seus clientes.",
    },
    {
      title: "Agendamento de Reunião",
      description: "Seu assistente IA envia links para seus clientes agendarem reuniões com você.",
    },
    // {
    //   title: "Faça mais com Tráfego Pago",
    //   description:
    //     "Receba atendimentos das suas campanhas Clique para o WhatsApp sem custos adicionais.",
    //   details: "Todos os atendimentos iniciados a partir das campanhas de Clique para o WhatsApp são isentos de custo durante a primeira janela de cobrança, que para esses atendimentos será de 72 horas. Após este período, serão aplicados os custos e janelas normalmente.",
    // },
    {
      title: "Disparo em Massa",
      description:
        "Dispare mensagens para toda sua base de clientes via WhatsApp, e use IA para vender e tirar dúvidas.",
    },
    // {
    //   title: "Cadastro inteligente",
    //   description: "Qualifique leads de forma personalizada através de trafego pago ou orgânico por WhatsApp.",
    // },
    {
      title: "Mensagem automática para inatividade",
      description: "Automatize o processo de acompanhamento com seus clientes, enviando mensagens automáticas quando demorarem a responder.",
    },
    // {
    //   title: "Bônus mensal",
    //   description: "Todo mês você terá um bônus de 1.250 atendimentos.",
    //   details: "Todo início de mês você recebe um bônus de R$400,00 de créditos que poderão ser usados em 250 atendimentos ativos e 1000 atendimentos receptivos. Este é um bônus para usar exclusivamente em nossa plataforma e não é cumulativo.",
    // },
    {
      title: "CRM nativo",
      description: "Faça a gestão de seus clientes direto na Bren, adicionando ou integrando com seu CRM atual.",
    },
  ]);
  const searchParams = useSearchParams();

  //use effect to get search params
  useEffect(() => {
    if (searchParams.get("quantity")) {
      let quantity = parseInt(searchParams.get("quantity") ?? BREN_SERVICES_QUANTITY.defaultTotalQuantity.toString());
      if (quantity < BREN_SERVICES_QUANTITY.defaultTotalQuantity) quantity = BREN_SERVICES_QUANTITY.defaultTotalQuantity;
      if (quantity > 10000) quantity = 10000;
      setCreditQuantity(quantity);
    } else {
      setCreditQuantity(BREN_SERVICES_QUANTITY.defaultTotalQuantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (creditQuantity < BREN_SERVICES_QUANTITY.defaultTotalQuantity) {
      setCreditQuantity(BREN_SERVICES_QUANTITY.defaultTotalQuantity);
    }
  }, [creditQuantity])

  //if searchParams.get('quantity') and searchParams.get('frequency') are not null, set the plan
  useEffect(() => {
    if (searchParams.get("quantity") && searchParams.get("frequency")) {
      let quantity = parseInt(searchParams.get("quantity") ?? BREN_SERVICES_QUANTITY.defaultTotalQuantity.toString());
      let frequency = searchParams.get("frequency") ?? "monthly";
      let totalPrice = 0;
      let unitPrice = 0;
      switch (frequency) {
        case "monthly":
          totalPrice = quantity * (CheckPriceTier(quantity)?.monthly ?? 0) * 1;
          unitPrice = CheckPriceTier(quantity)?.monthly ?? 0;
          break;
        case "bi-annual":
          totalPrice =
            quantity * (CheckPriceTier(quantity)?.semi_annual ?? 0) * 6;
          unitPrice = CheckPriceTier(quantity)?.semi_annual ?? 0;
          break;
        case "annual":
          totalPrice = quantity * (CheckPriceTier(quantity)?.annual ?? 0) * 12;
          unitPrice = CheckPriceTier(quantity)?.annual ?? 0;
          break;
      }
      selectPlan(
        quantity *
        (frequency === "monthly" ? 1 : frequency === "bi-annual" ? 6 : 12),
        frequency,
        totalPrice,
        unitPrice,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function CheckPriceTier(creditQuantity: number): BrenPriceTier {
    let tier = BREN_PRICE.find(
      (tier) => creditQuantity >= tier.min && creditQuantity <= tier.max,
    );
    return tier as BrenPriceTier;
  }

  const PlanBox = ({
    title,
    price,
    rechargeTime,
    discount,
    signupLink,
    totalPrice,
    unitPrice,
    isRecommended,
    quantity,
  }: {
    title: string;
    price: string;
    rechargeTime: string;
    discount: number;
    signupLink?: any;
    totalPrice: number;
    unitPrice: number;
    isRecommended?: boolean;
    quantity: number;
  }) => {
    return (
      <div>
        <div className={`flex md:flex-row flex-col rounded-3xl overflow-hidden border-[3px] ${isRecommended ? `dark:border-yellowgreenish` : `dark:border-[#1D1D1D]`} `}>
          <div
            className={`lg:mb-0 bg-[#1D1D1D]  relative flex flex-col items-center justify-center w-full`}
          >
            {/* {discount > 0 && (
              <span className="text-[12px] top-0 absolute bg-gradient-primary-horizontal px-3 !py-0 h-[25px] hidden lg:flex items-center justify-center text-white dark:text-black rounded-b-2xl ">{`Desconto de ${discount}%`}</span>
            )}
            {discount > 0 && <div className="lg:mt-3"></div>} */}
            <div className="flex lg:w-[475px] w-[200px] flex-col items-center p-2 lg:p-4 pt-5 lg:pt-5 ">
              <h3 className="text-[15px] lg:text-[20px]  font-bold text-glacier flex dark:text-yellowgreenish text-center items-center">
                {title}{" "}
                <span
                  className={`lg:hidden flex ml-2 bg-gradient-primary-horizontal rounded-full  items-center justify-center text-white dark:text-black text-[11px] py-0 px-3 !h-[17px]`}
                >{`Desconto de ${formatToBRL(BREN_PRICE_FIXED.find((price) => price.name === rechargeTime)?.discount ?? 0)}`}</span>
              </h3>
              <Logo
                style={1}
                className="!w-[80px] lg:!w-[70px] lg:!h-[40px] cursor-pointer"
              />
              <div className="w-auto">
                <h4 className="text-[25px] flex flex-col items-center lg:text-[32px] font-bold text-center">
                  {/* {price} */}
                  {BREN_PRICE_FIXED.find((price) => price.name === rechargeTime)?.before && <span className=" mt-2 flex gap-2 items-center"> de <span className="strike line-through text-red text-[20px]"> {formatToBRL(BREN_PRICE_FIXED.find((price) => price.name === rechargeTime)?.before ?? 0)}</span> por</span>}
                  <span className="text-[32px] whitespace-nowrap">
                    {formatToBRL(BREN_PRICE_FIXED.find((price) => price.name === rechargeTime)?.now ?? 0)}
                    <span className="font-light ml-1">/mês</span>
                  </span>
                </h4>
                {(BREN_PRICE_FIXED.find((price) => price.name === rechargeTime)?.discount) && (BREN_PRICE_FIXED.find((price) => price.name === rechargeTime)?.discount ?? 0) !== 0 && (
                  <span className=" w-full my-2 text-[12px] bg-gradient-primary-horizontal font-semibold px-3 !py-4 h-[25px] hidden lg:flex items-center justify-center text-white dark:text-black rounded-2xl ">{`${formatToBRL(BREN_PRICE_FIXED.find((price) => price.name === rechargeTime)?.discount ?? 0)} de Desconto`}</span>
                )}
              </div>
              <div className="flex items-center justify-center h-[10px]  opacity-50">
                {/* <span className="font-semibold mr-1">{formatToBRL(unitPrice)}</span>{" "}
                por atendimento */}
              </div>
            </div>
            <div
              className={` w-full`}
            >
              <span className="opacity-50 text-[12px] font-light flex text-center leading-[20px] lg:h-[45px] pb-10 items-center justify-center ">
                <span>
                  Valor fixo e cobrado {" "}
                  {rechargeTime === "monthly"
                    ? "mensalmente"
                    : rechargeTime === "bi-annual"
                      ? "semestralmente"
                      : "anualmente"}{" "}
                  <span className="font-bold">
                    {formatToBRL(BREN_PRICE_FIXED.find((price) => price.name === rechargeTime)?.total ?? 0)}
                    {/* {formatToBRL(totalPrice)} */}
                  </span> <br /> direto em
                  seu cartão de crédito
                </span>
              </span>

            </div>
          </div>
          <div className="bg-transparent flex flex-col items-center w-full">
            <div className="flex flex-col items-center justify-center text-center h-full p-10">
              <div className="text-[16px] mb-5">O plano Bren inclui {BREN_SERVICES_QUANTITY.defaultTotalQuantity} atendimentos, sendo:</div>
              <ul className="flex gap-2 items-start flex-col " >
                <li className="text-[16px] h-full w-full bg-tall-grey rounded-xl p-4 flex-row items-center  flex gap-3  text-left "><BrenIcon color="text-yellow-greenish" icon="balloon-plus" /> <span className="text-yellow-greenish font-bold text-[19px]">{BREN_SERVICES_QUANTITY.bonusActive}*</span> <span>atendimentos ativos<br />(Iniciados por você)</span></li>
                <li className="text-[16px] h-full w-full bg-tall-grey rounded-xl p-4  flex-row items-center flex gap-3  text-left "><BrenIcon color="text-yellow-greenish" icon="whatsapp" /><span className="text-yellow-greenish font-bold text-[19px]">{BREN_SERVICES_QUANTITY.bonusWhatsappClick}</span> <span>atendimentos iniciados através de campanhas Click to Whatsapp</span></li>
                <li className="w-full text-center flex items-center py-2 text-[12px] gap-3"><span className="w-full h-[1px] bg-dark-grey" /><span>OU</span><span className="w-full h-[1px] bg-dark-grey" /></li>
                <li className="text-[16px] h-full w-full bg-tall-grey rounded-xl p-4   flex-row items-center  flex gap-3  text-left "><BrenIcon color="text-yellow-greenish" icon="ballon-typing" /> <span className="text-yellow-greenish font-bold text-[19px]">{BREN_SERVICES_QUANTITY.bonusReceptives}*</span> <span>atendimentos receptivos <br />(Iniciados pelos seus clientes)</span></li>

              </ul>
              <p className="opacity-75 text-[12px] mt-3">*Atedimentimentos ativos e receptivos podem ser substituidos por campanhas Click To WhatsApp.</p>
            </div>
            {/* <div className="flex lg:w-[475px] flex-col justify-center items-center p-2 lg:p-4 pt-5 lg:pt-5 h-[120px] lg:h-[160px]">
              <img className="w-min h-min mb-4" src="/logo/logo-meta.svg" alt="" />
              <div className="flex gap-2">
                <div className="bg-[#2E2E2E] rounded-[16px] p-2 flex flex-col items-center">
                  <span className="font-semibold">R$ 0,26</span>
                  <span className="text-[12px] text-center">Para atendimento de <br/> Serviço (Receptivo)</span>
                </div>
                <div className="bg-[#2E2E2E] rounded-[16px] p-2 flex flex-col items-center">
                  <span className="font-semibold">R$ 0,56</span>
                  <span className="text-[12px] text-center">Para atendimento de <br/> Marketing (Ativo)</span>
                </div>
              </div>
            </div>
            <span className="text-[12px] text-center p-4">Cobrado conforme uso, em um painel de gestão de créditos da Meta que garante total controle dos gastos. Saiba mais sobre os custos Meta</span> */}
          </div>
        </div>
        {BREN_CONSTANTS.SHOW_SIGNUP ? <div className="lg:h-[50px] relative w-full flex items-center justify-center mt-5 [&>*]:!flex">
          <button
            className={`hover:scale-[105%] transition flex items-center justify-center bg-gradient-primary-horizontal text-white dark:text-black leading-normal  !py-2 px-5 rounded-full w-full lg:w-auto `}
            onClick={() =>
              !goToSinup
                ? selectPlan(
                  quantity *
                  (rechargeTime === "monthly"
                    ? 1
                    : rechargeTime === "bi-annual"
                      ? 6
                      : 12),
                  rechargeTime,
                  totalPrice,
                  unitPrice,
                )
                : window
                  ? (window.location.href =
                    signupLead +
                    "&quantity=" +
                    quantity +
                    "&frequency=" +
                    rechargeTime)
                  : null
            }
          >
            <span className="font-bold ">Selecionar</span>
            <BrenIcon
              icon="arrow-right"
              className="!relative !ml-3"
              size="25px"
              color="inherit"
            />
          </button>
        </div> :

          <div className="lg:h-[50px] relative w-full flex items-center justify-center mt-5 [&>*]:!flex" onClick={() => window.open(BREN_CONSTANTS.CALENDLY_LINK)}>
            <button className="hover:scale-[105%] transition flex items-center justify-center bg-gradient-primary-horizontal text-white dark:text-black leading-normal  !py-2 px-5 rounded-full w-full lg:w-auto ">
              <span className="font-bold ">Fale com nossa equipe de vendas</span>

              <BrenIcon icon="whatsapp" className="!relative !ml-3" size="25px" color="inherit" />
            </button>
          </div>}

      </div>
    );
  };

  const sections: TabSectionInterface[] = [
    { name: "Mensal", slug: "mensal" },
    { name: "Semestral", slug: "semestral", discount: 15 },
    { name: "Anual", slug: "anual", discount: 25 },
  ]

  const [currentSection, setCurrentSection] = useState<any>(
    sections[0].slug
  );
  const [openCards, setOpenCards] = useState<boolean[]>(new Array(features.length).fill(false));

  const toggleDetails = (index: number) => {
    const newOpenCards = [...openCards];
    newOpenCards[index] = !newOpenCards[index];
    setOpenCards(newOpenCards);
  };

  const step = (creditQuantity < 7500) ? 2500 : (creditQuantity < 10000) ? BREN_SERVICES_QUANTITY.defaultTotalQuantity : (creditQuantity >= 10000 && creditQuantity < 100000) ? 10000 : (creditQuantity >= 10000 && creditQuantity < 600000) ? 50000 : (creditQuantity >= 600000 && creditQuantity <= 1000000) ? 100000 : 1;

  return (
    <div
      className={`${goToSinup && `border-[4px] dark:border-cloudy-blue/10 border-cloudy-blue/25 rounded-[25px]`}   backdrop-blur-lg w-auto max-w-[1280px] overflow-hidden flex-col items-center justify-center bg-[#0000009E]`}
    >
      <div
        className={`${goToSinup ? `` : ` mt-10`} flex w-full max-w-[992px] mx-auto`}
      >
        <div className="w-full">
          {/* <h2 className="text-[30px] text-center opacity-100">
              {creditQuantity}{" "}
              <span className="text-[28px] font-light">Atendimentos</span>
            </h2> */}
          <div className="flex flex-col w-full items-center justify-center">

            {/* <div className="my-5 w-full px-10 mb-[40px]">
            {creditQuantity > 0 && (
          <div className="my-5 w-full px-10 mb-[40px]">
            {creditQuantity >= 0 && (
              <RangeBar
              value={creditQuantity}
              max={1000000}
              min={0}
              onChange={(e) => {
                setCreditQuantity(e);
              }}
              step={step}
            />
            )}
          </div> */}
            {/* <TabSections
              tabs={sections}
              changeSection={(e: string) => {
                setCurrentSection(e)
              }}
              selectedTab={currentSection}
              setUrlSection={false}
              responsiveContract={false}
            /> */}
          </div>
{/* 
          <div className="w-full flex lg:flex-row flex-col items-center justify-center mt-[40px] lg:mt-[40px] mb-10">
            {currentSection === "mensal" &&
              <PlanBox
                title=""
                unitPrice={CheckPriceTier(creditQuantity)?.monthly}
                quantity={creditQuantity}
                price={formatToBRL(
                  creditQuantity * CheckPriceTier(creditQuantity)?.monthly,
                )}
                totalPrice={
                  creditQuantity * CheckPriceTier(creditQuantity)?.monthly * 1
                }
                rechargeTime="monthly"
                discount={0}
              />
            }
            {currentSection === "semestral" &&
              <PlanBox
                title=""
                unitPrice={CheckPriceTier(creditQuantity)?.semi_annual}
                quantity={creditQuantity}
                price={formatToBRL(
                  creditQuantity * CheckPriceTier(creditQuantity)?.semi_annual,
                )}
                totalPrice={
                  creditQuantity * CheckPriceTier(creditQuantity)?.semi_annual * 6
                }
                rechargeTime="bi-annual"
                discount={parseFloat((((creditQuantity * CheckPriceTier(creditQuantity)?.monthly * 6) - (creditQuantity * CheckPriceTier(creditQuantity)?.semi_annual * 6)).toFixed(2)))}
              />
            }
            {currentSection === "anual" &&
              <PlanBox
                title=""
                unitPrice={CheckPriceTier(creditQuantity)?.annual}
                quantity={creditQuantity}
                price={formatToBRL(
                  creditQuantity * CheckPriceTier(creditQuantity)?.annual,
                )}
                totalPrice={
                  creditQuantity * CheckPriceTier(creditQuantity)?.annual * 12
                }
                rechargeTime="annual"
                discount={parseFloat((((creditQuantity * CheckPriceTier(creditQuantity)?.monthly * 12) - (creditQuantity * CheckPriceTier(creditQuantity)?.annual * 12)).toFixed(2)))}
              />
            }
          </div> */}
        </div>
      </div>
      {goToSinup && (
        <div className="dark:bg-transparent bg-cloudy-blue/25 p-5">
          <div className="flex flex-col justify-center items-center">
            {features.map((feature, index) => {
              const isOpen = openCards[index];
              return (
                <div
                  key={index}
                  className="w-full flex flex-col justify-center items-start dark:bg-[#2D2D2D] bg-white/75 rounded-2xl my-2"
                >
                  <div className={`w-full flex py-5 px-10 ${isOpen && feature.details ? "border-b-[1px] border-[#5D5D5D]" : ""}  justify-between`}>
                    <div className="flex">
                      <span className="bg-gradient-primary-horizontal text-white dark:text-black mr-4 aspect-square w-[30px] h-[30px]   rounded-full flex items-center justify-center relative ">
                        <BrenIcon
                          className=" !h-full !flex "
                          size="17px"
                          icon={"checkmark"}
                          color="#ffffff"
                          stroke={1}
                        />
                      </span>
                      <div className="grid">
                        <div className="text-[18px] !h-auto  mb-1  !leading-[20px]  !p-0 font-bold">
                          {feature.title}
                        </div>
                        <span className=" font-light !h-[auto]  text-[15px] !leading-normal !inline-flex ">
                          {feature.description}
                        </span>
                      </div>
                    </div>
                    {feature.details && <button onClick={() => toggleDetails(index)}>
                      <BrenIcon
                        className=" !h-full !flex cursor-pointer"
                        size="17px"
                        icon={isOpen ? "chevron-up" : "chevron-down"}
                        color="#ffffff"
                        stroke={1}
                      />
                    </button>}
                  </div>
                  <span className={`font-light overflow-hidden !inline-flex !h-[auto] px-10 text-[15px] !leading-normal ${isOpen ? "max-h-[300px] p-[28px]" : "max-h-0 p-0"}`}>
                    {feature.details}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default function Plans({
  email,
  name,
  sectionTitle = "Escolha seu Plano",
  goToSinup = false,
  company_name = "",
  telefone = "",

  seller_id,
}: {
  email?: string;
  name?: string;
  successFunction?: (data: any) => void; // Adjust the type of 'data' accordingly
  company?: any;
  publicDataCompany?: any; // Adjust the type accordingly
  sectionTitle?: any;
  goToSinup?: boolean;
  company_name?: string;
  telefone?: string;
  selectedPlan?: any; // Adjust the type accordingly
  sizeByScreenProportion?: boolean;
  discount?: boolean;
  seller_id?: string;
}) {
  const [plan, setPlan] = useState<PlanType | null>(null);
  const signupLead = `/signup?email=${email}&name=${name}&nome_fantasia=${company_name}&telefone=${telefone}`;

  return (
    <div className="!scale-[85%] lg:!scale-[85%] xl:!scale-100 ">
      {plan && (
        <div className="w-full text-center text-[16px] font-light">
          Você selecionou o plano de{" "}
          <span className="font-semibold text-[16px]">
            {plan.quantity} atendimentos
          </span>
          .
          <br />
          Custo total: {formatToBRL(plan.total_cost)}{" "}
          {plan.frequency === "monthly"
            ? " por mês."
            : plan.frequency === "bi-annual"
              ? " a cada 6 meses."
              : "por ano."}
        </div>
      )}

      {!plan && (
        <div
          className={`flex flex-col relative ${!goToSinup && ` scale-[80%] lg:scale-[100%]`}`}
        >
          <div className="w-full !h-full flex items-center justify-center mt-[0px]">
            <div className="flex  w-full flex-col items-center justify-center">
              {sectionTitle}
              <div className="absolute lg:hidden  w-full mt-[-90px] h-[400px] z-[20]"></div>
              <DynamicPlan
                selectPlan={(q: number, f: string, t: number, u: number) => {
                  setPlan({
                    quantity: q,
                    frequency: f,
                    total_cost: t,
                    unit: u,
                  });
                }}
                goToSinup={goToSinup}
                signupLead={signupLead}
              />
              {/* <p className=" !leading-normal px-10 text-center mt-5">
                Precisa de um plano maior? Entre em{" "}
                <span
                  onClick={() => window.open(BREN_CONSTANTS.CALENDLY_LINK)}
                className="font-bold text-glacier dark:text-yellowgreenish cursor-pointer">
                  contato conosco e conheça nosso plano enterprise
                </span>
                .
              </p> */}
            </div>
          </div>
        </div>
      )}

      {/* {plan && (
        <div className="absolute w-screen  bg-black/50 h-screen top-0 left-0 z-[99] flex items-center justify-center backdrop-blur-lg">
          <div className="overflow-y-auto h-screen w-screen lg:flex items-center justify-center">
            {seller_id && (
              <PaymentStripe
                seller_id={seller_id}
                quantity={plan.quantity}
                unit_amount={plan.unit}
                product_name={`Bren Plano ${plan.frequency === "monthly"
                    ? "Mensal"
                    : plan.frequency === "bi-annual"
                      ? "Semestral"
                      : "Anual"
                  }`}
                recurring_interval={
                  plan.frequency === "monthly"
                    ? 1
                    : plan.frequency === "bi-annual"
                      ? 6
                      : 12
                }
              />
            )}
          </div>
        </div>
      )} */}
    </div>
  );
}
