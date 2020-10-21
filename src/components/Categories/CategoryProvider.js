import React, { useState } from "react"

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})

    const getCategories = () => {
        return fetch("http://localhost:8088/categories")
            .then(res => res.json())
            .then(setCategories)
    }

    
    
    // const createCategory = category => {
        //     return fetch("http://localhost:8088/categories", {
            //         method: "POST",
            //         headers: {
                //             "Content-Type": "application/json"
                //         },
                //         body: JSON.stringify(category)
                //     })
                //        .then(res => res.json())
                //         .then(newCategory => {
                    //             getCategories()
                    //            return newCategory.id })      
                    // }
                    
                    
                    return (
                        <CategoryContext.Provider value={{
                            category, setCategory, categories, getCategories, setCategories,
                             
                        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}


//? I don't think we need this one
// const getCategoryById = (id) => {
//     return fetch(`http://localhost:8088/categories/${id}`)
//         .then(res => res.json())
// }

//TODO FOR WHEN/IF WE HAVE ADMIN SHTUFF
// const updateCategory = Category => {
//     return fetch(`http://localhost:8088/categories/${Category.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(Category)
//     })
//         .then(getcategories)
// }

// const deleteCategory = (CategoryId) => {
//     return fetch(`http://localhost:8088/categories/${CategoryId}`, {
//         method: "DELETE"
//     })
//         .then(getcategories)
// }