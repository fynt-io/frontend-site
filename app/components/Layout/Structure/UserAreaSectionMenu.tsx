import BrenIcon from "../Icons/BrenIcon";
import { Card } from "../Cards/Card";
import { LoggedOut } from "@/app/Utils/Utils";
import { ThemeSwitcher } from "./../Inputs/ThemeSwitcher";
import { useEffect, useState } from "react";
import SpinnerLoading from "../Loading/SpinnerLoading";
import { useRouter } from "next/navigation";
import { Seller } from "@/app/api/callers/seller";
import { Collaborator } from "@/app/api/callers/collaborator";
import { logout } from "@/app/api/callers/authentication";

interface UserMenuOption {
    icon: string;
    title: string;
    onClick: () => void;
}

    {/* User Logo */}
    const RenderUserLogo = ({ largeIcon, setShowUserOptions, empresa }: { largeIcon: boolean, setShowUserOptions:any, empresa:Seller }) => {
        return <>
            <div onClick={() =>  setShowUserOptions(true)} className={`aspect-square bg-gradient-primary-vertical rounded-full ${largeIcon ? ` mr-0 h-[38px] w-[38px] !min-w-[38px]` : `mr-[4px] h-[25px] w-[25px] !min-w-[25px] `}  flex items-center justify-center`}>
                <div className={` aspect-square ${largeIcon ? `!min-w-[35px] lg:!min-w-[35px] h-[35px] w-[35px] lg:h-[35px] lg:w-[35px]` : ` !min-w-[23px] h-[23px] w-[23px] `} bg-white dark:bg-dark-grey rounded-full overflow-hidden flex items-center justify-center`}>
                    {empresa?.representant_image ? (
                        <img alt="logo" className="aspect-square" src={empresa?.representant_image} />
                    ) : (
                        <BrenIcon
                            icon="user"
                            color="inherit"
                            className={`!text-[25px] md:!text-[20px]`}
                        />
                    )} </div>
            </div>
        </>
    }


export const UserAreaSectionMenu = (
    { user, empresa, sidebarIsContracted, sidebarIsOpen }:
        { user: Collaborator, empresa: Seller, sidebarIsContracted: boolean, sidebarIsOpen: boolean }) => {
    const [showUserOptions, setShowUserOptions] = useState(false);
    const router = useRouter();
    const [hovered, setHovered] = useState(false);


    //close user options modal with esc key
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setShowUserOptions(false);
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, []);



    const USER_MENU_OPTIONS: UserMenuOption[] = [
        { icon: "user", title: "Minha Conta", onClick: () => router.push("/platform/conta") },
        { icon: "enter", title: "Sair", onClick: () => logout() },
    ];



    {/* User Options Modal */}
    const RenderUserMenuOption = ({ option }: { option: UserMenuOption }) => {

        return (
            <div
                onClick={option.onClick}
                className=" hover:bg-bren-blue-100 opacity-50 hover:opacity-100 hover:dark:bg-grey/25 gap-2 justify-start p-2  flex cursor-pointer text-[15px] w-full rounded-lg items-center"
            >
                <BrenIcon icon={option.icon} color="inherit" className="opacity-50 " />{" "}
                <span>{option.title}</span>
            </div>
        );
    }

    return <>
        {/* User Options Modal */}
        {showUserOptions && (
            <div
                onClick={() => !hovered && setShowUserOptions(false)}
                id={"userOptionsArea"} className="left-0 lg:left-0 fixed w-screen h-screen bg-[#000000]/50 loadcomponent  top-0 z-[5] ">
                <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    id={"userOptionsModal"} className={`w-[280px] ml-[40px]  absolute bottom-[100px]`}>
                    <Card removeAddon className="!p-4">
                        <div className="flex flex-col w-full">
                            <div className="flex justify-between items-center w-full px-3 pt-3">
                                <div className="flex items-center justify-center gap-1 ">
                                    <RenderUserLogo largeIcon={false} setShowUserOptions={setShowUserOptions} empresa={empresa} />
                                    {user.first_name}
                                </div>
                                <div className="scale-75">
                                    <ThemeSwitcher />
                                </div>
                            </div>
                            <div className="flex flex-col mt-4">
                                {USER_MENU_OPTIONS.map((option: UserMenuOption, index) => (
                                    <RenderUserMenuOption key={index} option={option} />
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )}

        {/* User Section */}
        <div 
        className={`w-full flex items-center justify-center `} onClick={() => user.first_name && setShowUserOptions(true)}>
            <div className={`${user.first_name && `cursor-pointer`} text-[13px] ${!sidebarIsOpen && sidebarIsContracted ? `lg:mx-0 lg:rounded-full lg:p-2 lg:!min-h-10 lg:!min-w-10 lg:aspect-square` : `border border-cloudy-blue dark:border-medium-grey`} mx-[40px] rounded-2xl mb-5 p-3   h-[50px] min-h-[50px]  flex   relative  items-center justify-between  w-full `}
            >
                {user.first_name && (
                    <span className="loadComponent flex items-center justify-between w-full ">
                        <div className="w-full flex items-center justify-center  ">
                            <RenderUserLogo largeIcon={!sidebarIsOpen && sidebarIsContracted} setShowUserOptions={setShowUserOptions} empresa={empresa} />
                            <div className={`max-w-[140px] flex  w-full text-left truncate  ${!sidebarIsOpen && sidebarIsContracted && `lg:hidden`}  `}>
                                <div className="truncate ml-1">{user.first_name}</div>
                            </div>
                            <BrenIcon
                                icon={!showUserOptions ? "chevron-down" : "chevron-up"}
                                color="inherit"
                                size="20px"
                                className={`${!sidebarIsOpen && sidebarIsContracted ? `!hidden` : `!flex`}`}
                            />
                        </div>
                    </span>
                )}
                {!user.first_name && (
                    <>
                        <SpinnerLoading />
                    </>
                )}
            </div>
        </div>
    </>
}