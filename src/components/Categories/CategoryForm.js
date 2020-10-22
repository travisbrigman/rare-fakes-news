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
    </form>
  );
};
