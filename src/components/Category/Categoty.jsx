import { useState, useEffect } from "react";
import {saveCategory, updateCategory, getCategories } from "../../API/APICategory";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    getAllCategory();
  }, []);
  const [formData, setFormData] = useState({
    id: undefined,
    name: ""
  });

  const getAllCategory = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error?.message;
      alert(errorMessage);
    }
  };
  const setCategoryToUpdate = (e) => {
    if (e.target.value == "New Category") {
      setFormData({
        id: undefined,
        name: ""
      });
      setIsUpdate(false);
      return;
    }
    const category = categories.find(
      (category) => category.id == e.target.value
    );console.log(category);
    setFormData({
      id: category.id,
      name: category.name
    });
    setIsUpdate(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();

  };
  const submitForm = async () => {
    if (isUpdate) {
      try {
        const response = await updateCategory(formData?.id, formData);
        alert("Category updated successfully");
        getAllCategory();
      } catch (error) {
        const errorMessage = error.response?.data?.message || error?.message;
        alert(errorMessage);
      }
    } else {
    try {
      const response = await saveCategory(formData);
      alert("Category saved successfully");
      getAllCategory();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error?.message;
      alert(errorMessage);
    }
  }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-[#1C0E41] rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white">
              Add / Update Category
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Select Category
              </label>
              <select
                name="id"
                onChange={setCategoryToUpdate}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="New Category">New Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Category;
