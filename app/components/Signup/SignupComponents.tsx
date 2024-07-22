import { useEffect, useRef, useState } from "react";
import BrenIcon from "../Layout/Icons/BrenIcon";
import Button from "../Layout/Buttons/Button";

const FIXED_STEPS = [
  { step: 1, title: "Seja Bem Vindo(a)!", icon: "" },
  { step: 2, title: "Digite Seu CNPJ", icon: "company" },
  { step: 3, title: "Confirme seus dados", icon: "company" },
  { step: 4, title: "E-Mail", icon: "envelope" },
  { step: 5, title: "Tipo de Negócio", icon: "company" },
  { step: 6, title: "Como você se chama?", icon: "user" },
  { step: 7, title: "Número de WhatsApp", icon: "whatsapp" },
  { step: 8, title: "Senha de Acesso", icon: "key" },
  { step: 9, title: "", icon: "" },
  { step: 10, title: "Planos", icon: "" },
  { step: 11, title: "Cadastro Realizado", icon: "checkmark" },
];

const FIXED_STEPS_INITIAL_SETTINGS = [
  { step: 1, title: "Configuração Inicial", icon: "" },
  { step: 2, title: "Contratação de Número", icon: "" },
  { step: 3, title: "Contratação de Número", icon: "" },
  { step: 4, title: "Business Manager ID", icon: "" },
  { step: 5, title: "Envio do Convite de Acesso", icon: "" },
  { step: 6, title: "Configuração do Assistente", icon: "" },
];

