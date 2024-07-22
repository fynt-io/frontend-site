import 'rc-time-picker/assets/index.css';
import React from 'react';
import moment from 'moment';
import TimePicker from 'rc-time-picker';


export const TimePickerComponent = ({ id="", onChange, value, showSeconds = false, className = "", disabled, onClose }: { id?:string, onChange: any, value: string, showSeconds?: boolean, className?:string, disabled?:boolean, onClose?:any }) => {

    async function ForceInputFocus() {
        await new Promise(r => setTimeout(r, 100));
        if(typeof document === 'undefined') return;
        const input : HTMLInputElement  = document.querySelector(".rc-time-picker-panel-input") as HTMLInputElement;

        if(input) {
            input.focus();
        }
    }

    function onChangeHandler(e:any) {
        onChange(e.format('HH:mm'));
    }

    return (
        <label htmlFor={id}>
        <TimePicker
            id={id}
            allowEmpty={false}
            showSecond={showSeconds}
            onOpen={() => ForceInputFocus()}
            defaultValue={value ? moment(value, 'HH:mm') : moment('00:00', 'HH:mm')}
            className={`[&>*]:!w-fit ${className} [&>.rc-time-picker-input]:!bg-transparent [&>.rc-time-picker-input]:!text-[14px] [&>*]:!border-transparent dark:[&>.rc-time-picker-input]:dark:!text-white [&>.rc-time-picker-input]:!text-black`}
            onChange={(e:any) => onChangeHandler(e)}
            onClose={() => onClose()}
            disabled={disabled}
            popupClassName='[&>*]:relative [&>*]:!w-auto [&>*>div>.rc-time-picker-panel-input]:!bg-transparent [&>*>div>div>ul>*:hover]:hover:!bg-cloudy-blue/20  [&>*>div>div>ul>*:hover]:hover:dark:!bg-black/20 [&>*>div>div>*>li.rc-time-picker-panel-select-option-selected]:!bg-cloudy-blue/40 [&>*>div>div>*>li.rc-time-picker-panel-select-option-selected]:dark:!bg-black/50 [&>*]:dark:!bg-dark-grey [&>*]:!border-transparent [&>*]:dark:!shadow-none [&>.rc-time-picker-panel-select-option-selected]:!bg-black'
        />
        </label>
    );
}