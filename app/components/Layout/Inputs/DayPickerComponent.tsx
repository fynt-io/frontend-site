import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import InputField from "./../Inputs/InputField";
import moment from "moment";

const css = `

  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 

  }
  
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: glacier;
  }

   * > .rdp-day:hover, .rdp-nav_button_next:hover, .rdp-nav_button_previous:hover {
    background: rgba(0, 0, 0, 0.5)!important;
    color: white!important;
  }
`;

export default function DayPickerComponent({
  showTime = false,
  resultDate,
  initialDate,
  allowPastDates,
}: {
  showTime?: boolean;
  resultDate: any;
  initialDate: string;
  allowPastDates?: boolean;
}) {
  const [selected, setSelected] = useState<Date>();
  const [hour, setHour] = useState<string>("");
  const [minute, setMinute] = useState<string>("");

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }

  const HourRegex = (value: string) => {
    let number = parseInt(value.replace(/\D+/g, ""));

    //prevent more than 2 digits
    if (value.length > 2) {
      return value.substring(0, 2).toString();
    }

    //prevent more than 23 hours
    if (number > 23) {
      return "23";
    } else if (number < 0) {
      return "00";
    }

    //add a 0 before the number if it's less than 10
    return number.toString();
  };

  const MinuteRegex = (value: string) => {
    let number = parseInt(value.replace(/\D+/g, ""));

    //prevent more than 2 digits
    if (value.length > 2) {
      return value.substring(0, 2).toString();
    }

    //prevent more than 59 minutes
    if (number > 59) {
      return "59";
    } else if (number < 0) {
      return "00";
    }
    return number.toString();
  };

  useEffect(() => {
    if (initialDate) {
      //set the initial date
      setSelected(new Date(initialDate));
      //set the initial hour and minute
      setHour(moment(initialDate).format("HH"));
      setMinute(moment(initialDate).format("mm"));
    }
  }, [initialDate]);

  useEffect(() => {
    if (selected) {
      resultDate(
        moment(selected).hour(parseInt(hour)).minute(parseInt(minute)).format(),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, hour, minute]);

  return (
    <>
      <style>{css}</style>
      <div className="">
        <div className="p-1 border rounded-xl">
          <DayPicker
            className=" flex items-center justify-center"
            locale={ptBR}
            mode="single"
            defaultMonth={initialDate ? new Date(initialDate) : new Date()}
            selected={selected}
            onSelect={setSelected}
            disabled={allowPastDates ? undefined : { before: new Date() }}
            modifiersClassNames={{
              selected: "my-selected",
              today: "my-today",
            }}
          />
        </div>
        {showTime && (
          <div className="mt-6">
            <h3 className="block !my-3 font-semibold">Hora e Minuto:</h3>
            <div className="flex">
              <InputField
                type="number"
                fieldsetStyle={{ width: "100%!important" }}
                className="!w-[full] text-[20px]"
                value={hour}
                onChange={(e: any) => setHour(HourRegex(e.target.value))}
              />
              <div className="text-[20px] h-[50px] flex items-center px-3">
                :
              </div>
              <InputField
                type="number"
                fieldsetStyle={{ width: "100%!important" }}
                className="!w-[full] text-[20px]"
                value={minute}
                onChange={(e: any) => setMinute(MinuteRegex(e.target.value))}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
