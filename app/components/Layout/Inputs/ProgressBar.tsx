import React,{useEffect, useState} from 'react'

export function StaticProgressBar({init, sent, callback}:{init: boolean, sent: boolean, callback?: () => void}) {
    const [progresso, setProgresso] = useState<number>(0);

    useEffect(() => {
        if(init){
            if(progresso < 90 && sent===false){
                setTimeout(() => setProgresso(prev => prev += 2), 2000);
            }
            else if(progresso >= 90 && sent===false){
                setProgresso(prev => prev);
            }
            else if(sent){
                setProgresso(100);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progresso]);

    return (
        <div className="w-full max-w-full h-3 bg-[#EBF0F4] dark:bg-[#4F4F4F] mt-2 mx-4 rounded-full overflow-hidden">
            <div
                className="h-full bg-gradient-primary-horizontal rounded-full"
                style={{ width: `${progresso}%` }}
            ></div>
        </div>
    );
}

export function ProgressBar({value, max}:{value:number, max:number}) {

    return (
        <div className="w-full max-w-full h-3 bg-[#EBF0F4] dark:bg-[#4F4F4F] mt-2 rounded-full overflow-hidden">
            <div
                className="h-full bg-gradient-primary-horizontal rounded-full"
                style={{ transition:"1s", width: `${(value/max)*100}%` }}
            ></div>
        </div>
    );
}

