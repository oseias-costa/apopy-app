import { useState } from "react";
import { useQuery } from "@apollo/client";
import { CATEGORIES } from "../../../queries/categories";

export const ProductForm = () => {
  const [itemSelected, setItemSelected] = useState({
    category: "",
    subcategory: "",
    suplier: "",
    product: "",
    newProduct: "",
  });
  console.log(itemSelected);
  const { data } = useQuery(CATEGORIES, {
    variables: {
      userId: "6451a787de4c08d54ed8da35",
    },
  });
  
  const categorySelect = (
      <select
        onChange={(e) =>
          setItemSelected({ ...itemSelected, category: e.target.value })
        }
      >
        {data?.categories.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
  )
  
  const subcategorySelect = (
      <select>
          { itemSelected.category !== '' && 
                { data?.categories.itemSelected.Category.map((item: string) => (
                    <option>{item}</option>   
                ))     
                }
                
          
           }
      </select>
  )
  
  return (
    <div>
        { categorySelect }
    </div>
  );
};
