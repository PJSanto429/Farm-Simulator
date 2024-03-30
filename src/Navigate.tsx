import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Navigate = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/home')
    }, [navigate])

    return (<></>)

}
