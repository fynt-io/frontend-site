export const SkeletonLoading = ({
  number,
  type = 1,
  height = "h-[140px]",
}: {
  number: number;
  type?: number;
  height?: string;
}) => {
  const Skeleton = ({ opacity }: { opacity: string }) => {
    return (
      <div style={{ opacity: opacity }}>
        {" "}
        {type === 1 ? (
          <div
            className={`animate-pulse relative w-full flex bg-cloudy-blue/20 ${height} px-6 py-9 border border-cloudy-blue/25 dark:border-transparent dark:bg-grey/25 rounded-xl items-center flex-col lg:flex-row mb-2 `}
          >
            <div className="lg:mr-10 w-full lg:w-[250px] flex items-center  lg:mb-0  ">
              <div className="!h-[30px] !min-w-[30px] !w-[30px] aspect-square rounded-full bg-cloudy-blue/50 dark:bg-medium-grey mr-4"></div>
              <div>
                <div className="h-[13px] w-[200px] rounded-full bg-cloudy-blue/50 dark:bg-medium-grey mr-4"></div>
                <div className="h-[13px] w-[200px] rounded-full bg-cloudy-blue/50 dark:bg-medium-grey mr-4 mt-3"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-pulse relative w-full flex bg-cloudy-blue/20 mb-2  px-6 py-6 border border-cloudy-blue/25 dark:border-transparent dark:bg-grey/25 rounded-xl items-center flex-col lg:flex-row  ">
            <div className="lg:mr-10 w-full lg:w-[250px] flex items-center  lg:mb-0  ">
              <div>
                <div className="h-[13px] w-[200px] rounded-full bg-cloudy-blue/50 dark:bg-medium-grey mr-4 mt-3"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {[...Array(number)].map((e, i) => (
        <Skeleton
          key={i}
          opacity={
            //iterate from 1 to total number of elements in array to calculate opacity
            //the first element will have opacity 1, the last will have opacity 0.1
            (1 - (i / number) * 0.9).toFixed(1).toString()
          }
        />
      ))}
    </div>
  );
};

export const SkeletonLoadingCards = ({
  number,
  type = 1,
  height = "h-[200px]",
}: {
  number: number;
  type?: number;
  height?: string;
}) => {
  const Skeleton = ({ opacity }: { opacity: string }) => {
    return (
      <div style={{ opacity: opacity }} className="mr-4">
        {" "}
        {type === 1 ? (
          <div
            className={`animate-pulse relative w-full inline-flex bg-cloudy-blue/20 ${height}  px-6 py-9 border border-cloudy-blue/25 dark:border-transparent dark:bg-grey/25 rounded-3xl items-start flex-col lg:flex-row mb-2 `}
          >
            <div className="lg:mr-10 w-full lg:w-[220px] flex items-start justify-start  lg:mb-0 ">
              <div className="!h-[30px] !min-w-[30px] !w-[30px] aspect-square rounded-full bg-cloudy-blue/50 dark:bg-medium-grey mr-3"></div>
              <div>
                <div className="h-[13px] w-full rounded-full bg-cloudy-blue/50 dark:bg-medium-grey mr-4"></div>
                <div className="h-[13px] w-[150px] rounded-full bg-cloudy-blue/50 dark:bg-medium-grey mr-4 mt-3"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-pulse relative w-full flex bg-cloudy-blue/20 mb-2  px-6 py-6 border border-cloudy-blue/25 dark:border-transparent dark:bg-grey/25 rounded-xl items-center flex-col lg:flex-row  mr-4  ">
            <div className="lg:mr-10 w-full lg:w-[230px] flex items-center  lg:mb-0  ">
              <div>
                <div className="h-[13px] w-[200px] rounded-full bg-cloudy-blue/50 dark:bg-medium-grey mr-4 mt-3"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full inline-flex">
      {[...Array(number)].map((e, i) => (
        <Skeleton
          key={i}
          opacity={
            //iterate from 1 to total number of elements in array to calculate opacity
            //the first element will have opacity 1, the last will have opacity 0.1
            (1 - (i / number) * 0.9).toFixed(1).toString()
          }
        />
      ))}
    </div>
  );
};

export const WhatsAppSkeletonLoading = () => {
  return (
    <div className="w-full flex flex-col grayscale animate-pulse">
      <div className="">
        <div
          className={`pr-10 md:pr-20 flex flex-col items-start w-full mb-3  !z-[-1]`}
        >
          <div
            className={`md:max-w-[70%] bg-white dark:bg-[#363638] py-2 px-2 min-w-[50px] rounded-xl relative`}
            style={{ boxShadow: `0 1px .5px rgba(11,20,26,.13)` }}
          >
            <div className="py-10 px-20 w-[300px]"></div>
            <div
              className="bg-[url(/whatsapp/balloon-white.svg)] !z-[-1]  dark:bg-[url(/whatsapp/balloon-white-dark.svg)]"
              style={{
                transform: "scaleX(-1)",
                width: "20px",
                height: "20px",
                position: "absolute",
                left: "-10px",
                top: "0px",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="">
        <div className={`pl-10 md:pl-20 flex flex-col items-end w-full mb-3`}>
          <div
            className={`md:max-w-[70%] py-2 px-2 rounded-xl relative bg-[#DCF7C5] dark:bg-[#054640]`}
            style={{ boxShadow: `0 1px .5px rgba(11,20,26,.13)` }}
          >
            <div className="py-10 px-20 w-[400px]"></div>
            <div
              className="bg-[url(/whatsapp/balloon-green.svg)] !z-[-1]  dark:bg-[url(/whatsapp/balloon-green-dark.svg)]"
              style={{
                transform: "scaleX(-1)",
                width: "20px",
                height: "20px",
                position: "absolute",
                right: "-10px",
                top: "0px",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="">
        <div
          className={`pr-10 md:pr-20 flex flex-col items-start w-full mb-3 !z-[-1]`}
        >
          <div
            className={`md:max-w-[70%] bg-white dark:bg-[#363638] py-2 px-2 min-w-[50px] rounded-xl relative`}
            style={{ boxShadow: `0 1px .5px rgba(11,20,26,.13)` }}
          >
            <div className="py-10 px-20"></div>
            <div
              className="bg-[url(/whatsapp/balloon-white.svg)] !z-[-1]  dark:bg-[url(/whatsapp/balloon-white-dark.svg)]"
              style={{
                transform: "scaleX(-1)",
                width: "20px",
                height: "20px",
                position: "absolute",
                left: "-10px",
                top: "0px",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};


export const SkeletonLoadingTextBlocks = ({
  number,
  height = "h-[20px]",
}: {
  number: number;
  height?: string;
}) => {
  const Skeleton = ({ opacity, width }: { opacity: string, width:string }) => {
    return (
      <div style={{ opacity, width }} className="inline">
                 <div className={`animate-pulse relative w-full inline-flex bg-cloudy-blue/20 ${height}  px-5 py-5 border border-cloudy-blue/25 dark:border-transparent dark:bg-grey/25 rounded-3xl items-start flex-col lg:flex-row mb-2 `}
          >
          </div>
      </div>
    );
  };

  return (
    <div className="w-full inline-flex justify-start items-start flex-wrap gap-3">
      {[...Array(number)].map((e, i) => (
        <Skeleton
          key={i}
          width={
            (150 + (i / number) * 350).toFixed(0).toString() + "px"
          }
          opacity={
            //iterate from 1 to total number of elements in array to calculate opacity
            // the first element will have opacity 1, the last will have opacity 0.1
            (1 - (i / number) * 0.9).toFixed(1).toString()
          }
        />
      ))}
    </div>
  );
}
