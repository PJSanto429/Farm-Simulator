import { useEffect} from 'react'

export const Time = (props: {
    handleChangeDay: () => void
    day: number
    
    minutes: number
    setMinutes: (minute: number) => void

    hours: number
    setHours: (hour: number) => void
}) => {

    const {
        handleChangeDay,
        day,

        minutes,
        setMinutes,

        hours,
        setHours
    } = props
    
    useEffect(() => {
        let intervalId = setInterval(() => {
            const minutesToBe = minutes + 1
            let hoursToBe = hours

            if (minutesToBe === 60) {
                hoursToBe++
                setMinutes(0)
            } else {
                setMinutes(minutesToBe)
            }

            if (hoursToBe === 13) {
                handleChangeDay()
            } else {
                setHours(hoursToBe)
            }

        }, (150))
    
        return () => clearInterval(intervalId)
    }, [minutes, hours, handleChangeDay])

    const AmOrPm = () => {
        return <> {(day % 1 === .5) ? "PM" : "AM"}</>
    }

    return (
        <span>
            {hours}:{minutes.toString().padStart(2, "0")}<AmOrPm />
        </span>
    )
}