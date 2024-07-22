import BrenIcon from "./../Icons/BrenIcon";

interface SteppedTimeLineProps {
    id: number;
  inProgress: boolean;
  completed: boolean;
}
export default function SteppedTimeLine({steps}:{steps:SteppedTimeLineProps[]}) {
    
    const circle = (isCompleted:boolean, inProgress:boolean) => {
        return <div className={`dark:bg-grey bg-bren-blue-100 w-[35px] h-[35px] rounded-full aspect-square border-2 ${inProgress ? `dark:border-yellow-greenish border-glacier` : `border-transparent` } flex items-center justify-center`}>
            {inProgress && <>
                {!isCompleted && <div className="bg-glacier absolute animate-ping dark:bg-yellowgreenish rounded-full w-[8px] h-[8px] aspect-square"></div>}
                {!isCompleted ? <div className="bg-glacier  dark:bg-yellowgreenish rounded-full w-[8px] h-[8px] aspect-square"></div> : <BrenIcon icon="checkmark"/>}
            </>}
        </div>
    }

    const line = (isCompleted: boolean) => {
        return <div className={`w-[15px] h-[4px] bg-bren-blue-100 dark:bg-grey ${isCompleted ? 'bg-glacier dark:bg-yellowgreenish' : ''}`}></div>
    }
  
    return (
    <div className="steppedTimeline w-full flex justify-between items-center ">
        {steps.map((step, index) => {
            return <div key={index} className="flex  items-center">
                {circle(step.completed, step.inProgress)}
                {index < steps.length - 1 && line(step.completed)}
            </div>
        })}
    </div>

  );
}
