"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BrenIcon from "@/app/components/Layout/Icons/BrenIcon";
import Logo from "@/app/components/Layout/Logos/Logo";
import Loading from "@/app/components/Layout/Loading/Loading";

interface SessionStatusResponse {
  customer: {};
  session: {
    status: string;
    payment_status: string;
  };
}

const ReturnedPaymentStripe = () => {
  const [error, setError] = useState<any>();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const session_id = searchParams.get("session_id");
  const [response, setResponse] = useState<SessionStatusResponse>();
  const [signupSuccess, setSignupSuccess] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/wallet/subscription/checkout/session/${session_id}`,
        );

        if (!result.ok) throw result;

        const resultJson = await result.json();

        setResponse(resultJson);

        if (
          resultJson.session.status === "complete" &&
          resultJson.session.payment_status === "paid"
        ) {
          setSignupSuccess(true);
        }
      } catch (error: any) {
        if (error.response.status === 404) {
          setError("Session not found");
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !loading ? (
    <>
      <div className="bg-white font-light dark:bg-tall-grey signup ">
        <div
          className={`w-[100vw] h-[calc(100vh)] overflow-hidden   bg-no-repeat bg-[length:30vw] transition-[0.4s] duration-700 bg-[80vw_70vh] lg:bg-[url('/signup/signup-graph2.png')]`}
        >
          <div
            className={`relative loadComponent bg-no-repeat bg-[length:30vw] transition-[0.4s] duration-700 bg-[-10vw_-10vh] lg:bg-[url('/signup/signup-graph1.png')] `}
          >
            <div className="flex w-full justify-end">
              <div className="mt-[4vh] absolute right-[-50px] md:right-0">
                <Logo style={2} responsiveMode={true} height={34} />
              </div>
            </div>
            <main className="h-full flex !flex-col !items-center mt-[5vh]">
              {response &&
              signupSuccess &&
              response.session.status === "complete" &&
              response.session.payment_status === "paid" ? (
                <>
                  <div className="w-full !h-full flex items-center justify-center">
                    <div className="flex mt-[2vh] h-[calc(70vh)] w-full flex-col items-center justify-center">
                      <div className=" bg-gradient-primary-horizontal text-white dark:text-black  rounded-full h-[14vh] w-[14vh] flex items-center justify-center mb-[1vh]">
                        <div className="h-[13vh] w-[13vh] bg-[var(--white)] rounded-full flex items-center justify-center ">
                          <BrenIcon
                            icon={"checkmark"}
                            size="7vh"
                            color="inherit"
                          />
                        </div>
                      </div>
                      <h1
                        className={` text-center !mb-[0vh] mt-[1vh] text-[3.5vh]`}
                      >
                        Pagamento Confirmado
                      </h1>
                      <p className=" max-w-[50vh] px-[2vh] py-[1vh]  text-center text-[1.7vh]">
                        Seu Pagamento foi confirmado e você já pode entrar na
                        plataforma. Também lhe enviamos um e-mail com os
                        detalhes dos próximos passos.
                      </p>
                      {/* <Link href={'/initial-settings'} className="!border-2 border-[var(--oil)] flex !items-center !justify-center primary-button !p-[2vh_3vh] !text-[1.7vh] mt-[3vh] font-semibold ">Entrar <BrenIcon icon={'enter'} size="2vh" color='inherit' /></Link> */}
                      <Link
                        href={"/login"}
                        className="!border-2 border-[var(--oil)] rounded-full flex !items-center !justify-center primary-button !p-[2vh_3vh] !text-[1.7vh] mt-[3vh] font-semibold "
                      >
                        Entrar{" "}
                        <BrenIcon icon={"enter"} size="2vh" color="inherit" />
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full !h-full flex items-center justify-center">
                    <div className="flex mt-[2vh] h-[calc(70vh)] w-full flex-col items-center justify-center">
                      <div className=" bg-gradient-primary-horizontal text-white dark:text-black  rounded-full h-[14vh] w-[14vh] flex items-center justify-center mb-[1vh]">
                        <div className="h-[13vh] w-[13vh] bg-[var(--white)] rounded-full flex items-center justify-center ">
                          <BrenIcon icon={"times"} size="7vh" color="inherit" />
                        </div>
                      </div>
                      <h1
                        className={` text-center !mb-[0vh] mt-[1vh] text-[3.5vh]`}
                      >
                        Pagamento não realizado
                      </h1>
                      <p className=" max-w-[50vh] px-[2vh] py-[1vh]  text-center text-[1.7vh]">
                        Seu pagamento não foi realizado, tente novamente.
                      </p>
                      <pre>{JSON.stringify(error)}</pre>
                    </div>
                  </div>
                </>
              )}{" "}
            </main>
          </div>
        </div>{" "}
      </div>
    </>
  ) : (
    <>
      <Loading />
    </>
  );
};

export default ReturnedPaymentStripe;
