import { useState, useEffect } from 'react'
import { makeVar, useReactiveVar } from "@apollo/client"

type mutateProps = 
    { _id: string; name: string; type: string; edit: string; }

export const useMutateState = () => {
    const initialValue = {
        _id: "",
        name: "",
        type: "create",
        edit: ""
    }
    const [ state, setState ] = useState(initialValue)

    const mutateStateFn = makeVar(state)
    useReactiveVar(mutateStateFn)

    const updateState = (newState: mutateProps) => {
        return setState(newState)
    }

    if(!state) {
        setState(initialValue)
    }

    return [ state, updateState ]
}