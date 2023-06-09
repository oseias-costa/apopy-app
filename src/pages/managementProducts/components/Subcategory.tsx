import { useState, useEffect } from 'react'
import { useQuery, useMutation, gql } from "@apollo/client";
import { CATEGORIES } from "../../../queries/categories";
import { CREATE_SUBCATEGORY, DELETE_SUBCATEGORY, UPDATE_SUBCATEGORY } from '../../../queries/subcategories';

type SubcategoryType = {
    _id: string
    category: string 
    subcategory: string 
    newSubcategory: string
}

const initialSubcategoryState = {
    _id: '', 
    category: '', 
    subcategory: '', 
    newSubcategory: ''
}

export const Subcategory = ({ mutateState, setOpenModal }) => {
    const [ subcategoryState, setSubcategoryState ] = useState<SubcategoryType>(initialSubcategoryState)

    console.log(subcategoryState, mutateState)
    useEffect(() => {
        if(mutateState.categoryName){
            return setSubcategoryState({
                ...subcategoryState, 
                subcategory: mutateState.name, 
                newSubcategory: mutateState.name })
        }

        if(mutateState.type === 'create'){
            return setSubcategoryState({...subcategoryState, subcategory: ''})
        }
    },[mutateState])
    
    const { data, loading, error } = useQuery(CATEGORIES, {
        variables: {
          userId: "6451a787de4c08d54ed8da35",
        },
      });                

    const [ createSubcategory ] = useMutation(CREATE_SUBCATEGORY, {
        update: (cache, { data }) => {
            const newSubcategoryRef = cache.writeFragment({
                fragment: gql`
                  fragment MyCategory on Category {
                    _id
                    name
                    subcategory
                  }
                `,
                data: data.createSubcategory,
                variables: { _id: data.createSubcategory._id}
              })    
              cache.modify({
                fields: {
                    categories(existing){
                        const newData = existing.filter(
                            (item: {__ref: string}) => 
                            item !== newSubcategoryRef)
                        return [ ...newData, newSubcategoryRef]
                    }
                }
              })
        }
    })

    const [updateSubcategory] = useMutation(UPDATE_SUBCATEGORY, {
        update(cache, { data }){
            const newSubcategoryRef = cache.writeFragment({
                fragment: gql`
                  fragment MyCategory on Category {
                    _id
                    name
                    subcategory
                  }
                `,
                data: data.updateSubcategory,
                variables: { _id: data.updateSubcategory._id}
              })    
              cache.modify({
                fields: {
                    categories(existing){
                        const newData = existing.filter((item: {__ref: string}) => 
                            item !== newSubcategoryRef)
                        return [ ...newData, newSubcategoryRef]
                    }
                }
              })
        }
    })

    const [ deleteSubcategory ] = useMutation(DELETE_SUBCATEGORY, {
        update(cache, { data }){
            const newSubcategoryRef = cache.writeFragment({
                fragment: gql`
                  fragment MyCategory on Category {
                    _id
                    name
                    subcategory
                  }
                `,
                data: data.deleteSubcategory,
                variables: { _id: data.deleteSubcategory._id}
              })    
              cache.modify({
                fields: {
                    categories(existing){
                        const newData = existing.filter((item: {__ref: string}) => 
                            item !== newSubcategoryRef)
                        return [ ...newData, newSubcategoryRef]
                    }
                }
              })
        }
    })

    const handlerSubcategoryMutation = () => {
        if(mutateState.type === 'create'){
            createSubcategory({
                variables: {
                    subcategoryInput: {
                        name: subcategoryState.subcategory,
                        category: subcategoryState.category
                    }
                }
            })
            setOpenModal(false)
            setSubcategoryState(initialSubcategoryState)
        }
        else if (mutateState.type === 'update'){
            updateSubcategory({
                variables: {
                    subcategoryEdit: {
                        newName: subcategoryState.subcategory,
                        name: subcategoryState.newSubcategory,
                        category: mutateState.category
                    }
                }
            })
            setOpenModal(false)
            setSubcategoryState(initialSubcategoryState)
        } else {
            deleteSubcategory({
                variables: {
                    subcategoryEdit: {
                        name: mutateState.name,
                        category: mutateState.category
                    }
                }
            })
            setOpenModal(false)
            setSubcategoryState(initialSubcategoryState)
        }
    } 
                
    return(
        <div>
            <h2>Subcategory</h2>
            { data && mutateState?.type === 'create' ? (
                <select onChange={(e) => 
                    setSubcategoryState({...subcategoryState, category: e.target.value})
            }>
                    { data?.categories.map((item : {_id: string, name: string}) => 
                        <option key={item._id} value={item._id}>{item.name}</option>) 
                    }
                </select>) : (
                    <select disabled={true}>
                        <option>{mutateState.categoryName}</option>
                    </select>
                )}
                 { mutateState?.type !== 'delete' ? 
            (<>
                <input 
                    type='text' 
                    value={subcategoryState.subcategory} 
                    onChange={(e) => setSubcategoryState({...subcategoryState, subcategory: e.target.value})    
                }/>
             </>
            ) : 
            (<>
                <input type='text' value={mutateState.name} disabled={true} />
            </>)
        }
        <button onClick={handlerSubcategoryMutation}>{mutateState.type}</button>
        <button onClick={() => setOpenModal(false)}>Cancel</button>
        </div>
    )
}