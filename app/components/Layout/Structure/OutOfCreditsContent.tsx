import BrenIcon from "../Icons/BrenIcon"
import Button from "../Buttons/Button"

export const OutOfCreditsContent = ({closeThisWarning}:{closeThisWarning:any}) => {
    return <div className="flex flex-col items-center justify-center mb-10 ">
                            <BrenIcon
                                icon="balloon-plus"
                                size="100px"
                                className="!text-[#ffffff]"
                            />
                            <h1 className="font-light text-[30px]">
                                Seus créditos acabaram.
                            </h1>
                            <p className="mb-10 font-light text-[14px] md:text-[16px] px-10 max-w-[550px] text-center mt-5 ">
                                Para iniciar novas conversas,
                                contrate um pacote de créditos adicionais agora mesmo.
                            </p>
                            <div className="w-full flex items-center justify-center ">
                                <Button
                                    iconOnTheLeft
                                    responsive={false}
                                    text="Voltar"
                                    buttonStyle="tertiary-button"
                                    onClick={closeThisWarning}
                                    icon={"arrow-left"}
                                    className=" md:hidden mr-4 flex"
                                />
                                <Button
                                    responsive={false}
                                    text="Contratar"
                                    buttonStyle="accent-button"
                                    url={"/platform/conta?section=creditos"}
                                    icon={"plus"}
                                />
                            </div>
                        </div>
}