export const InputFieldSignup = ({
  type,
  value,
  onChange,
  placeholder,
  label,
  maxLength = 9999,
  correct,
  preventPaste = false,
}: {
  type: any;
  value: any;
  onChange: any;
  placeholder?: string;
  label?: string;
  maxLength?: number;
  correct?: boolean;
  preventPaste?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //AJUSTA A LARGURA DO INPUT DE ACORDO COM O CONTEÚDO DIGITADO
  const [inputWidth, setInputWidth] = useState("auto");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      const inputStyle = window.getComputedStyle(inputRef.current);
      const font =
        inputStyle.getPropertyValue("font") ||
        inputStyle.getPropertyValue("font-size") +
          " " +
          inputStyle.getPropertyValue("font-family");
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context) {
        context.font = font;
        const textWidth = context.measureText(value).width;
        setInputWidth(textWidth + "px");
      }
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-center relative ">
      {type === "password" && (
        <BrenIcon
          icon={showPassword ? "eye" : "eye-slashed"}
          size="30px"
          color="inherit"
          className="absolute top-[14px] z-[99] right-0 mr-5 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
      <input
        autoComplete={preventPaste ? "off" : ""}
        onPaste={(e) => {
          preventPaste && e.preventDefault();
          return false;
        }}
        onCopy={(e) => {
          preventPaste && e.preventDefault();
          return false;
        }}
        placeholder={placeholder}
        maxLength={maxLength}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        ref={inputRef}
        style={{ width: inputWidth }}
        className="min-w-[200px] bg-transparent border-b pb-0 text-[16px] mt-5 text-center opacity-75 focus:opacity-100 focus:outline-none dark:border-white/75 dark:focus:border-yellowgreenish border-black/75 focus:border-glacier"
      />
      <label className="mt-2">{label}</label>
      {correct && (
        <div
          className="absolute loadComponent right-[-25px] top-[20px] h-[20px] w-[20px] rounded-full flex items-center justify-center bg-[green]  text-white"
          style={{ WebkitTextStroke: "1px" }}
        >
          <BrenIcon stroke={1} size="15px" icon="checkmark" color="#ffffff" />
        </div>
      )}
    </div>
  );
};

export const StepSectionSignup = ({
  step,
  children,
  icon,
  headerImage,
  title,
  mainDescription,
  returnButtonText,
  returnButtonAction,
  returnButtonIcon = "arrow-left",
  nextButtonText,
  nextButtonAction,
  nextButtonDisabled,
  nextButtonIcon = "arrow-right",
  showButtons = true,
}: {
  step: number;
  children?: any;
  icon?: string;
  headerImage?: any;
  title?: string;
  mainDescription?: any;
  returnButtonText?: string;
  returnButtonAction?: any;
  returnButtonIcon?: any;
  nextButtonText?: string;
  nextButtonAction?: any;
  nextButtonDisabled?: boolean;
  nextButtonIcon?: any;
  showButtons?: any;
}) => {
  if (step < 1 || step > FIXED_STEPS.length) return null;
  if (!title) {
    title = FIXED_STEPS[step - 1].title;
  }
  if (!icon) {
    icon = FIXED_STEPS[step - 1].icon;
  }

  return (
    <section className="px-10 relative flex items-center justify-center flex-col w-screen min-w-screen ">
      {headerImage && (
        <img
          src={headerImage}
          alt={headerImage}
          className="mt-[80px] lg:mt-0 w-[280px] lg:w-[560px] h-auto mb-2"
        />
      )}
      {icon && (
        <div className="bg-gradient-primary-horizontal rounded-full h-[90px] w-[90px] aspect-square flex items-center justify-center">
          <BrenIcon
            icon={icon}
            size="40px"
            color="inherit"
            className="dark:text-black text-white"
          />
        </div>
      )}
      <h2 className="font-light opacity-100 mt-5 mb-5 text-[30px] lg:text-[40px]">
        {title}
      </h2>
      <p className="w-full max-w-[560px] text-center font-light text-[15px] lg:text-[19px] [&>*]:text-[19px]">
        {mainDescription}
      </p>
      {children}
      {showButtons && (
        <div className="flex justify-between items-center mt-10">
          {returnButtonText && (
            <Button
              text={returnButtonText}
              buttonStyle="tertiary-button"
              className="!mx-5"
              responsive={false}
              onClick={returnButtonAction}
              icon={returnButtonIcon}
              iconOnTheLeft
            />
          )}
          {nextButtonText && (
            <Button
              text={nextButtonText}
              buttonStyle="accent-button"
              className="!mx-5"
              responsive={false}
              onClick={nextButtonAction}
              icon={nextButtonIcon}
              disabled={nextButtonDisabled}
            />
          )}
        </div>
      )}
    </section>
  );
};

export const StepSectionInitialConfig = ({
  step,
  children,
  icon,
  headerImage,
  title,
  mainDescription,
  returnButtonText,
  returnButtonAction,
  returnButtonIcon = "arrow-left",
  nextButtonText,
  nextButtonAction,
  nextButtonDisabled,
  nextButtonIcon = "arrow-right",
  showButtons = true,
}: {
  step: number;
  children?: any;
  icon?: string;
  headerImage?: any;
  title?: string;
  mainDescription?: any;
  returnButtonText?: string;
  returnButtonAction?: any;
  returnButtonIcon?: any;
  nextButtonText?: string;
  nextButtonAction?: any;
  nextButtonDisabled?: boolean;
  nextButtonIcon?: any;
  showButtons?: any;
}) => {
  if (step < 1 || step > FIXED_STEPS_INITIAL_SETTINGS.length) return null;
  if (!title) {
    title = FIXED_STEPS_INITIAL_SETTINGS[step - 1].title;
  }
  if (!icon) {
    icon = FIXED_STEPS_INITIAL_SETTINGS[step - 1].icon;
  }

  return (
    <section className="px-10 relative flex items-center justify-start flex-col  w-screen min-w-screen  pt-20 ">
      {headerImage && (
        <img
          src={headerImage}
          alt={headerImage}
          className="mt-[80px] lg:mt-0 w-[280px] lg:w-[560px] h-auto mb-2"
        />
      )}
      {icon && (
        <div className="bg-gradient-primary-horizontal rounded-full h-[90px] w-[90px] aspect-square flex items-center justify-center">
          <BrenIcon
            icon={icon}
            size="40px"
            color="inherit"
            className="dark:text-black text-white"
          />
        </div>
      )}
      <p className="text-[15px] mt-[10px]">
        Passo {step} de {FIXED_STEPS_INITIAL_SETTINGS.length}
      </p>
      <h2 className="font-light opacity-100  mb-5 text-[30px] lg:text-[40px]">
        {title}
      </h2>
      <p className="w-full max-w-[768px] text-center font-light text-[15px] lg:text-[19px] [&>*]:text-[19px]">
        {mainDescription}
      </p>
      {children}
      {showButtons && (
        <div className="flex justify-between items-center mt-10">
          {returnButtonText && (
            <Button
              text={returnButtonText}
              buttonStyle="tertiary-button"
              className="!mx-5"
              responsive={false}
              onClick={returnButtonAction}
              icon={returnButtonIcon}
              iconOnTheLeft
            />
          )}
          {nextButtonText && (
            <Button
              text={nextButtonText}
              buttonStyle="accent-button"
              className="!mx-5"
              responsive={false}
              onClick={nextButtonAction}
              icon={nextButtonIcon}
              disabled={nextButtonDisabled}
            />
          )}
        </div>
      )}
    </section>
  );
};

export const SignupProgress = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className=" lg:flex items-center justify-center lg:h-[100px] absolute top-[-35px] lg:top-0 w-screen lg:w-auto lg:relative ">
      <div className="flex items-center justify-center flex-col">
        <div className="w-screen relative h-[10px] lg:w-[120px]  overflow-hidden bg-cloudy-blue/30 lg:rounded-full mt-10">
          <div
            className={`relative bg-gradient-primary-horizontal text-white dark:text-black  lg:rounded-full h-full `}
            style={{
              transition: "0.2s",
              width: (currentStep / FIXED_STEPS.length) * 100 + "%",
            }}
          />
        </div>
        <p className="hidden lg:block mt-2 text-center text-[13px] lg:text-[15px]">
          <span className="font-semibold text-[13px] lg:text-[15px]">
            Cadastro de Conta
          </span>{" "}
          ·{" "}
          {currentStep === FIXED_STEPS.length ? (
            <>Finalizado</>
          ) : (
            <>
              Passo{" "}
              <span className="font-semibold text-[13px] lg:text-[15px]">
                {currentStep}
              </span>{" "}
              de{" "}
              <span className="font-semibold text-[14px] lg:text-[15px]">
                {FIXED_STEPS.length}
              </span>
            </>
          )}
        </p>
        {currentStep < 10 && (
          <button
            onClick={() => {}}
            className="hidden lg:flex  items-center mt-2 text-[12px] lg:text-[14px] font-semibold opacity-50"
          >
            <BrenIcon icon={"times"} color="inherit" size="20px" /> Cancelar
            cadastro
          </button>
        )}
      </div>
    </div>
  );
};

