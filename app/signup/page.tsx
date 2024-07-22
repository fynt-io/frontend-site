"use client";
import React, { useState } from "react";
import InputField from "../components/Layout/Inputs/InputField";
import { SellerInterface } from "../constants/types";
import PasswordStrengthMeter from "../components/Layout/Inputs/PasswordStrengthMeter";
import { useRouter } from "next/navigation";
import BrenIcon from "../components/Layout/Icons/BrenIcon";
import Link from "next/link";
import { formatToCNPJ } from "brazilian-values";
import {
  GetCNPJInfo,
  SendPlatformMessage,
  CreateEmpresa,
} from "../Utils/Utils";
import SpinnerLoading from "../components/Layout/Loading/SpinnerLoading";
import ZapSign from "../components/ZapSign";
import Plans from "../components/Stripe/plans";
import {
  InputFieldSignup,
  StepSectionSignup,
  SignupProgress,
} from "../components/Signup/SignupComponents";

export default function Signup() {
  const router = useRouter();
  const [docSigned, setDocSigned] = useState(false);
  const [publicDataCompany, setPublicDataCompany] = useState(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loadingCNPJ, setLoadingCNPJ] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [companyType, setCompanyType] = useState<string>("");
  const [previousPlan, setPreviousPlan] = useState<any>(null);
  const [showingWarningCompanyType, setShowingWarningCompanyType] =
    useState<boolean>(false);
  const [sellerId, setSellerId] = useState<string>("");
  const [seller, setSeller] = useState<SellerInterface>({
    trading_name: "",
    cnpj: "",
    company_name: "",
    whatsapp_number: "",
    smart_registration_activate: false,
    collaborator: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      new_password: "",
      confirm_password: "",
      is_superuser: true,
    },
  });

  React.useEffect(() => {
    console.log(seller);
  }, [seller]);

  async function RegisterSeller() {
    let payload: SellerInterface = seller;
    payload.whatsapp_number = seller?.collaborator?.phone;

    const newSeller = await CreateEmpresa(payload);
    if (newSeller) {
      setPublicDataCompany(newSeller);
      console.log("Empresa Registrada com sucesso. ID: " + newSeller.id);
      setSellerId(newSeller.id);
    }
  }

  async function getCNPJInfoMethod() {
    //remove all non numeric characters
    let cnpj = seller.cnpj?.replace(/\D/g, "");

    if (cnpj?.length === 14) {
      setLoadingCNPJ(true);

      const cnpjInfo = await GetCNPJInfo(cnpj);
      if (cnpjInfo) {
        setSeller({
          ...seller,
          company_name: cnpjInfo.razao_social,
          trading_name: cnpjInfo.nome_fantasia,
        });
      }
      setLoadingCNPJ(false);
    }
  }

  const AcceptTermsRender = () => {
    return (
      <div className="flex items-center justify-center mt-10">
        <label className="m-2 mx-[30px] inline-block items-center justify-center text-[14px] lg:text-[16px] text-center text-[var(--oil)]">
          <input
            type="checkbox"
            onChange={() => setAcceptTerms(!acceptTerms)}
            className="mr-2"
            checked={acceptTerms}
          ></input>
          Li e estou de acordo com os <br />
          <Link
            href="/terms-of-use-and-privacy-policy"
            target="_blank"
            className="text-[#69a4cb] text-[14px] lg:text-[16px] font-semibold underline "
          >
            termos de uso da plataforma
          </Link>
          .
        </label>
      </div>
    );
  };

  const handleDocSigned = () => {
    console.log("handleDocSigned");
    if (!docSigned) {
      setDocSigned(true);
      SendPlatformMessage("Contrato Assinado com sucesso!");
    }
  };

  const handleDocAlreadyExists = () => {
    console.log("handleDocAlreadyExists");
    setDocSigned(true);
  };

  return (
    <div
      className="bg-white dark:bg-tall-grey h-screen  overflow-x-hidden overflow-y-auto loadComponent"
      onKeyDown={(e) => {
        if (e.keyCode === 9) e.preventDefault();
      }}
    >
      <div
        className="fixed h-[250px] w-[400px] left-[-50px]  bottom-[0px] hidden lg:block opacity-10"
        style={{
          backgroundImage: `url('/signup/signup-graph1.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "400px 250px",
          backgroundPosition: "-50px 50px",
        }}
      ></div>
      <div
        className="fixed bg-contain h-[250px] w-[400px] right-[-50px]  top-[-50px] hidden lg:block opacity-10"
        style={{
          backgroundImage: `url('/signup/signup-graph2.png')`,
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        className=" h-[calc(100vh-150px)] inline-flex min-h-[500px] lg:min-h-[792px] "
        style={{
          transform: `translateX(calc(-100vw * ${currentStep - 1}))`,
          transition: "0.2s",
        }}
      >
        {/* Step 1: Aceite dos termos */}
        <StepSectionSignup
          step={1}
          headerImage={"/signup/signupImage.png"}
          nextButtonAction={() => {
            setCurrentStep(2);
          }}
          nextButtonText="Começar"
          nextButtonDisabled={!acceptTerms}
          mainDescription={
            <>
              Você está a um passo de começar a potencializar as vendas do seu
              negócio com a <span className=" font-semibold">Bren</span>. Nas
              próximas telas iremos pedir alguns dados seus e da sua empresa
              para realizarmos seu cadastro.
            </>
          }
        >
          <AcceptTermsRender />
        </StepSectionSignup>

        {/* Step 2: Dados do colaborador */}
        <StepSectionSignup
          step={2}
          nextButtonAction={() => {
            setCurrentStep(3);
            getCNPJInfoMethod();
          }}
          returnButtonAction={() => {
            setCurrentStep(1);
          }}
          returnButtonText="Voltar"
          nextButtonText="Próximo"
          nextButtonDisabled={!seller.cnpj || seller.cnpj.length < 18}
          mainDescription={
            <>
              Primeiro, vamos precisar do CNPJ da sua empresa. Com ele,
              poderemos verificar a situação cadastral de sua empresa de forma
              automática:
            </>
          }
        >
          <InputFieldSignup
            maxLength={18}
            type="text"
            value={seller.cnpj}
            onChange={(e: any) =>
              setSeller({ ...seller, cnpj: formatToCNPJ(e.target.value) })
            }
            placeholder="Digite Aqui"
            label="CNPJ"
          />
        </StepSectionSignup>

        {/* Step 3: Confirme seus dados */}
        <StepSectionSignup
          step={3}
          nextButtonAction={() => {
            setCurrentStep(4);
          }}
          returnButtonAction={() => {
            setCurrentStep(2);
          }}
          returnButtonText="Digitar outro CNPJ"
          nextButtonText="Confirmar"
          nextButtonIcon={"checkmark"}
          returnButtonIcon={"times"}
          nextButtonDisabled={!seller.company_name || !seller.trading_name}
          mainDescription={
            loadingCNPJ ? (
              <>Buscando seu CNPJ, por favor aguarde.</>
            ) : (
              <>
                A empresa de CNPJ{" "}
                <span className="font-semibold">{seller.cnpj}</span>
                <br /> está cadastrada como:
              </>
            )
          }
        >
          {loadingCNPJ && (
            <div className="my-10 h-[70px] flex items-center justify-center loadComponent">
              <SpinnerLoading width="h-[70px]" height="h-[70px]" />
            </div>
          )}
          {!loadingCNPJ && (
            <>
              <div className="flex flex-col lg:flex-row my-5 loadComponent w-full lg:w-auto">
                <InputFieldSignup
                  type="text"
                  value={seller.company_name}
                  onChange={(e: any) =>
                    setSeller({ ...seller, company_name: e.target.value })
                  }
                  placeholder="Digite Aqui"
                  label="Razão Social"
                />
                <div className="mx-3"></div>
                <InputFieldSignup
                  type="text"
                  value={seller.trading_name}
                  onChange={(e: any) =>
                    setSeller({ ...seller, trading_name: e.target.value })
                  }
                  placeholder="Digite Aqui"
                  label="Nome Fantasia"
                />
              </div>
            </>
          )}
        </StepSectionSignup>

        {/* Step 4: E-mail */}
        <StepSectionSignup
          step={4}
          nextButtonAction={() => {
            setCurrentStep(5);
          }}
          returnButtonAction={() => {
            setCurrentStep(3);
          }}
          returnButtonText="Voltar"
          nextButtonText="Próximo"
          nextButtonDisabled={
            !seller?.collaborator?.email ||
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
              seller?.collaborator?.email,
            ) ||
            seller?.collaborator?.email !== confirmEmail
          }
          mainDescription={
            <>
              Agora precisamos do seu e-mail para que possamos te enviar as
              informações de acesso à plataforma:
            </>
          }
        >
          <div className="flex flex-col  my-5 loadComponent w-full lg:w-auto">
            {seller?.collaborator?.email !== undefined && (
              <InputFieldSignup
                type="email"
                correct={
                  !!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    seller?.collaborator?.email,
                  )
                }
                value={seller?.collaborator?.email}
                onChange={(e: any) =>
                  seller.collaborator &&
                  setSeller({
                    ...seller,
                    collaborator: {
                      ...seller.collaborator,
                      email: e.target.value,
                    },
                  })
                }
                placeholder="Digite Aqui"
                label="E-mail"
              />
            )}
            <InputFieldSignup
              type="email"
              correct={
                seller?.collaborator?.email !== "" &&
                seller?.collaborator?.email.includes("@") &&
                seller?.collaborator?.email.includes(".") &&
                seller?.collaborator?.email === confirmEmail
              }
              preventPaste
              value={confirmEmail}
              onChange={(e: any) => setConfirmEmail(e.target.value)}
              placeholder="Digite Aqui"
              label="Confirme seu E-mail"
            />
          </div>
        </StepSectionSignup>

        {/* Step 5: Tipo de Negócio */}
        <StepSectionSignup
          step={5}
          nextButtonAction={() => {
            showingWarningCompanyType
              ? router.push("/")
              : companyType === "b2b"
                ? setCurrentStep(6)
                : setShowingWarningCompanyType(true);
          }}
          returnButtonAction={() => {
            !showingWarningCompanyType
              ? setCurrentStep(4)
              : setShowingWarningCompanyType(false);
          }}
          returnButtonText="Voltar"
          nextButtonText={
            showingWarningCompanyType ? "Ir para a Home" : "Próximo"
          }
          nextButtonDisabled={companyType === ""}
          mainDescription={
            !showingWarningCompanyType ? (
              <> Qual é o tipo de negócio da sua empresa? </>
            ) : (
              <>
                {" "}
                Obrigado por seu interesse em nossos serviços! No momento, não
                oferecemos suporte para empresas que tenham modelo de negócio
                B2C, mas adicionamos seu e-mail em nossa lista de espera. Assim
                que tivermos disponibilidade, entraremos em contato para
                conversarmos sobre como podemos ajudar sua empresa a decolar com
                a Bren!{" "}
              </>
            )
          }
        >
          {!showingWarningCompanyType && (
            <div className="mt-10 flex flex-col lg:flex-row max-w-[768px]">
              <div
                onClick={() => {
                  setCompanyType("b2b");
                }}
                className={`border-2 border-cloudy-blue/50 ${companyType === "b2b" && "border-[#6da9c9]"} p-8 relative rounded-2xl mb-2 mx-2 cursor-pointer`}
              >
                <div
                  className={`flex items-center justify-center bg-cloudy-blue/50 ${companyType === "b2b" && "bg-gradient-primary-horizontal text-white dark:text-black "} rounded-full h-[30px] w-[30px] absolute top-[10px] right-[10px]`}
                >
                  {companyType === "b2b" && (
                    <BrenIcon
                      icon={"checkmark"}
                      size="30px"
                      stroke={1}
                      color="white"
                    />
                  )}
                </div>
                <h2 className="font-semibold text-[25px]">B2B</h2>
                <p className="text-[16px]">
                  Minha empresa oferece produtos e/ou serviços para outras
                  empresas.
                </p>
              </div>
              <div
                onClick={() => setCompanyType("b2c")}
                className={`border-2 border-cloudy-blue/50 ${companyType === "b2c" && "border-[#6da9c9]"} p-8 relative rounded-2xl mb-2 mx-2 cursor-pointer`}
              >
                <div
                  className={` flex items-center justify-center bg-cloudy-blue/50 ${companyType === "b2c" && "bg-gradient-primary-horizontal text-white dark:text-black "} rounded-full h-[30px] w-[30px] absolute top-[10px] right-[10px]`}
                >
                  {companyType === "b2c" && (
                    <BrenIcon
                      icon={"checkmark"}
                      size="30px"
                      stroke={1}
                      color="white"
                    />
                  )}
                </div>
                <h2 className="font-semibold text-[25px]">B2C</h2>
                <p className="text-[16px]">
                  Minha empresa oferece produtos e/ou serviços para clientes
                  pessoa física.
                </p>
              </div>
            </div>
          )}
        </StepSectionSignup>

        {/* Step 6: Nome do colaborador */}
        <StepSectionSignup
          step={6}
          nextButtonAction={() => {
            setCurrentStep(7);
          }}
          returnButtonAction={() => {
            setCurrentStep(5);
          }}
          returnButtonText="Voltar"
          nextButtonText="Próximo"
          nextButtonDisabled={
            !seller?.collaborator?.first_name ||
            !seller?.collaborator?.last_name
          }
          mainDescription={
            <>
              Agora precisamos do seu nome para que possamos te identificar na
              plataforma:
            </>
          }
        >
          <div className="flex flex-col lg:flex-row my-5 loadComponent w-full lg:w-auto">
            <InputFieldSignup
              type="text"
              value={seller?.collaborator?.first_name}
              onChange={(e: any) =>
                seller.collaborator &&
                setSeller({
                  ...seller,
                  collaborator: {
                    ...seller.collaborator,
                    first_name: e.target.value,
                  },
                })
              }
              placeholder="Digite Aqui"
              label="Nome"
            />
            <div className="mx-3"></div>
            <InputFieldSignup
              type="text"
              value={seller?.collaborator?.last_name}
              onChange={(e: any) =>
                seller.collaborator &&
                setSeller({
                  ...seller,
                  collaborator: {
                    ...seller.collaborator,
                    last_name: e.target.value,
                  },
                })
              }
              placeholder="Digite Aqui"
              label="Sobrenome"
            />
          </div>
        </StepSectionSignup>

        {/* Step 7: Número de WhatsApp */}
        <StepSectionSignup
          step={7}
          nextButtonAction={() => {
            setCurrentStep(8);
          }}
          returnButtonAction={() => {
            setCurrentStep(6);
          }}
          returnButtonText="Voltar"
          nextButtonText="Próximo"
          nextButtonDisabled={
            !seller?.collaborator?.phone ||
            seller?.collaborator?.phone.length < 12
          }
          mainDescription={
            <>
              Obrigado,{" "}
              <span className="font-semibold">
                {seller?.collaborator?.first_name}
              </span>
              ! Agora precisamos do seu número de WhatsApp, que será usado para
              entrar em contato e oferecer suporte:
            </>
          }
        >
          <div className="mt-10 [&>*]:!bg-transparent border-b focus:outline-none dark:border-white/75 dark:focus:border-yellowgreenish border-black/75 focus:border-glacier flex items-center justify-center">
            <InputField
              type="phone"
              value={seller?.collaborator?.phone}
              onChange={(e) =>
                seller.collaborator &&
                setSeller({
                  ...seller,
                  collaborator: { ...seller.collaborator, phone: e },
                })
              }
              fieldsetStyle={{ border: "none", width: "auto" }}
              className="!w-auto !text-center  dark:border-[#ccc] [&>*]:!text-[16px]  !text-[16px] text-center"
            />
          </div>
          {/* <InputFieldSignup maxLength={15} type="text" value={seller?.collaborator?.phone} onChange={(e: any) => setCollaborator({ ...collaborator, phone: e.target.value })} placeholder="Digite Aqui" label="WhatsApp para contato" /> */}
        </StepSectionSignup>

        {/* Step 8: Senha */}
        <StepSectionSignup
          step={8}
          nextButtonAction={() => {
            setCurrentStep(9);
            RegisterSeller();
          }}
          returnButtonAction={() => {
            setCurrentStep(7);
          }}
          returnButtonText="Voltar"
          nextButtonText="Próximo"
          nextButtonDisabled={
            !seller?.collaborator?.new_password ||
            !/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(
              seller?.collaborator?.new_password,
            ) ||
            seller?.collaborator?.new_password !==
              seller?.collaborator?.confirm_password
          }
          mainDescription={
            <>
              Para finalizar, precisamos que você crie uma senha de acesso à
              plataforma:
            </>
          }
        >
          <InputFieldSignup
            type="password"
            correct={
              seller?.collaborator?.new_password
                ? !!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(
                    seller?.collaborator?.new_password,
                  )
                : false
            }
            value={seller?.collaborator?.new_password}
            onChange={(e: any) =>
              seller.collaborator &&
              setSeller({
                ...seller,
                collaborator: {
                  ...seller.collaborator,
                  new_password: e.target.value,
                },
              })
            }
            placeholder="Digite Aqui"
            label="Senha"
          />
          <InputFieldSignup
            preventPaste
            type="password"
            correct={
              seller?.collaborator?.new_password !== "" &&
              seller?.collaborator?.confirm_password !== "" &&
              seller?.collaborator?.new_password ===
                seller?.collaborator?.confirm_password
            }
            value={seller?.collaborator?.confirm_password}
            onChange={(e: any) =>
              seller.collaborator &&
              setSeller({
                ...seller,
                collaborator: {
                  ...seller.collaborator,
                  confirm_password: e.target.value,
                },
              })
            }
            placeholder="Digite Aqui"
            label="Repita a senha"
          />
          <div className="mt-5"></div>
          <PasswordStrengthMeter
            password={
              seller?.collaborator?.new_password
                ? seller?.collaborator?.new_password
                : ""
            }
          />
        </StepSectionSignup>

        {/* Step 9: Assinatura ZapSign */}
        <StepSectionSignup
          step={9}
          nextButtonAction={() => {
            setCurrentStep(10);
          }}
          nextButtonText="Continuar"
          nextButtonDisabled={false}
          showButtons={docSigned}
          mainDescription={
            <>
              {docSigned && (
                <span className="loadComponent mx-auto border dark:border-yellowgreenish bg-glacier/10 dark:bg-yellowgreenish/10 border-glacier text-white p-4 rounded-xl mb-5 flex w-[270px] items-center">
                  <BrenIcon
                    icon="checkmark"
                    className="border rounded-full aspect-square !h-[30px] !w-[30px] text-glacier dark:text-yellowgreenish !mr-2"
                  />{" "}
                  <span className="dark:text-white text-black">
                    Recebemos sua assinatura.
                  </span>
                </span>
              )}
              {!docSigned && (
                <>
                  Para finalizar, precisamos que você assine o contrato de
                  prestação de serviços:
                </>
              )}
            </>
          }
        >
          <div className="dark:bg-black/25 bg-white h-screen w-full rounded-xl mt-5">
            <ZapSign
              seller_id={sellerId}
              height="h-full"
              key={seller?.collaborator?.email}
              cnpj={seller.cnpj}
              email={seller?.collaborator?.email}
              signer_name={
                seller?.collaborator?.first_name +
                " " +
                seller?.collaborator?.last_name
              }
              signer_phone={seller?.collaborator?.phone}
              secret={seller?.collaborator?.new_password}
              razao_social={seller.company_name}
              confirmEmail={confirmEmail}
              publicDataCompany={publicDataCompany}
              handleDocSigned={() => handleDocSigned()}
              handleDocAlreadyExists={handleDocAlreadyExists}
            />
          </div>
        </StepSectionSignup>

        {/* Step 10: Planos */}
        <StepSectionSignup
          step={10}
          nextButtonAction={() => {
            setCurrentStep(11);
          }}
          returnButtonAction={() => {
            setCurrentStep(9);
          }}
          returnButtonText="Voltar"
          nextButtonText="Próximo"
          showButtons={false}
          nextButtonDisabled={false}
          mainDescription={""}
        >
          <Plans
            seller_id={sellerId}
            sizeByScreenProportion={false}
            sectionTitle={
              <>
                Selecione abaixo a quantidade de atendimentos que você deseja
                contratar por mês:
              </>
            }
            email={seller?.collaborator?.email}
            name={
              seller?.collaborator?.first_name +
              " " +
              seller?.collaborator?.last_name
            }
            company={seller.company_name}
            publicDataCompany={publicDataCompany}
            successFunction={(plan: any) => {
              setPreviousPlan(plan);
            }}
          />
        </StepSectionSignup>

        {/* Step 11: Cadastro Realizado */}
        <StepSectionSignup
          step={11}
          nextButtonAction={() => {
            router.push("/login");
          }}
          nextButtonText="Entrar na Plataforma"
          nextButtonDisabled={false}
          showButtons={true}
          mainDescription={
            <>
              Seu cadastro foi realizado com sucesso! Você receberá um e-mail
              com o recibo referente a sua assinatura. Agora você já pode entrar
              na plataforma e começar a potencializar as vendas do seu negócio
              com a <span className=" font-semibold">Bren</span>!.
            </>
          }
        ></StepSectionSignup>
      </div>

      {/* Progresso do Cadastro */}
      {currentStep < 10 && <SignupProgress currentStep={currentStep} />}
    </div>
  );
}
