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

    const dispatch = (newState: mutateProps) => {
        // const newState = reducer(state)
        setState(newState)
    }

    if(!state) {
        setState(initialValue)
    }

    return { state, dispatch: (s: mutateProps) => dispatch(s) }
}