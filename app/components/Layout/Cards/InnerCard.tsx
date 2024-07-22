import React from "react";
export const InnerCard = ({
  id,
  children,
  className,
  growOnHover = false,
  hoverEffect = false,
  onClick = () => {},
}: {
  id?: string;
  children?: any;
  className?: string;
  growOnHover?: boolean;
    hoverEffect?: boolean;
    onClick?: any;
}) => {
  return (
    <div id={id} onClick={onClick} className={`${growOnHover && `hover:scale-[101%] transition duration-100`}  relative w-full flex bg-cloudy-blue/20 ${hoverEffect && `hover:bg-cloudy-blue/30 hover:dark:bg-grey/50 cursor-pointer`} p-7 border border-cloudy-blue/25 dark:border-transparent dark:bg-grey/25 rounded-2xl items-center flex-col lg:flex-row mb-2 ${className}`}>
    {children}
    </div>
  );
};