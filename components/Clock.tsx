import React, { useEffect, useState } from 'react'

type Props = {
    locales?: string
    options: Intl.DateTimeFormatOptions
}

const Clock = (props: Props) => {

    const [datetime, setDateTime] = useState<Date>(() => {
        return (props.options.timeZone === undefined) ?
            new Date()
            :
            new Date(new Date().toLocaleString((typeof props.locales !== undefined) ? props.locales : "en-US", props.options));
    });

    useEffect(() => {
        
        // componentDidMount
        updateDateTime()
        const updateTimer = setInterval(() => {
            updateDateTime();
        }, 1000);
        // componentDidMount

        // componentWillUnmount
        return (() => {
            clearInterval(updateTimer);
        });
        // componentWillUnmount
    }, [])

    const updateDateTime = (): void => {

        (props.options.timeZone === undefined) ?
            setDateTime(new Date()) :
            setDateTime(new Date(new Date().toLocaleString((typeof props.locales !== undefined) ? props.locales : "en-US", props.options)));
    }

    const padZero = (num: number, maxLength: number): string => {
        return (num.toString().padStart(maxLength, "0"))
    }

    const getDate = ():{day: number, month: number, year: number} => {
        return ({
            day: datetime.getDay(),
            month: datetime.getMonth(),
            year: datetime.getFullYear()
        })
    }

    const getTime = () : {hour: string, minute: string, second: string} => {
        return ({
            hour: padZero(datetime.getHours(), 2),
            minute: padZero(datetime.getMinutes(), 2),
            second: padZero(datetime.getSeconds(), 2)
        })
    }

    const getDateTime = () => {
        return ({
            getDate,
            getTime
        })
    }

    return (
        <div className="grid-cols-3 flex relative">
            <div className="relative bg-black p-3 w-18">
                <span className="relative sm:p-0 text-white font-bold text-8xl">{getTime().hour}</span>
            </div>
            <div className="relative bg-black p-3 ml-0 w-18">
                <span className="relative sm:p-0 text-white font-bold text-8xl">{getTime().minute}</span>
            </div>
            <div className="relative bg-black p-3 ">
                <div className=" sm:p-0 text-white text-3xl w-10">{getTime().second}</div>
            </div>
        </div>
    )


}


export default Clock;