export const InitialSettingsTimeline = ({ step }: { step: number }) => {
  const CIRCLE_SIZE = "50px";
  let barWidth = "0%";

  switch (step) {
    case 1:
      barWidth = "0%";
      break;
    case 2:
      barWidth = "25%";
      break;
    case 3:
      barWidth = "35%";
      break;
    case 4:
      barWidth = "50%";
      break;
    case 5:
      barWidth = "75%";
      break;
    case 6:
      barWidth = "100%";
      break;
  }

  return (
    <div className="flex items-center justify-between my-[10px] relative w-full scale-[90%] ">
      <div className="w-full h-[10px]  bg-white-smoke dark:bg-black absolute">
        <div
          className="h-full bg-gradient-primary-horizontal  rounded-full relative "
          style={{ width: barWidth, transition: "0.2s" }}
        ></div>
      </div>
      <div className="w-full flex justify-between">
        <div
          className={`z-[1] aspect-square h-[${CIRCLE_SIZE}] w-[${CIRCLE_SIZE}] flex items-center justify-center bg-white-smoke dark:bg-black rounded-full`}
        >
          <div
            className={`aspect-square h-[${CIRCLE_SIZE}] w-[${CIRCLE_SIZE}]  flex items-center justify-center ${step > 1 && "bg-gradient-primary-horizontal text-[#ffffff] dark:text-[#000000] "} rounded-full`}
          >
            <BrenIcon size={"30px"} icon={"phone"} color="inherit" />
          </div>
        </div>
        <div
          className={`z-[1] aspect-square h-[${CIRCLE_SIZE}] w-[${CIRCLE_SIZE}] flex items-center justify-center bg-white-smoke dark:bg-black rounded-full`}
        >
          <div
            className={`aspect-square h-[${CIRCLE_SIZE}] w-[${CIRCLE_SIZE}] flex items-center justify-center ${step > 3 && "bg-gradient-primary-horizontal text-[#ffffff] dark:text-[#000000]"} rounded-full`}
          >
            <BrenIcon size={"30px"} icon={"whatsapp"} color="inherit" />
          </div>
        </div>
        <div
          className={`z-[1] aspect-square h-[${CIRCLE_SIZE}] w-[${CIRCLE_SIZE}] flex items-center justify-center bg-white-smoke dark:bg-black rounded-full`}
        >
          <div
            className={`aspect-square h-[${CIRCLE_SIZE}] w-[${CIRCLE_SIZE}] flex items-center justify-center ${step === 6 && "bg-gradient-primary-horizontal text-[#ffffff] dark:text-[#000000]"} rounded-full`}
          >
            <BrenIcon size={"30px"} icon={"gear"} color="inherit" />
          </div>
        </div>
      </div>
    </div>
  );
};
