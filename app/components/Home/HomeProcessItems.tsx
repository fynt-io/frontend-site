"use client";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  CarouselContext,
} from "pure-react-carousel";
import BrenIcon from "../Layout/Icons/BrenIcon";
import "pure-react-carousel/dist/react-carousel.es.css";

const carouselData = [
  {
    id: 0,
    title: "1. WhatsApp",
    description:
      "Escolha seu novo número de whatsapp com seu DDD (fornecido pela Bren)",
    img: "./home/home-process-1.svg",
  },
  {
    id: 1,
    title: "2. Treinamento",
    description:
      "Faça o upload o do seu catálogo, condições comerciais e tabela de preços para que a IA aprenda tudo sobre seu negócio.",
    img: "./home/home-process-2.svg",
  },

  {
    id: 2,
    title: "3.  Clientes",
    description:
      "Suba sua base de clientes de forma prática por CSV ou manualmente.",
    img: "./home/home-process-3.svg",
  },

  {
    id: 3,
    title: "4. Acelere suas vendas!",
    description: "Seu time agora tem superpoderes para vender mais",
    img: "./home/home-process-4.svg",
  },
];

const CarroselComponent = ({ slideNumber }: { slideNumber: number }) => {
  return (
    <div className="w-full relative ">
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={4}
        visibleSlides={slideNumber}
        touchEnabled={false}
        dragEnabled={false}
        disableKeyboard={true}
        className="[&>div>div>div>div>div>div]:!outline-none !h-[440px] !relative "
      >
        <Slider className="!h-full">
          {carouselData.map((c, i) => (
            <Slide key={i} index={c.id} className="!overflow-visible group  ">
              <div className="w-[100%] flex flex-col items-center text-center justify-center">
                <img
                  src={c.img}
                  alt={c.title}
                  className="dark:invert dark:hue-rotate-[175deg]  w-[200px] p-2 group group-hover:scale-[105%] transition duration-100"
                />
                <div className="mt-3 h-9 w-9  accent-gradient4 flex rounded-full flex items-center justify-center mt-[25px] mb-[15px] z-[1]">
                  <div className=" h-7 w-7 drop-shadow-lg  bg-white dark:bg-tall-grey flex rounded-full items-center justify-center ">
                    <div className=" h-5 w-5  bg-gradient-primary-horizontal flex rounded-full "></div>
                  </div>
                </div>
                <h2 className="font-semibold text-[17px] !leading-[20px] mb-[15px]">
                  {c.title}
                </h2>
                <p className=" leading-[20px] text-center max-w-[200px] px-2 font-light">
                  {c.description}
                </p>
              </div>
              {i === 0 && (
                <div className="z-[0] left-[50%] w-[calc(300%)] h-[5px] bg-cloudy-blue dark:bg-grey rounded-full absolute  top-[242px]"></div>
              )}
            </Slide>
          ))}
        </Slider>
        {slideNumber < 4 && (
          <ButtonBack className="absolute top-[110px] left-[15px]">
            <BrenIcon icon={"chevron-left"} color="inherit" />
          </ButtonBack>
        )}
        {slideNumber < 4 && (
          <ButtonNext className="absolute top-[110px] right-[15px]">
            <BrenIcon icon={"chevron-right"} color="inherit" />
          </ButtonNext>
        )}
      </CarouselProvider>
    </div>
  );
};

export default function HomeKeyFeatures() {
  return (
    <div className="w-full h-auto h-[300px] md:h-[400px] lg:h-[500px] flex flex-col pt-10  z-[1]">
      {/* CELULARES  */}
      <div className="h-auto !block lg:!hidden xl:!hidden z-[1]">
        <CarroselComponent slideNumber={1} />
      </div>
      {/* TABLETS  */}
      <div className="!hidden lg:!block xl:!hidden !h-full !mt-[20px] z-[1]">
        <CarroselComponent slideNumber={2} />
      </div>
      {/* DESKTOP  */}
      <div className="!hidden lg:!hidden xl:!block !h-full !mt-[20px] z-[1]">
        <CarroselComponent slideNumber={4} />
      </div>
    </div>
  );
}
