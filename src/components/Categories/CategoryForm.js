import React, { useContext } from "react";

import { CategoryContext } from "./CategoryProvider";

export const CategoryForm = (props) => {
  const { categories, category, getCategories, createCategory } = useContext(
    CategoryContext
  );

  const [state, setState] = useState({});

  function handleChange(evt) {
    setState({ category: evt.target.value });
  }

  useEffect(() => {
    getCategories();
  }, []);

  const constructNewCategory = () => {
    const categoryId = parseInt(category.id)

    if (categoryId === 0) {
        window.alert("Please select a category")
    } else {

            addAnimal({
                name: animal.name,
                breed: animal.breed,
                categoryId: categoryId,
                status: animal.status,
                customerId: parseInt(localStorage.getItem("kennel_customer"))
            })
                .then(() => props.history.push("/animals"))
        }
    }


  return (
    <form className="categoryForm">
      <label>
        <div className="label">Category</div>
        <input
          type="text"
          name="category"
          value={state.category}
          onChange={handleChange}
        />
      </label>
      <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewAnimal()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Make Reservation"}
            </button>
    </form>
  );
};
