import React, { useState, useEffect, useRef } from "react";
import BrenIcon from "./../Icons/BrenIcon";
import { MultiSelect } from "react-multi-select-component";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { InfoBox } from "./../InfoBox/InfoBox";
import Button from "./../Buttons/Button";
import SpinnerLoading from "../Loading/SpinnerLoading";
import {TimePickerComponent } from "./TimePicker";
import { Tooltip } from 'react-tooltip';
interface MultiSecProps {
  value: any[];
  options: { label: string; value: any }[];
  callback?: (e: any[]) => void;
}
const InlineLabel = (props: any) => <label htmlFor={props.label} {...props} />;
const Label = (props: any) => (
  <InlineLabel component={props.label} {...props} />
);

export const MultiSec: React.FC<MultiSecProps> = ({
  value,
  options,
  callback = (e) => {
    console.log(e);
  },
}) => {
  const [selected, setSelected] = useState<any[]>([]);

  function ChangeSelected(e: any[]) {
    setSelected(e);
    callback(e);
  }

  // Start with the selected values
  useEffect(() => {
    if (value === null) return;
    setSelected(value);
  }, [value]);

  return (
    <MultiSelect
      className="w-full relative [&>*]:!border-none [&>*]:!absolute [&>*]:!-top-[8px] [&>*]:!w-full   [&>*>*>*]:!rounded-[0px_0px_10px_10px] [&>*>.dropdown-content]:!-mt-[4px] [&>*>.dropdown-content>*>*]:!border-none  [&>.dropdown-container:focus-within]:!border-[var(--red)] [&>.dropdown-container:focus-within]:!shadow-none"
      options={options}
      value={selected}
      hasSelectAll={false}
      disableSearch={true}
      onChange={ChangeSelected}
      labelledBy="Selecione..."
      valueRenderer={(selected, _options) => {
        if (selected.length === 0) {
          return "Selecione...";
        }
        return selected.map(({ label }, i) => (
          <span
            key={i}
            className="bg-[var(--linkwater)] rounded-full px-4 py-[1px] mx-[2px]"
          >
            {label}
          </span>
        ));
      }}
    />
  );
};

interface InputFieldProps {
  id?: string;
  recordingState?: boolean | null;
  required?: boolean;
  options?: { label: string; value: any }[];
  value: any;
  correct?: boolean | null;
  selectedValue?: any;
  modified?: boolean | null;
  resetButton?: (e: any) => void;
  onSelect?: (e: any) => void;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  onClose?: (e: any) => void;
  label?: string;
  type?:
    | "text"
    | "email"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "search"
    | "tel"
    | "hidden"
    | "datetime"
    | "month"
    | "week"
    | "url"
    | "password"
    | "phone"
    | "textarea"
    | "select"
    | "multi-select"
    | "auto-complete"
    | "currency";
  placeholder?: string;
  disabled?: boolean;
  children?: any;
  maxLength?: any;
  className?: string;
  style?: React.CSSProperties;
  fieldsetStyle?: React.CSSProperties;
  info?: string;
  selectInlineLabel?: boolean;
  padding?: string;
  externalFunction?: any;
  icon?: string;
  onClick?: () => void;
  ref?: any;
  tooltip?: boolean;
}

