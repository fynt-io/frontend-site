import React, { useState, useEffect } from 'react';
import BrenIcon from './../Icons/BrenIcon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../style/selectDateRange.css';
import ptBR from 'date-fns/locale/pt-BR';
import { Locale, format, parse } from 'date-fns';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';

interface DatePickerRangeProps {
  onDatesSelected: (startDate: string | null, endDate: string | null) => void;
  value: string | null | undefined;
  resetInput: any;
  calendarClassName?: string;
  className?: string;
}

const formatDate = (date: Date): string => {
  return format(date, 'dd-MM-yyyy');
};

const parseDate = (dateStr: string): Date => {
  return parse(dateStr, 'dd-MM-yyyy', new Date());
};

export function DatePickerRange({ onDatesSelected, value, resetInput, calendarClassName, className }: DatePickerRangeProps): JSX.Element {
  const [startDate, setStartDate] = useState<Date | null>(() => {
    const dates = value ? value.split(' ') : [];
    if (dates.length >= 1) {
      return parseDate(dates[0]);
    }
    return null;
  });
  
  const [endDate, setEndDate] = useState<Date | null>(() => {
    const dates = value ? value.split(' ') : [];
    if (dates.length === 2) {
      return parseDate(dates[1]);
    }
    return null;
  });
  
  const [noFilter, setNoFilter] = useState<boolean>(true);
  const [selected, setSelected] = useState<boolean>(false);
  
  useEffect(() => {
    if (value) {
      const dates = value.split(' ');
      if (dates.length >= 1) {
        setStartDate(parseDate(dates[0]));
      } else {
        setStartDate(null);
      }
      if (dates.length === 2) {
        setEndDate(parseDate(dates[1]));
      } else {
        setEndDate(null);
      }
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  }, [value]);

  useEffect(() => {
    if (startDate !== null && endDate !== null) {
      setSelected(true);
    }
    if (startDate !== null) {
      setNoFilter(false);
    }
  }, [startDate, endDate]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    
    if (start !== null && end !== null) {
      const startDateFormatted = formatDate(start);
      const endDateFormatted = formatDate(end);
      onDatesSelected(startDateFormatted, endDateFormatted);
    }
  };

  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: ReactDatePickerCustomHeaderProps): any => {
    return (
      <>
      <div className="w-full flex justify-between mb-2 items-center">
        <span className="text-[16px] font-bold">{format(date, 'MMMM yyyy', { locale: (ptBR as unknown) as Locale })}</span>
        <div>
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <BrenIcon icon="chevron-left" size="32px" color="inherit" className="!w-0 cursor-pointer opacity-100" />
          </button>
          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <BrenIcon icon="chevron-right" size="32px" color="inherit" className="!w-0 cursor-pointer opacity-100" />
          </button>
        </div>
      </div>
      </>
    );
  };

  return (
    <div className="flex justify-center !text-white" onClick={selected ? () => { setStartDate(null); setEndDate(null); setSelected(false); setNoFilter(true); resetInput(); } : undefined}>
      <div className={`w-full md:w-[204.6px] bg-white dark:bg-black/25 text-[14px] rounded-xl flex justify-between p-3 outline-none border border-cloudy-blue dark:border-medium-grey ${className}`}>
        {noFilter ? 
          <div onClick={() => setNoFilter(false)} className="w-full">Todas</div>
          :
          <DatePicker
            locale={(ptBR as unknown) as Locale}
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            dateFormat="dd-MM-yyyy"
            className="bg-transparent relative inherit inherit text-black dark:text-white"
            calendarClassName={`left-[-11px] top-[6px] !bg-[#272727] border !border-[#595959] rounded p-4 !rounded-[12px] !text-white  !h-auto ${calendarClassName}`}
            dayClassName={(date: Date) => (
              " !h-[32.28px]" +
              (startDate && endDate && date >= startDate && date <= endDate
                ? "bg-transparent text-white border-white"
                : "") +
              ((startDate &&
                endDate &&
                new Date(date).setHours(0, 0, 0, 0) === new Date(startDate).setHours(0, 0, 0, 0) &&
                new Date(date).setHours(0, 0, 0, 0) === new Date(endDate).setHours(0, 0, 0, 0))
                ? " !rounded-full !border !border-l-[1px] !border-white "
                : "")
            )}
            renderCustomHeader={renderCustomHeader}
          />}
        <BrenIcon
          icon="calendar"
          size="20px"
          color="inherit"
          className="!w-0 cursor-pointer opacity-100"
        />
      </div>
    </div>
  );
}
