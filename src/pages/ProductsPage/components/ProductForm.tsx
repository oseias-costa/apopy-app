import { useQuery } from "@apollo/client"
import { CATEGORIES } from "../../../queries/categories"

export const ProductForm = () => {
    const { data } = useQuery(CATEGORIES, {
        variables: {
          userId: "6451a787de4c08d54ed8da35",
        },
      })
    console.log(data)
    return(
        <div>
            <select>
                { data?.categories.map((item) => {
                    return(
                        <div>                           
                            <option>{item.name}</option>
                        </div>
                    )
                })}
            </select>
        </div>
    )
}