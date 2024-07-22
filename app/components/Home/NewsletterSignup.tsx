import React from "react";
import BrenIcon from "../Layout/Icons/BrenIcon";
import InputField from "../Layout/Inputs/InputField";
import SpinnerLoading from "../Layout/Loading/SpinnerLoading";
import { SendPlatformMessage } from "@/app/Utils/Utils";
import { CreateLead } from "@/app/Utils/Utils";
import Button from "../Layout/Buttons/Button";

export const NewsletterSignup = () => {
  const [email, setEmail] = React.useState("");
  const [accepts, setAccepts] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const sendEmail = async () => {
    setLoading(true);
    //if email is empty
    if (!email) {
      SendPlatformMessage("Por favor, preencha o campo de e-mail.");
      setLoading(false);
      return;
    }

    //if email is not valid
    if (!email.includes("@") || !email.includes(".")) {
      SendPlatformMessage("Por favor, preencha um e-mail válido.");
      setLoading(false);
      return;
    }

    //if accepts is false
    if (!accepts) {
      SendPlatformMessage("Por favor, aceite os termos para continuar.");
      setLoading(false);
      return;
    }

    //send the email
    const request = await CreateLead({ email: email });
    console.log(request);

    //if request is successful
    if (request) {
      SendPlatformMessage("E-mail cadastrado com sucesso!");
      setLoading(false);
      setSuccess(true);
    } else {
      SendPlatformMessage(
        "Erro ao cadastrar e-mail. Tente novamente mais tarde.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="lg:h-[400px] max-w-[1200px] lg:py-20 w-full relative text-white">
      <div className="relative h-full flex items-center lg:items-end justify-end w-full flex-col   lg:backdrop-blur-none backdrop-blur-md  py-20 lg:py-0">
        {!success && (
          <div className="loadComponent h-full  !scale-[85%] lg:!scale-[85%] xl:!scale-100 flex items-center lg:items-end justify-center flex-col ">
            <h2 className="text-[40px] leading-[45px] mb-2 font-bold text-center lg:text-right ">
              Não perca nenhuma novidade
            </h2>
            <p className="text-[18px]  w-full text-center lg:text-right font-light">
              Se inscreva e receba todas as nossas atualizações
            </p>
            <div className="mt-5 w-[400px] relative">
              <InputField
                disabled={loading}
                placeholder="Digite seu melhor e-mail aqui"
                fieldsetStyle={{
                  borderRadius: "20px",
                  background: "rgba(0,0,0,0.6)",
                }}
                className="!w-full p-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {loading ? (
                <div className="!absolute right-5 top-5">
                  <SpinnerLoading />
                </div>
              ) : (
                <BrenIcon
                  className="!absolute right-5 top-5 hover:right-4 z-10 transition-[0.2s] !duration-500 !cursor-pointer"
                  icon="arrow-right"
                  onClick={() => sendEmail()}
                  color="white"
                />
              )}
            </div>
            <div className="mt-4 flex items-center justify-center">
              <input
                type="checkbox"
                checked={accepts}
                onChange={() => setAccepts(!accepts)}
                className="h-5 w-5 mr-2"
              />
              <div
                className="cursor-pointer"
                onClick={() => setAccepts(!accepts)}
              >
                Aceito receber novidades e atualizações em meu e-mail.
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="loadComponent h-full flex items-center  justify-center flex-col ">
            <h2 className="text-[40px] font-bold text-center lg:text-right leading-[45px] mb-3 ">
              E-mail cadastrado com sucesso! 🎉
            </h2>
            <p className="text-[18px]  w-full text-center lg:text-right font-light">
              Agora você receberá todas as nossas novidades em{" "}
              <span className="text-[18px] font-bold">
                {email ? email : "primeira mão"}.
              </span>
            </p>
            <div className="w-full flex justify-center lg:justify-end mt-5">
              <Button
                responsive={false}
                text="Cadastrar outro e-mail"
                buttonStyle="accent-button-yellow-greenish"
                onClick={() => setSuccess(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
