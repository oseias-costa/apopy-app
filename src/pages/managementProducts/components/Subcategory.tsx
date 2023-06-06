import { useState } from 'react'
import { useQuery, useMutation, gql } from "@apollo/client";
import { CATEGORIES } from "../../../queries/categories";
import { CREATE_SUBCATEGORY } from '../../../queries/subcategories';
import { client } from '../../../main';

type SubcategoryType = {
    _id: string
    category: string 
    subcategory: string 
    newSubcategory: string
}

export const Subcategory = ({ mutateState, setOpenModal }) => {
    const [ subcategoryState, setSubcategoryState ] = useState<SubcategoryType>({ 
        _id: '', 
        category: '', 
        subcategory: '', 
        newSubcategory: ''
    })

    console.log('every one', subcategoryState)
    
    const { data, loading, error } = useQuery(CATEGORIES, {
        variables: {
          userId: "6451a787de4c08d54ed8da35",
        },
      });                

    const [ createSubcategory ] = useMutation(CREATE_SUBCATEGORY, {
        update: (cache, { data }) => {
            console.log('mudou', data)
            const cacheId : any = cache.identify(data.createSubcategory)
            cache.modify({
             fields: {
               categories: (existingFieldData, { toReference }) => {
                 return [ ...existingFieldData, toReference(cacheId)]
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
        }
        setOpenModal(false)
    }
                
    return(
        <div>
            { data && (
                <select onChange={(e) => setSubcategoryState({...subcategoryState, category: e.target.value})}>
                    { data?.categories.map((item : {_id: string, name: string}) => 
                        <option key={item._id} value={item._id}>{item.name}</option>) 
                    }
                </select>) 
                }
                 
            <h2>Subcategory</h2>
            <input 
                type='text' 
                value={subcategoryState.subcategory} 
                onChange={(e) => 
                    setSubcategoryState({...subcategoryState, subcategory: e.target.value})
                } 
            />
            <button onClick={handlerSubcategoryMutation}>{mutateState.type}</button>
            <button onClick={() => setOpenModal(false)}>Cancel</button>
        </div>
    )
}