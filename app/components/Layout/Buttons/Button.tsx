import React, { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import BrenIcon from "./../Icons/BrenIcon";

interface ButtonProps {
  id?: string;
  url?: string | null;
  responsive?: boolean;
  text?: any;
  className?: string;
  square?: boolean;
  disabled?: boolean;
  buttonStyle?: string;
  icon?: string | null;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  width?: string | null;
  height?: string | null;
  padding?: string | null;
  color?: string | null;
  textColor?: string | null;
  responsiveSquare?: boolean;
  iconOnTheLeft?: boolean;
  target?: string;
  iconImage?: string;
}

const Button: React.FC<ButtonProps> = ({
  id = "",
  url = null,
  responsive = true,
  text = "",
  className = "",
  square = false,
  disabled = false,
  buttonStyle = "primary-button",
  icon = null,
  onClick = () => {},
  width = null,
  height = null,
  padding = "10px",
  color = null,
  textColor = null,
  responsiveSquare = false,
  iconOnTheLeft = false,
  iconImage = null,
  target = "",
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (url !== null) {
      if (target === "_blank") {
        window.open(url, "_blank");
      } else {
        router.push(url);
      }
    } else {
      onClick(e);
    }
  };

  const RenderContent = () => {
    return (
      <div className="flex items-center">
        {iconOnTheLeft && icon !== null && (
          <BrenIcon icon={icon} color="inherit" className="!mr-3" />
        )}
        {iconOnTheLeft && iconImage !== null && (
          <img src={iconImage} className="mr-3  !h-[23px] !w-auto" alt="icon"/>
        )}
        <span
          className={` ${square ? "pr-0" : "pr-1"} ${responsive ? "xl:inline" : "xl:inline"} font-bold whitespace-nowrap`}
        >
          {text}
        </span>
        {!iconOnTheLeft && icon !== null && (
          <BrenIcon icon={icon} color="inherit" />
        )}
        {!iconOnTheLeft && iconImage !== null && (
          <img src={iconImage} className="ml-3 !h-[23px] !w-auto" alt="icon"/>
        )}
      </div>
    );
  };

  return (
    <div className={disabled ? "opacity-25" : "cursor-pointer"}>
      {buttonStyle === "accent-button-yellow-greenish" && (
        <button
        id={id}
          disabled={disabled}
          onClick={handleClick}
          className={`!px-5 py-3 rounded-full bg-bren-gradient-2  text-black flex items-center justify-center overflow-hidden text-[14px] ${
            responsiveSquare
              ? "aspect-square xl:aspect-auto scale-75 xl:scale-100"
              : ""
          } ${buttonStyle} ${className} ${square ? "!aspect-square !w-[50px] !h-[50px]" : ""}`}
          style={{
            height: height !== null ? height : "auto",
            width: width !== null ? width : "auto",
            backgroundColor: color !== null ? color : "",
            color: textColor !== null ? textColor : "",
          }}
        >
          <RenderContent />
        </button>
      )}

      {buttonStyle === "primary-button" && (
        <button
        id={id}
          disabled={disabled}
          onClick={handleClick}
          className={`!px-5 py-3 bg-black dark:bg-white rounded-full text-white dark:text-black flex items-center justify-center overflow-hidden text-[14px] ${
            responsiveSquare
              ? "aspect-square xl:aspect-auto scale-75 xl:scale-100"
              : ""
          } ${buttonStyle} ${className} ${square ? "!aspect-square !w-[50px] !h-[50px]" : ""}`}
          style={{
            height: height !== null ? height : "auto",
            width: width !== null ? width : "auto",
            backgroundColor: color !== null ? color : "",
            color: textColor !== null ? textColor : "",
          }}
        >
          <RenderContent />
        </button>
      )}

      {buttonStyle === "secondary-button" && (
        <button
          id={id}
          disabled={disabled}
          onClick={handleClick}
          className={`!px-5 py-3 bg-white dark:bg-black rounded-full text-black dark:text-white flex items-center justify-center overflow-hidden text-[14px] ${
            responsiveSquare
              ? "aspect-square xl:aspect-auto scale-75 xl:scale-100"
              : ""
          } ${buttonStyle} ${className} ${square ? "!aspect-square !w-[50px] !h-[50px]" : ""}`}
          style={{
            height: height !== null ? height : "auto",
            width: width !== null ? width : "auto",
            backgroundColor: color !== null ? color : "",
            color: textColor !== null ? textColor : "",
          }}
        >
          <RenderContent />
        </button>
      )}

      {buttonStyle === "tertiary-button" && (
        <button
          id={id}
          disabled={disabled}
          onClick={handleClick}
          className={`!px-5 py-3 rounded-full text-black dark:text-white border border-black dark:border-white flex items-center justify-center overflow-hidden text-[14px] ${
            responsiveSquare
              ? "aspect-square xl:aspect-auto scale-75 xl:scale-100"
              : ""
          } ${buttonStyle} ${className} ${square ? "!aspect-square !w-[50px] !h-[50px]" : ""}`}
          style={{
            height: height !== null ? height : "auto",
            width: width !== null ? width : "auto",
            backgroundColor: color !== null ? color : "",
            color: textColor !== null ? textColor : "",
          }}
        >
          <RenderContent />
        </button>
      )}

      {buttonStyle === "accent-button" && (
        <button
          id={id}
          disabled={disabled}
          onClick={handleClick}
          className={`!px-5 py-3 rounded-full text-black ${color ? color : "bg-gradient-primary-horizontal"} text-white dark:text-${textColor ? textColor : "black"} flex items-center justify-center overflow-hidden text-[14px] ${
            responsiveSquare
              ? "aspect-square xl:aspect-auto scale-75 xl:scale-100"
              : ""
          } ${buttonStyle} ${className} ${square ? "!aspect-square !w-[50px] !h-[50px]" : ""}`}
          style={{
            height: height !== null ? height : "auto",
            width: width !== null ? width : "auto",
            backgroundColor: color !== null ? color : "",
            color: textColor !== null ? textColor : "",
          }}
        >
          <RenderContent />
        </button>
      )}

      {buttonStyle === "accent-border-button" && (
        <button
          id={id}
          disabled={disabled}
          onClick={handleClick}
          className={`!px-5 py-3 rounded-full border bg-cloudy-blue/10  dark:text-yellowgreenish border-glacier dark:border-yellowgreenish text-black  flex items-center justify-center overflow-hidden text-[14px] ${
            responsiveSquare
              ? "aspect-square xl:aspect-auto scale-75 xl:scale-100"
              : ""
          } ${buttonStyle} ${className} ${square ? "!aspect-square !w-[50px] !h-[50px]" : ""}`}
          style={{
            height: height !== null ? height : "auto",
            width: width !== null ? width : "auto",
            backgroundColor: color !== null ? color : "",
            color: textColor !== null ? textColor : "",
          }}
        >
          <RenderContent />
        </button>
      )}


{buttonStyle === "remove-button" && (
        <button
          id={id}
          disabled={disabled}
          onClick={handleClick}
          className={`!px-5 py-3 rounded-full  bg-bren-red  text-white  flex items-center justify-center overflow-hidden text-[14px] ${
            responsiveSquare
              ? "aspect-square xl:aspect-auto scale-75 xl:scale-100"
              : ""
          } ${buttonStyle} ${className} ${square ? "!aspect-square !w-[50px] !h-[50px]" : ""}`}
          style={{
            height: height !== null ? height : "auto",
            width: width !== null ? width : "auto",
            backgroundColor: color !== null ? color : "",
            color: textColor !== null ? textColor : "",
          }}
        >
          <RenderContent />
        </button>
      )}
    </div>
  );
};

export default Button;
