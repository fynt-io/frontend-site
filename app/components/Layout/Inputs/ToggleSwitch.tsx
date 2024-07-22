"use client";

import { v4 as uuidv4 } from "uuid";
import React, { useEffect } from "react";

export default function ToggleSwitch({
  label = null,
  id = "",
  checked = false,
  onChange = () => {},
  textSizeLabel = `text-[12px]`,
  margin,
  padding,
}: {
  padding?: string;
  margin?: string;
  label?: string | any;
  id?: string;
  checked: boolean;
  onChange: any;
  textSizeLabel?: string;
}) {
  const [toggleId, setToggleId] = React.useState(id);

  useEffect(() => {
    let uniqueId = id;

    if (!uniqueId) {
      uniqueId = uuidv4();
    }

    setToggleId(uniqueId);
  }, [id]);

  return (
    <div
      className={`flex justify-center ${padding? padding : "px-5"} items-center font-light`}
      id={toggleId}
    >
      <label
        className={`inline-flex   items-center justify-center relative ${label !== null && ""} cursor-pointer`}
      >
        <div className={`${margin? margin: "mr-3"} block relative`}>
          <input
            type="checkbox"
            checked={checked}
            className="sr-only peer !outline-none"
            onChange={onChange}
          />
          <div className="w-[49px] h-[30px] border-[1px] border-cloudy-blue dark:border-cloudy-blue/50 bg-[var(--linkwater) peer-focus:!outline-none  rounded-full  dark:bg-transparent peer-checked:after:translate-x-full peer-checked:after:border-white/50 after:content-[''] after:absolute after:top-[5px] after:left-[3px] after:bg-white  after:dark:bg-white after:border-cloudy-blue after:dark:border-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all  peer-checked:bg-gradient-to-l peer-checked:from-[rgb(var(--gradient4-rgb-end))] peer-checked:border-[0px] peer-checked:to-[rgb(var(--gradient4-rgb-start))]"></div>
        </div>
        {label !== null && (
          <span className={`text-[var(--primary-color)] ${textSizeLabel}`}>
            {label}
          </span>
        )}
      </label>
    </div>
  );
}
