import Button from "../Buttons/Button";

export const AutoCompletePopUp = ({
    createLabel,
    options,
    onSelect,
    preValue,
    setPreValue,
    externalFunction,
    topPosition = `top-[45px]`,
}: {
    createLabel: string;
    options: { label: string }[];
    onSelect: (e: { label: string; value: string; }) => void;
    preValue: string;
    setPreValue: any;
    externalFunction: (e: string) => void;
    topPosition?: string;
}) => {
    return preValue !== "" && (
        <ul className={`absolute ${topPosition} left-[0px] z-10 bg-white-smoke text-black dark:text-white dark:bg-tall-grey rounded-b-[10px] border-r border-l border-b border-cloudy-blue dark:border-grey shadow-2xl max-h-[200px] overflow-auto w-full p-2`}>
            {options
                .filter((f) =>
                    f.label.toLowerCase().includes(preValue.toLowerCase()),
                )
                .map((e:any, i:number) => (
                    <li
                        className="py-2 px-3 cursor-pointer hover:bg-cloudy-blue/25 hover:dark:bg-cloudy-blue/25  rounded-[10px] truncate"
                        key={i}
                        onClick={() => {
                            onSelect(e);
                            setPreValue("");
                        }}
                    >
                        {e.label}
                    </li>
                ))}
            {options.filter((f) =>
                f.label.toLowerCase().includes(preValue.toLowerCase()),
            ).length === 0 && (
                    <li className="py-2 italic text-center">
                        Nenhum resultado encontrado
                    </li>
                )}
            {options.filter((f) =>
                f.label.toLowerCase().includes(preValue.toLowerCase()),
            ).length === 0 && (
                    <Button
                    responsive={false}
                        className="!py-1 !my-1 !w-full"
                        buttonStyle="accent-button"
                        icon={"user-plus"}
                        text={`${createLabel} ${preValue}`}
                        onClick={() => externalFunction(preValue)}
                    />
                )
            }
        </ul>
    );
}
