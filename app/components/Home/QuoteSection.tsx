import React, { useEffect, useState } from "react";

export const QuoteSection = () => {
  return (
    <>
      <div className="text-white">
        <section className="mb-0  flex flex-row w-screen container mx-auto  px-0 xl:px-[150px] relative z-10">
          <div className=" flex flex-row justify-center w-screen ">
            <div className=" px-[50px] pr-[50px] lg:pr-[200px] xl:pr-[100px] 2xl:pr-[200px] w-full h-full flex flex-col justify-center items-center  ">
              <h2 className="text-[40px] font-light text-center mb-10 w-[400px] leading-[40px]">
                <span className="text-[40px] font-bold text-center mb-10 xl:mb-0 mt-2 xl:inline-block  ">
                  Liberte
                </span>{" "}
                seu <br />
                time de vendas
              </h2>
              <div className="leading-[26px] w-full text-[18px]  text-center  rounded-[40px] bg-black/25 p-10 font-semibold relative">
                {/* <span style={{ background: 'url(./quote-l.svg) no-repeat', backgroundSize: 'contain', filter: "invert(1)" }} className='h-10 w-10 absolute -left-5 top-10' /> */}
                {/* <span style={{ background: 'url(./quote-r.svg) no-repeat', backgroundSize: 'contain', filter: "invert(1)" }} className='h-10 w-10 absolute -right-5 bottom-10 ' /> */}
                <div className="font-light text-[18px]">
                  Os vendedores passam apenas 28% do seu tempo efetivamente
                  vendendo, sendo a maior parte do seu tempo consumida por
                  outras tarefas, como preenchimento de CRM, qualificação de
                  leads e gerenciamento de negócios.
                </div>
              </div>
              <p className="w-[300px] leading-[22px] opacity-50 italic text-center mt-5">
                Fonte: Salesforce
              </p>
              {/* <div className='flex justify-center lg:justify-center w-full'>
                        <Button buttonStyle='accent-button' className='mt-10 !py-2 !px-10' onClick={() => window.location.href = '/signup'} responsive={false} text={"Cadastre-se"} icon={"arrow-right"} />
                    </div> */}
            </div>
            <div className="lg:w-[650px] xl:w-full hidden lg:flex leading-[45px]   items-center justify-end relative">
              <div
                style={{
                  backgroundImage: "url(./home/bren-home-start-screen4.jpg)",
                  backgroundRepeat: "none",
                  backgroundSize: "100% auto",
                  backgroundAttachment: "fixed",
                  backgroundPosition: "center right",
                }}
                className="lg:-mr-20 2xl:mr-0   lg:w-[500px] xl:w-[450px] 2xl:w-[600px] lg:h-[600px] xl:h-[600px] 2xl:h-[750px] lg:absolute xl:relative !rounded-[700px_900px_600px_900px] "
              >
                {/* <div className='h-full w-full' style={{ background: 'url(./home/home1.png) center center no-repeat', backgroundSize: '100% 100%' }}> </div> */}
                <div
                  id={"balloon5"}
                  className="rounded-[999px_1200px_0px_999px] bg-gradient-to-r from-glacier to-yellowgreenish  w-[170px] xl:w-[200px] 2xl:w-[220px] h-[120px] xl:h-[140px] 2xl:h-[140px] absolute -left-[40px] xl:-left-[20px] 2xl:left-[0px] -bottom-[20px] xl:-bottom-[20px] 2xl:-bottom-[20px] z-10 "
                ></div>
                <div
                  id={"balloon6"}
                  className="rounded-[0px_999px_999px_1200px] bg-[rgba(255,255,255,0.1)]  w-[130px] xl:w-[160px] 2xl:w-[180px] h-[80px] xl:h-[110px] 2xl:h-[120px] absolute -left-[40px] xl:-left-[40px] 2xl:-left-[40px] bottom-[70px] xl:bottom-[80px] 2xl:bottom-[80px] z-10 backdrop-blur-md border border-[#ffffff] drop-shadow-md  "
                ></div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full flex items-center justify-center h-[150px]" />
        <div className="w-screen absolute bottom-0 left-0 h-[400px]  mt-10 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </>
  );
};
