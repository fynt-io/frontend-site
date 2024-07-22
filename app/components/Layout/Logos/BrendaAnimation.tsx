import { useEffect, useState } from "react";

const brandaVectorPath = "/Brenda/brenda-vector_light.svg"
const brandaVectorPathDark = "/Brenda/brenda-vector.svg"

export const BrendaAnimation = () => {
    const [vector1Position, setVector1Position] = useState<number>(0);
    const [vector2Position, setVector2Position] = useState<number>(0);
    const [vector3Position, setVector3Position] = useState<number>(0);
    const [speed, setSpeed] = useState<number>(2000);

    const randomizePosition = () => {
        setVector1Position(Math.random()*150);
        setVector2Position(Math.random()*150);
        setVector3Position(Math.random()*150);
    }

    useEffect(() => {
        randomizePosition();

        const interval = setInterval(() => {
            randomizePosition();
        }, speed);
        return () => clearInterval(interval);
    }   ,[])

    return (<>
    <div onMouseDown={(e:any) => {e.preventDefault()}} className="  w-[100px] h-[100px] bg-gradient-primary-vertical rounded-3xl overflow-hidden rotate-45 inline-flex items-center justify-center relative">
    <div className="!w-[1000px] h-[auto] -rotate-45 absolute flex items-center justify-center dark:mix-blend-normal mix-blend-overlay  ">
        <img className="dark:hidden inline" src={brandaVectorPath} alt="brenda" style={{transition:(speed/1000)+"s",transform:`translateX(${vector3Position}px)`, transitionTimingFunction:"ease-in-out"}} />
        <img className="dark:inline hidden" src={brandaVectorPathDark} alt="brenda" style={{transition:(speed/1000)+"s",transform:`translateX(${vector3Position}px)`, transitionTimingFunction:"ease-in-out"}} />
        </div>
        <div className="!w-[1000px] h-[auto] -rotate-45 absolute flex items-center justify-center mix-blend-overlay ">
        <img className="dark:hidden inline" src={brandaVectorPath} alt="brenda" style={{transition:(speed/1000)+"s", transform:`translateX(${vector1Position}px)`, transitionTimingFunction:"ease-in-out"}} />
        <img className="dark:inline hidden" src={brandaVectorPathDark} alt="brenda" style={{transition:(speed/1000)+"s", transform:`translateX(${vector1Position}px)`, transitionTimingFunction:"ease-in-out"}} />
        </div>
        <div className="!w-[1000px] h-[auto] -rotate-45 absolute flex items-center justify-center dark:mix-blend-multiply mix-blend-overlay">
        <img className="dark:hidden inline" src={brandaVectorPath} alt="brenda" style={{transition:(speed/1000)+"s",transform:`translateX(${vector2Position}px)`, transitionTimingFunction:"ease-in-out"}} />
        <img className="dark:inline hidden" src={brandaVectorPathDark} alt="brenda" style={{transition:(speed/1000)+"s",transform:`translateX(${vector2Position}px)`, transitionTimingFunction:"ease-in-out"}} />
        </div>

    </div>
    </>)
}