import moment from "moment";
import React, { useState, useEffect } from "react";



export function CountDownTimer({
  data,
  showProgressBar = false,
  nullText = "Expirado",
}: {
  data: string | null;
  showProgressBar?: boolean;
  nullText?: string;
}) {
  const [timeRemaining, setTimeRemaining] = useState<any>(null);
  const [percentage, setPercentage] = useState<any>(null);

  const calculateTimeRemaining = () => {
    if (data) {
      const endAt = moment(data);
      const currentTime = moment();
      const timeDiff = endAt.diff(currentTime);

      if (timeDiff <= 0) {
        setTimeRemaining(nullText);
        setPercentage(0);
        showProgressBar = false;
      } else {
        const hours = Math.floor(timeDiff / 3600000)
          .toString()
          .padStart(2, "0");
        const minutes = Math.floor((timeDiff % 3600000) / 60000)
          .toString()
          .padStart(2, "0");
        const seconds = Math.floor((timeDiff % 60000) / 1000)
          .toString()
          .padStart(2, "0");

        setTimeRemaining(`${hours}:${minutes}:${seconds}`);
        setPercentage(
          (timeDiff /
            (new Date(data).getTime() -
              new Date().getTime())) *
          100,
        );
        showProgressBar = true;
      }
    } else {
      setTimeRemaining(nullText);
      setPercentage(0);
    }
  };

  useEffect(() => {
    // Execute a função de cálculo no início e, em seguida, a cada segundo
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !showProgressBar ? (
    timeRemaining
  ) : (
    <div className="flex flex-col">
      <div className="text-[12px] text-center">{timeRemaining}</div>
      <div className="bg-[#ccc]/50 dark:bg-[#666]/50 w-[48px] mx-auto h-2 rounded-full overflow-hidden mt-[2px] ">
        <div
          className={`bg-[green] h-full `}
          style={{ width: percentage + "%" }}
        />
      </div>
    </div>
  );
}
