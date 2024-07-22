"use client";
import React, { useState, useEffect } from "react";
import Button from "../components/Layout/Buttons/Button";
import Loading from "../components/Layout/Loading/Loading";
import InputField from "../components/Layout/Inputs/InputField";
import BrenIcon from "../components/Layout/Icons/BrenIcon";
import { useSearchParams } from "next/navigation";
import Logo from "../components/Layout/Logos/Logo";
import PasswordStrengthMeter from "../components/Layout/Inputs/PasswordStrengthMeter";
import { ResetPassword, resetPassword } from "../api/callers/authentication";

const ResetPasswordScreen: React.FC = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] =
    useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [resetPasswordData, setResetPasswordData] = useState<ResetPassword>({
    email: "",
    url: "",
    new_password: "",
    confirm_password: "",
  });

  useEffect(() => {
    //get token search param
    const token = searchParams.get("token");
    if (token) {
      setToken(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SendResetPassword = async () => {
    setIsLoading(true);
    resetPassword(resetPasswordData, token)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        setForgotPasswordSuccess(true);
      })
      .catch((error) => {
        setForgotPasswordSuccess(false);
        setIsLoading(false);
        setError(
          "Ocorreu um erro ao trocar a senha, tente novamente mais tarde.",
        );
      });
  };

  return (
    <div className="row flex relative bg-white dark:bg-dark-grey">
      {isLoading && <Loading />}

      <main className="w-full md:w-7/12 relative">
        <div
          className={`loadComponent flex align-center justify-center w-full  md:-top-20 top-[3vh] relative h-screen min-h-[750px] md:h-screen`}
        >
          <div
            className={`flex align-center justify-start md:justify-center flex-col w-full md:w-6/12 px-20 md:px-0 mt-20`}
          >
            <div className="mb-10">
              {!forgotPasswordSuccess && (
                <Logo style={1} responsiveMode={false} />
              )}
            </div>

            {!forgotPasswordSuccess && (
              <div>
                <h1 className={`H300 text-center !mb-0`}>
                  Crie uma nova Senha
                </h1>
                <p className="mb-10 text-center  font-light">
                  Crie uma nova senha abaixo para entrar na plataforma:
                </p>

                <div>
                  <InputField
                    type="password"
                    label={"Nova Senha"}
                    value={resetPasswordData.new_password}
                    onChange={(e) =>
                      setResetPasswordData((prevState) => ({
                        ...prevState,
                        new_password: e.target.value,
                      }))
                    }
                    onBlur={() => { }}
                    placeholder=""
                    disabled={false}
                    maxLength={500}
                    className=""
                    style={{}}
                    fieldsetStyle={{}}
                  />

                  <InputField
                    type="password"
                    label={"Confirmar Senha"}
                    value={resetPasswordData.confirm_password}
                    onChange={(e) =>
                      setResetPasswordData((prevState) => ({
                        ...prevState,
                        confirm_password: e.target.value,
                      }))
                    }
                    onBlur={() => { }}
                    placeholder=""
                    disabled={false}
                    maxLength={500}
                    className=""
                    style={{}}
                    fieldsetStyle={{}}
                  />
                </div>
                {resetPasswordData.new_password && (
                  <div className="loadComponent mt-10 flex items-center justify-center ">
                    <PasswordStrengthMeter
                      password={resetPasswordData.new_password}
                      relativeSize
                    />
                  </div>
                )}
                {error !== "" && (
                  <p
                    className={`p-2 text-[#c97f7f] rounded-xl text-center mt-2 border border-[#c97f7f]`}
                  >
                    {error}
                  </p>
                )}
                <div className="flex justify-center mt-8">
                  <Button
                    className="!w-full lg:!w-[200px]"
                    responsive={false}
                    buttonStyle="accent-button"
                    icon={"arrow-right"}
                    onClick={(e) => SendResetPassword()}
                    text="Criar Senha"
                  />
                </div>
              </div>
            )}

            {forgotPasswordSuccess && (
              <div className="flex items-center justify-center flex-col">
                <div className="scale-[2] mb-10 flex items-center justify-center border border-glacier dark:border-yellowgreenish rounded-full w-[40px]">
                  <BrenIcon
                    icon={"checkmark"}
                    size="40px"
                    className="text-glacier dark:text-yellowgreenish"
                  />
                </div>
                <h1 className={`H300 text-center !mb-5`}>
                  Senha Trocada com Sucesso
                </h1>
                <p className="mb-10 text-center">
                  Você já pode entrar na plataforma com sua nova senha.
                </p>
                <div className="flex justify-center mt-2">
                  <Button
                    responsive={false}
                    buttonStyle="accent-button"
                    icon={"arrow-right"}
                    onClick={() => (window.location.href = `/login`)}
                    text="Ir para Login"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <div
        className="hidden md:flex w-5/12 md:w-0/12"
        style={{
          background:
            "url(https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg) center",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
};

export default ResetPasswordScreen;
