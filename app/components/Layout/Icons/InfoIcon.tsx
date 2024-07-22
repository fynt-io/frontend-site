import { Tooltip } from "react-tooltip"
import BrenIcon from "./../Icons/BrenIcon"

export const InfoIcon = ({ text = '', icon="info", IconclassName } : {text:string, icon?:string, IconclassName?:string}) => {
    const id = 'info-' + (Math.random() * (999 - 0) + 0).toFixed(0) + '-icon-' + (Math.random() * (999 - 0) + 0).toFixed(0);

    return <span className={`${id} cursor-default inline-flex !w-auto items-center justify-center `}>
        <BrenIcon icon={icon}  className={`opacity-50 !text-[25px] ${IconclassName}`} />
        <Tooltip
            anchorSelect={`.${id}`}
            place="right"
            noArrow
            className="z-[3] !rounded-2xl border border-grey/50"
        >
            <span className={`max-w-[200px] block `}>
                {text}
            </span>
        </Tooltip>
    </span>
}