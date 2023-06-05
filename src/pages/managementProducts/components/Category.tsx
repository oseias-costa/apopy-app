import { gql, useMutation } from '@apollo/client'
import { ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from '../../../queries/categories'
import { client } from '../../../main'
import { CategoryData, CategoryState } from "../../../types/category.type";

export const Category = ({ setOpenModal, setCategoryState, categoryState }: {setOpenModal: (value: boolean) => void, setCategoryState: () => void, categoryState: () => void}) => {

    const [ createCategory ] = useMutation(ADD_CATEGORY, {
      update: (cache, { data }) => {
        const cacheId : any = cache.identify(data.createCategory)
        cache.modify({
         fields: {
           categories: (existingFieldData, { toReference }) => {
             return [ ...existingFieldData, toReference(cacheId)]
            }
          }
        })
        }
    })

    const [ updateCategory ] = useMutation(UPDATE_CATEGORY, {
      update(cache, { data: { updateCategory } }) {
        client.readFragment({
          id: `Category:${updateCategory._id}`,
          fragment: gql`
            fragment MyCategory on Category {
              _id
              name
            }
          `,
        })
    }})

    const [ deleteCategory ] = useMutation(DELETE_CATEGORY, {
      update: (cache, { data: { deleteCategory } }) => {
        const normalizedId = cache.identify({
          _id: deleteCategory._id,
          __typename: "Category",
        });
        cache.evict({ id: normalizedId });
      },
    });


    const handleCategoryMutation = async ( 
        categoryState: CategoryState, setCategoryState: React.Dispatch<React.SetStateAction<CategoryState>>
      ) => {
        if (categoryState.type === "create") {
          await createCategory({
            variables: {
              categoryInput: {
                name: categoryState.name,
                userId: "6451a787de4c08d54ed8da35",
              },
            },
          });
          setOpenModal(false)
        } else if (categoryState.type === "update") {
          await updateCategory({
            variables: {
              categoryEdit: {
                _id: categoryState._id,
                name: categoryState.name,
              },
            },
          })
          setOpenModal(false)
        } else {
          await deleteCategory({
            variables: {
              categoryEdit: {
                _id: categoryState._id,
              },
            },
          })
          setOpenModal(false)
        }
      };


    return(
        <div>
         <div>
        <h2>{categoryState.type}</h2>
        <input
          type="text"
          value={categoryState.name}
          disabled={categoryState.type === 'delete' ? true : false}
          onChange={(e) =>
            setCategoryState({ ...categoryState, name: e.target.value })
          }
        />
        <button
          type="submit"
          onClick={() => handleCategoryMutation(categoryState, setCategoryState, setOpenModal)}
        >
          {categoryState.type}
        </button>
        <button
          type="submit"
          onClick={() => {
            setCategoryState({ _id: "", name: "", type: "create" })
            setOpenModal(false)
          }}
        >
          Desfazer
        </button>
      </div>
        </div>
    )
}