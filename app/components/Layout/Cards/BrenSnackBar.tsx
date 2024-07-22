import BrenIcon from "./../Icons/BrenIcon"

export const BrenSnackBar = ({content, colorType, icon}:{content:any, colorType:"success" | "warning" | "error", icon?:string}) => {
  
    let colorSuccess = "dark:border-yellowgreenish bg-glacier/10 dark:bg-yellowgreenish/10 border-glacier text-white";
    let colorWarning = "dark:border-[#FFE791] bg-[#D69828]/10 dark:bg-[#FFE791]/10 border-[#D69828] text-[#D69828] dark:text-[#FFE791]";
    let colorError = "dark:border-bren-red bg-bren-red/10 dark:bg-bren-red/10 border-bren-red text-bren-red";

    let iconSuccess = "checkmark";
    let iconWarning = "warning";
    let iconError = "times";
    
    function GetColorType(){
        if(colorType === "success"){
            return colorSuccess
        }
        if(colorType === "warning"){
            return colorWarning
        }
        return colorError
    }

    function GetIconType(){
        if(colorType === "success"){
            return iconSuccess
        }
        if(colorType === "warning"){
            return iconWarning
        }
        return iconError
    }
    
  return <div className={`${ GetColorType()} border p-5 rounded-xl flex items-center w-full`}>
  <BrenIcon
    icon={icon ? icon : GetIconType()}
    className={` rounded-full aspect-square !h-[30px] !w-[30px] !mr-4`}
  />{" "}
  <span className="dark:text-white text-black">
    {content}
  </span>
</div>
}