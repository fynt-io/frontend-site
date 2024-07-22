import { InfoBox } from "./InfoBox"

export const RenderMainInfoBox = ({ text, position }: { text: string, position: "top" | "normal" }) => {
    return <>
      {/* General Box Info Top */}
      {text && position === "top" && <div className=" w-full mb-[25px] mt-[64px] lg:mt-[0px] hidden md:block">
        <InfoBox snackBarMode={false} className="backdrop-blur-lg">
          {text}
        </InfoBox>
      </div>}

      {/* General Box Info Normal */}
      {text && position === "normal" && <div className=" w-full mb-[25px] mt-[64px] lg:mt-[0px]">
        <InfoBox snackBarMode={true} className="backdrop-blur-lg">
          {text}
        </InfoBox>
      </div>}
    </>
  }