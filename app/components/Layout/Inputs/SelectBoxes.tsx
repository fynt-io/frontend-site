import React from 'react';
import BrenIcon from './../Icons/BrenIcon';
import { SendPlatformMessage } from '@/app/Utils/Utils';

export interface SelectBoxesProps {
  title: string;
  value: string;
  description: string;
  icon?: string;
  disabled?: boolean;
}

export const SelectBoxes = ({
  selectBoxes,
  selectedBoxResponse,
  initialValue,
}: {
  selectBoxes: SelectBoxesProps[];
  selectedBoxResponse: any;
  initialValue: string;
}) => {
  const [selectedBox, setSelectedBox] = React.useState<string>(initialValue);

  return (
    <div className={`mt-10 flex flex-col lg:flex-row `}>
      {selectBoxes.map((box, index) => (
        <div
          key={index}
          onClick={() => {if(!box.disabled){
            setSelectedBox(box.value);
            selectedBoxResponse(box.value);
          } else {
            SendPlatformMessage("Opção não disponível no momento.")
          }
          }}
          className={`${box.disabled && `opacity-50`} border border-cloudy-blue/50 ${selectedBox === box.value && 'border-glacier dark:border-yellowgreenish'} p-8 relative rounded-2xl mb-2 mx-2 cursor-pointer text-center min-w-[200px] max-w-[400px]`}
        >
          {!box.disabled && <div
            className={` flex items-center justify-center bg-cloudy-blue/50 ${selectedBox === box.value && 'bg-gradient-primary-horizontal text-white dark:text-black '} rounded-full h-[20px] w-[20px] absolute top-[10px] right-[10px]`}
          >
            {selectedBox === box.value && (
              <BrenIcon
                icon={'checkmark'}
                size="25px"
                stroke={1}
                color="white"
              />
            )}
          </div>}
          {box.icon && (
            <BrenIcon
              icon={box.icon}
              size="50px"
              color="cloudy-blue"
            />
          )}
          <h2 className="font-semibold text-[15px] opacity-100">{box.title}</h2>
          <p className="text-[14px]  opacity-50">{box.description}</p>
        </div>
      ))}
    </div>
  );
};
