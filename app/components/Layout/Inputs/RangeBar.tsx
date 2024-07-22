import React from "react";

export const RangeBar = ({
  value,
  setValue,
  min,
  max,
  step,
  onChange,
}: {
  value: number;
  setValue?: (e: number) => void;
  min: number;
  max: number;
  step: number;
  onChange?: (e: number) => void;
}) => {
  const [rangeValue, setRangeValue] = React.useState(value);

  async function handleRangeMouseDown(e: any) {
    setRangeValue(e.target.value);
    setValue && setValue(e.target.value);
  }

  return (
    <div className="flex items-center justify-between w-full cursor-grab " >
      <div className="flex relative w-full cursor-grab">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={rangeValue}
          onChange={(e: any) => {
            setRangeValue(e.target.value);
            onChange && onChange(e.target.value);
          }}
          onMouseUp={handleRangeMouseDown}
          className=" w-full h-3 bg-transparent rounded-full appearance-none cursor-grab z-[2] !range-[120px] 
                
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:-mt-0.5
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_#72B1C7]
                [&::-webkit-slider-thumb]:dark:shadow-[0_0_0_4px_#d1dab0]
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:duration-150
                [&::-webkit-slider-thumb]:ease-in-out
                [&::-webkit-slider-thumb]:dark:bg-dark-grey

                [&::-moz-range-thumb]:w-5
                [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:appearance-none
                [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:dark:bg-dark-grey
                [&::-moz-range-thumb]:border-4
                [&::-moz-range-thumb]:border-gradient-primary-horizontal 
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:transition-all
                [&::-moz-range-thumb]:duration-150
                [&::-moz-range-thumb]:ease-in-out
                "
        />

        <div className="h-3 dark:bg-black/25 bg-cloudy-blue/50 rounded-full left-0 absolute w-full  overflow-hidden">
          <div
            className="h-3 relative w-full bg-gradient-primary-horizontal rounded-l-full "
            style={{ width: `${((rangeValue - min) / (max - min)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
