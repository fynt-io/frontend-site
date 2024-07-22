import { Tooltip } from "react-tooltip";
import BrenIcon from "./../Icons/BrenIcon";

export const IconButton = ({ id, onClick, icon, tooltip, type = "medium", isAccent }: { id?:string; onClick: any; icon: string; tooltip?: string | undefined; type?: string, isAccent?: boolean }) => {
    const uniqueId=id ? id : "u_" + Math.random().toString(36).substring(7);

    const sizeList = [
        { name: "small", className: "h-[30px] w-[30px]", iconSize: "17px" },
        { name: "medium", className: "h-[40px] w-[40px]", iconSize: "23px" },
        { name: "large", className: "h-[45px] w-[45px]", iconSize: "25px" },
    ];

    return (
        <div className="relative">
            <div
                className={`
                    hover:scale-[110%] transition flex cursor-pointer aspect-square items-center justify-center  rounded-full ${uniqueId}
                    ${isAccent ? "bg-gradient-primary-horizontal dark:text-black text-white" : "bg-white dark:border-transparent border border-bren-blue-200 shadow-sm dark:bg-dark-grey"}
                    ${sizeList.find(size => size.name === type)?.className}
                `}
                onClick={onClick}
            >
                <BrenIcon icon={icon} color="inherit" size={sizeList.find(size => size.name === type)?.iconSize} />
            </div>
            {tooltip && <Tooltip anchorSelect={"."+uniqueId} place="top" className="!rounded-xl ">
                <span className="text-[12px]">{tooltip}</span>
            </Tooltip>}
        </div>
    );
};

