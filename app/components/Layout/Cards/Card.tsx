import React from "react";
import BrenIcon from "./../Icons/BrenIcon";
import Button from "./../Buttons/Button";
import SpinnerLoading from "../Loading/SpinnerLoading";
import { InfoBox } from "./../InfoBox/InfoBox";

export const Card = ({
  children,
  removeAddon,
  isInvisible = false,
  className,
  removeAnimation = false,
}: {
  children: any;
  removeAddon?: boolean;
  isInvisible?: boolean;
  className?: string;
  removeAnimation?: boolean;
}) => {
  return (
    <div
      className={`w-full p-8 rounded-2xl flex ${removeAnimation ? `` : `loadComponent`}  ${!isInvisible && `bg-white dark:bg-dark-grey drop-shadow-sm`} overflow-hidden relative ${className}`}
    >
      {!removeAddon && !isInvisible && (
        <div className="w-[120px] rounded-bl-full rounded-tr-full absolute right-0 top-0 h-2 bg-gradient-primary-horizontal"></div>
      )}
      <div className="flex w-full flex-col">{children}</div>
    </div>
  );
};

export const ExpansiveCard = ({
  children,
  title,
  removeAddon,
  className,
  initiallyOpen,
  icon = "",
  isLoading,
  rightSideElement,
  infoBox,
  childrenPadding = "p-7",
  removeTitleOnClick = false,
  expansible = true
}: {
  children: any;
  title?: string | any;
  removeAddon?: boolean;
  className?: string;
  initiallyOpen?: boolean;
  icon?: string;
  isLoading?: boolean;
  rightSideElement?: any;
  infoBox?: any;
  childrenPadding?: string;
  removeTitleOnClick?: boolean;
  expansible?: boolean;
}) => {
  const [isOpen, setIsOpen] = React.useState(
    initiallyOpen ? initiallyOpen : false,
  );
  return !isLoading ? (
    <div
      className={`w-full rounded-2xl flex loadComponent bg-white dark:bg-dark-grey drop-shadow-sm overflow-hidden relative ${className}`}
    >
      {!removeAddon && (
        <div className="w-[120px] rounded-bl-full rounded-tr-full absolute right-0 top-0 h-2 bg-gradient-primary-horizontal"></div>
      )}
      <div className="flex w-full flex-col">
        <div
          className={` ${!isOpen ? `p-7` : `p-7 pb-5 border-b border-cloudy-blue/25 dark:border-white/10`} flex items-center justify-between w-full `}
        >
          <div
            className="flex items-center cursor-pointer"
            onClick={() => !removeTitleOnClick && setIsOpen(!isOpen)}
          >
            {icon && <BrenIcon icon={icon} className="!mr-3 opacity-50" />}
            <div className="opacity-100 font-semibold text-[17px]">{title}</div>
          </div>
          <div className="flex items-center">
            {rightSideElement}
            {expansible && <div
              className={`flex items-center ml-5 justify-center rounded-full w-8 h-8 aspect-square ${!isOpen ? `bg-cloudy-blue/25 dark:bg-medium-grey/50` : `bg-cloudy-blue !text-white dark:bg-black/50`}`}
            >
              <BrenIcon
                icon={isOpen ? "chevron-up" : "chevron-down"}
                size="20px"
                stroke={1}
                className=" pt-1 cursor-pointer ml-auto"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>}
          </div>
        </div>
        {isOpen && (
          <>
            {infoBox && (
              <InfoBox className="rounded-none p-7 ">{infoBox}</InfoBox>
            )}
            <div className={` ${childrenPadding} ${childrenPadding === 'p-0' ? '' : 'pt-5'}  loadComponent`}>{children}</div>
          </>
        )}
      </div>
    </div>
  ) : (
    <div className="loadComponent">
      <div
        className={`animate-pulse  w-full rounded-2xl flex  bg-white dark:bg-dark-grey drop-shadow-sm overflow-hidden relative ${className}`}
      >
        <div
          className={`p-7 flex items-center justify-between w-full cursor-pointer`}
        >
          <div className="flex items-start justify-start h-full">
            <div className="p-4 dark:bg-medium-grey/50 bg-cloudy-blue/25 rounded-xl"></div>{" "}
            <div className="p-4 w-[130px] ml-2 dark:bg-medium-grey/50 bg-cloudy-blue/25 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditableCard = ({
  id,
  children,
  title,
  description,
  value,
  removeAddon = true,
  isInvisible = false,
  isValid,
  className,
  saveFunction,
  initiallyOpen,
  showButtons = true,
  fixedOpenState = false,
  headerButton = null,
  bgColor = "bg-white dark:bg-dark-grey drop-shadow-sm",
  clicked = () => {},
}: {
  id?: string;
  children: any;
  title?: string;
  description?: string;
  value?: string;
  removeAddon?: boolean;
  isInvisible?: boolean;
  isValid?: boolean | null;
  className?: string;
  saveFunction?: any;
  initiallyOpen?: boolean;
  showButtons?: boolean;
  fixedOpenState?: boolean;
  headerButton?: any;
  bgColor?: string;
  clicked?: any;
}) => {
  const [isOpen, setIsOpen] = React.useState(
    initiallyOpen ? initiallyOpen : false,
  );
  const [isLoading, setIsLoading] = React.useState(false);

  async function saveFunctionHandle() {
    setIsLoading(true);
    await saveFunction();
    setIsLoading(false);
    if (!fixedOpenState) {
      setIsOpen(false);
    }
  }

  return (
    <div
      id={id}
      style={{ transition: "0.1s" }}
      className={`${isLoading ? "animate-pulse" : !fixedOpenState && "loadComponent"}  w-full p-10 rounded-2xl flex  ${!isInvisible && bgColor} overflow-hidden relative ${className}`}
    >
      {!isLoading ? (
        <>
          {!removeAddon && !isInvisible && (
            <div className="w-[120px] rounded-bl-full rounded-tr-full absolute right-0 top-0 h-2 bg-gradient-primary-horizontal"></div>
          )}
          <div className="flex flex-col w-full ">
            <div
              className="flex items-center justify-between w-full cursor-pointer"
              onClick={() => setIsOpen(!fixedOpenState ? !isOpen : isOpen)}
            >
              <div className="flex items-center">
                {isValid !== null && (
                  <div>
                    {isValid ? (
                      <div className="mr-4 !w-8 !h-8  !aspect-square rounded-full border-2 flex items-center justify-center border-glacier dark:border-yellowgreenish">
                        <BrenIcon
                          icon="checkmark"
                          className="dark:!text-yellowgreenish !text-glacier"
                          stroke={1}
                        />
                      </div>
                    ) : (
                      <div className="mr-4 !w-8 !h-8  !aspect-square rounded-full border-2 flex items-center justify-center border-[orange] dark:border-yellow">
                        <span className="text-[orange] dark:text-yellow">
                          !
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <div>
                  <h2 className="opacity-100 font-semibold">{title}</h2>
                  <p className="font-regular opacity-50">
                    {isOpen
                      ? description
                      : typeof value === "string" &&
                          value &&
                          value.charAt(0).toUpperCase() + value.slice(1)
                        ? value.charAt(0).toUpperCase() + value.slice(1)
                        : description}
                  </p>
                </div>
              </div>
              <div>
                {headerButton && headerButton}
                {!fixedOpenState && (
                  <div
                    className={`flex items-center justify-center rounded-full w-8 h-8 aspect-square ${!isOpen ? `bg-cloudy-blue/25 dark:bg-medium-grey/50` : `bg-cloudy-blue !text-white dark:bg-black/50`}`}
                  >
                    <BrenIcon
                      icon={isOpen ? "chevron-up" : "chevron-down"}
                      size="20px"
                      stroke={1}
                      className=" pt-1 cursor-pointer ml-auto"
                      onClick={() => setIsOpen(!isOpen)}
                    />
                  </div>
                )}
              </div>
            </div>
            {isOpen && (
              <div>
                <div className={`${!fixedOpenState && "loadComponent"} flex w-full flex-col mt-5 `}>
                  {children}
                  {showButtons && (
                    <div
                      className={`flex w-full justify-between items-center mt-10`}
                    >
                      {fixedOpenState ? (
                        <div></div>
                      ) : (
                        <Button
                          text="Cancelar"
                          buttonStyle="tertiary-button"
                          iconOnTheLeft
                          icon="times"
                          onClick={() => {
                            setIsOpen(false);
                            clicked();
                          }}
                          className="!p-1"
                          responsive={false}
                        />
                      )}
                      <Button
                        text="Salvar"
                        buttonStyle="accent-button"
                        icon="checkmark"
                        className="!p-1"
                        responsive={false}
                        onClick={saveFunctionHandle}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="loadComponent">
            <SpinnerLoading />
          </div>
        </div>
      )}
    </div>
  );
};