export default function InputField({
  id = "",
  recordingState = null,
  required = false,
  options = [],
  value = null,
  correct = null,
  selectedValue = null,
  modified = null,
  onClose = () => {},
  resetButton = () => {},
  onSelect = () => {},
  onChange = () => {},
  onBlur = () => {},
  label = "",
  type = "text",
  placeholder = "",
  disabled = false,
  children,
  maxLength = null,
  className = "",
  style = {},
  fieldsetStyle = {},
  info = "",
  selectInlineLabel = false,
  padding = "p-3",
  externalFunction = null,
  icon = "",
  ref = null,
  onClick,
  tooltip = false,
}: InputFieldProps) {
  const [preValue, setPreValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState<string>("auto");

  const cleanSearchInput = (input: string) =>
    input.replace(/[^0-9a-zA-Z]/g, "").toLowerCase();

  const handleTextareaInput = (e: any) => {
    onChange(e);
    setTextareaHeight("auto"); // Redefinir a altura para "auto" para que o textarea seja redimensionado
    setTextareaHeight(`${e.target.scrollHeight}px`); // Ajustar a altura com base no conteúdo
  };

  return (
    <>
    <div className={`${tooltip?"flex":"fle-col"} items-center gap-2`}>
      {label !== "" && !selectInlineLabel && (
        <label
          htmlFor={label}
          className="text-grey dark:text-light-grey dark:font-light  text-[12px]  inline-flex justify-between truncate"
        >
          {label}
          {required && (
            <span className="italic text-[11px] text-red truncate">
              * Requerido
            </span>
          )}
          {icon !== "" ? (
            <div
              className="plus bg-white w-min h-auto rounded-full ml-2 flex align-center justify-center"
              onClick={onClick}
            >
              <BrenIcon
                icon={`${icon}`}
                color="text-black"
                className="!w-0 cursor-pointer opacity-50"
                size="12px"
              />
            </div>
          ) : null}
        </label>
      )}
      {modified !== null && modified === true && (
        <div className="bg-[orange] h-[8px] w-[8px] ml-2 inline-flex rounded-full "></div>
      )}
      {info !== "" && !tooltip && <InfoBox>{info}</InfoBox>}
      {info !== "" && tooltip && 
      <div className="info">
        <BrenIcon icon={"info"}/>
        <Tooltip
            anchorSelect=".info"
            place="right"
            className="z-[20]"
        >
            <span className="w-[200px] block">
              {info}
            </span>
        </Tooltip>
      </div>
      }
    </div>
      <div
        className={`${type === "textarea" && "overflow-y-auto"} [&>*]:text-[14px] rounded-xl flex  ${padding} [&>*]:outline-none bg-white border border-cloudy-blue dark:border-medium-grey [&>*]:bg-white dark:bg-black/25 [&>*]:dark:bg-transparent relative  ${disabled ? "opacity-50 !bg-cloudy-blue/25 dark:!bg-transparent [&>*]:!bg-transparent cursor-not-allowed" : ""} ${type === "textarea" ? "!rounded-2xl" : "inherit"} ${type === "auto-complete" && preValue !== "" ? "!rounded-b -none" : "inherit"}`}
        style={fieldsetStyle}
      >
        {/* Recording State (Spinner Loading) */}
        {recordingState !== null && (
          <div className="absolute top-3 right-3 flex items-center justify-center  !bg-transparent ">
            {!recordingState && <SpinnerLoading width="w-5 " height="w-5" />}
            {recordingState && (
              <div className="fadeOutAnimation ">
                <BrenIcon
                  icon={"checkmark  "}
                  color="loadComponent text-glacier dark:text-yellowgreenish "
                  className="!mr-1 !-mt-1 "
                />
              </div>
            )}
          </div>
        )}

        {(type === "text" ||
          type === "email" ||
          type === "number" ||
          type === "date" ||
          type === "datetime-local" ||
          type === "search" ||
          type === "tel" ||
          type === "hidden" ||
          type === "datetime" ||
          type === "month" ||
          type === "week" ||
          type === "url") && (
          <div className="flex flex-col md:flex-row items-start justify-center [&>input]:bg-transparent w-full">
            {selectInlineLabel && (
              <Label
                label={label}
                className="z-[0] text-grey cursor-pointer  text-[13px] inline-block mr-2 whitespace-nowrap"
              >
                {label}
              </Label>
            )}
            <input
              id={label}
              type={type}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              className={`${className} w-full truncate z-[1]`}
              maxLength={maxLength}
              style={style}
              required={required}
            />
          </div>
        )}

        {type === "currency" && (
          <>
            <div className="mr-1">R$</div>
            <input
              id={id}
              value={value ? value.replace(/[^\d.,]/g, "") : "0,00"}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              className={`${className} w-full`}
              maxLength={maxLength}
              style={style}
              required={required}
            />
          </>
        )}


        {type === "time" && (
          <>
          {selectInlineLabel ? (
            <label className=" inline-flex  w-full">
              <span className="opacity-75  mr-2  ">{label}</span>

              <TimePickerComponent
              onChange={onChange}
              id={id}
              onClose={onClose}
              value={value}
              showSeconds={false}
              disabled={disabled}
              />
            </label>  
            
            ) :                           
            <TimePickerComponent
            onChange={onChange}
            value={value}
            id={id}
            onClose={onClose}
            showSeconds={false}
            disabled={disabled}
            />} 
            {icon && !label && <BrenIcon icon={icon} color="inherit" className="!absolute right-3" />}
          </>
        )}

        {type === "password" && (
          <>
            <input
              id={id}
              type={showPassword ? "text" : "password"}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              className={`${className} w-full`}
              maxLength={maxLength}
              style={style}
              autoComplete="current-password"
              required={required}
            />
            <div
              className="flex items-center justify-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <BrenIcon
                icon={showPassword ? "eye" : "eye-slashed"}
                color="inherit"
                className="relative  !mr-0"
              />
            </div>
          </>
        )}

        {type === "phone" && (
          <PhoneInput
            country={"br"}
            value={value}
            onChange={onChange}
            disabled={disabled}
            containerClass={`${className} w-full`}
            placeholder={placeholder}
            inputStyle={{
              border: "0px",
              width: "auto",
              background: "transparent",
            }}
            containerStyle={{
              display: "flex",
              height: "25px",
              alignItems: "center",
              width: "100%",
              background: "transparent",
            }}
            buttonStyle={{
              border: "0px",
              background: "transparent",
              position: "absolute",
            }}
            dropdownStyle={{
              borderRadius: "10px",
              padding: "10px",
              color: "#000000",
              position: "absolute",
            }}
            searchStyle={{ background: "transparent" }}
          />
        )}

        {type === "search" && (
          <div className="flex items-center justify-center ">
            <BrenIcon
              icon={"search"}
              color="inherit"
              className="!relative !mr-0 h-0 "
            />
          </div>
        )}

        {type === "textarea" && (
          // <div contentEditable onInput={onChange} style={style} className={`${className} w-full !m-2 !mt-4  h-[100px] overflow-auto outline-none`}>
          //   {value}

          // </div>
          <textarea
            id={id}
            value={value}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={`${className} w-full !m-2 !mt-4 min-h-[300px]  outline-none `}
            maxLength={maxLength ? maxLength : 99999999}
            onInput={handleTextareaInput}
            style={{ height: textareaHeight }}
          />
        )}

        {type === "select" && (
          <div className="flex flex-col md:flex-row items-start justify-center [&>select]:bg-transparent w-full truncate">
            {selectInlineLabel && (
              <div
                onClick={() => {
                  document.getElementById(label)?.click();
                }}
              >
                <Label
                  label={label}
                  className="text-grey cursor-pointer  text-[13px] inline-block mr-2 whitespace-nowrap "
                >
                  {label}:
                </Label>
              </div>
            )}
            <select
              id={label}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              //i need to reach the option in classname using tailwind and paint the text to black
              className={`${className} w-full truncate cursor-pointer pr-2 !outline-none [&*>]:!outline-none !text-current  [&>*]:dark:!bg-tall-grey`}
              style={style}
            >
              {children}
            </select>
          </div>
        )}

        {type === "multi-select" && (
          <div className="h-10 w-full">
            {children !== null && children !== undefined && (
              <MultiSec
                value={value}
                options={children.map((e: any) => ({ label: e, value: e }))}
                callback={onChange}
              />
            )}
          </div>
        )}

        {type === "auto-complete" && (
          <div className="w-full relative [&>*]:outline-none">
            {value !== "" && (
              <div
                onClick={resetButton}
                className="  font-semibold cursor-pointer flex bg-cloudy-blue/50 dark:bg-gravel/50 text-black dark:text-white justify-between items-center p-4 rounded-[10px]"
              >
                <span className="truncate">
                  {options?.filter((f) => f.value === value)[0]?.label}
                </span>{" "}
                <BrenIcon icon={"times"} color="inherit" />
              </div>
            )}

            {value === "" && (
              <div className="flex items-center justify-center px-2 relative">
                <BrenIcon
                  icon={"search"}
                  color="inherit"
                  className="absolute right-2 top-1 !mr-0 "
                />
              </div>
            )}

            {value === "" && (
              <input
                type={type}
                value={preValue}
                onChange={(e) => setPreValue(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={`${className} w-full h-[38px] bg-[transparent]`}
                maxLength={maxLength}
                style={style}
              />
            )}

            {preValue !== "" && value === "" && options?.length > 0 && (
              <ul className="absolute top-[45px] -left-[12px] z-10 bg-white-smoke text-black dark:text-white dark:bg-tall-grey rounded-b-[10px] border-r border-l border-b border-cloudy-blue dark:border-grey shadow-2xl max-h-[200px] overflow-auto w-[calc(100%+24px)] p-2">
                {options
                  .filter((f) =>
                    f.label.toLowerCase().includes(preValue.toLowerCase()),
                  )
                  .map((e, i) => (
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
                    className="!py-1 !my-1 !w-full"
                    buttonStyle="accent-button"
                    icon={"user-plus"}
                    text={`Criar cliente ${preValue}`}
                    onClick={() => externalFunction(preValue)}
                  />
                )}
              </ul>
            )}
          </div>
        )}

        {correct === true && (
          <div className=" flex items-center justify-center ">
            <div
              className=" loadComponent ml-2 h-[15px] w-[15px] rounded-full flex items-center justify-center !bg-[green]  text-white"
              style={{ WebkitTextStroke: "1px" }}
            >
              <BrenIcon
                stroke={1}
                size="15px"
                icon="checkmark"
                color="#ffffff"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
