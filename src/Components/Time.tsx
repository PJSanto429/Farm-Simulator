import React, { useEffect, useState } from 'react'

export const Time = (props: {
    handleChangeDay: () => void
    day: number
}) => {

    const {
        handleChangeDay,
        day
    } = props

    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(1)
    
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
        <text>
            {hours}:{minutes.toString().padStart(2, "0")}<AmOrPm />
        </text>
    )
}