import React from "react";
import Button from "./../Buttons/Button";
import BrenIcon from "./../Icons/BrenIcon";

export const CircularGroupButton = ({
  icon = "plus",
  options,
  color,
  textColor,
  top,
  right,
  arrowPosition,
  className = "!w-[43px] !h-[43px]",
  noGroup,
  noGroupAction,
  text = "",
  square = true,
  responsiveSquare = true,
}: {
  arrowPosition?: string;
  right?: string;
  top?: string;
  textColor?: string;
  color?: string;
  icon?: string;
  className?: string;
  options?: Array<{ name: string; icon?: string; action?: any }>;
  noGroup?: boolean;
  noGroupAction?: any;
  text?: string;
  square?: boolean;
  responsiveSquare?: boolean;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="">
      <div
        ref={modalRef}
        className="relative top-0 right-0 flex items-center h-[50px] "
      >
        {isOpen && (
          <div
            className={`loadComponent !z-[200] absolute w-[200px] p-3 ${top ? `top-[0rem]` : "top-0"} ${right ? right : "right-20"} dark:bg-tall-grey bg-white border border-cloudy-blue dark:border-grey/50 shadow-lg rounded-2xl`}
          >
            <div
              className={`absolute -right-[10px] top-[calc(${arrowPosition}-10px)] w-[20px] h-[20px] bg-white border-r border-t border-cloudy-blue dark:border-grey/50 dark:bg-tall-grey rounded-tr-lg  transform rotate-45`}
            ></div>
            {options &&
              options.map((option, index) => (
                <div
                  className="flex items-center p-4 dark:bg-black/20  dark:hover:bg-black/40 bg-cloudy-blue/25 hover:bg-cloudy-blue/50 rounded-xl mb-1 relative z-[1] cursor-pointer hover:scale-[102%]"
                  key={index}
                  onClick={() => {
                    option.action();
                    setIsOpen(false);
                  }}
                >
                  {option.icon && (
                    <BrenIcon
                      icon={option.icon}
                      className="!mr-3 text-glacier dark:text-yellowgreenish"
                      size="28px"
                    />
                  )}
                  <span>{option.name}</span>
                </div>
              ))}
          </div>
        )}
        <Button
          icon={icon}
          text={isHovered ? text : ""}
          buttonStyle="accent-button"
          color={color}
          textColor={textColor}
          square={square}
          responsiveSquare={responsiveSquare}
          className={`${className} ${responsiveSquare??"aspect-square"} z-[10] relative flex items-center justify-center !p-0 ${isOpen ? "shadow-[0px_0px_10px] shadow-yellowgreenish/50" : "opacity-100"} ${isHovered ? "w-auto px-4" : ""}`}
          onClick={() => {
            if(noGroup){
              noGroupAction()
            }else{
              setIsOpen(!isOpen);
            }
          }}
        />
      </div>
    </div>
  );
};
