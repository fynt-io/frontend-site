import BrenIcon from "./BrenIcon";

export const ValidationIcon = ({ validation }: { validation: boolean }) => {
    return validation ? (
      <div className="scale-[75%] w-[30px] h-[30px] !text-white bg-[#729267] rounded-full flex items-center justify-center">
        <BrenIcon icon="checkmark" stroke={1} size="30px" />
      </div>
    ) : (
      <div className="scale-[75%] w-[30px] h-[30px] dark:bg-yellow bg-[orange] rounded-full flex items-center justify-center font-semibold !text-black">
        !
      </div>
    );
  };