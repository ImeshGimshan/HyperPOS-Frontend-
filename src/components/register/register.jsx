import { useState, useEffect } from "react";
import {
  getSuppliers,
  getSupplierById,
  saveSupplier,
  updateSupplier,
} from "../../API/APISupplier";
const SupplierRegistration = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const [formData, setFormData] = useState({
    id: undefined,
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    getAllSuppliers();
  }, []);

  const setSupplierToUpdate = (e) => {
    if (e.target.value == "New Supplier") {
      setFormData({
        id: undefined,
        name: "",
        address: "",
        email: "",
        phone: "",
      });
      setIsUpdate(false);
      return;
    }
    const supplier = suppliers.find(
      (supplier) => supplier.id == e.target.value
    );
    setFormData({
      id: supplier.id,
      name: supplier.name,
      address: supplier.address,
      email: supplier.email,
      phone: supplier.phone,
    });
    setIsUpdate(true);
  };
  const getAllSuppliers = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error?.message;
      alert(errorMessage);
    }
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
    submitSupplier();
  };
  const submitSupplier = async () => {
    if (isUpdate) {
      try {
        const response = await updateSupplier(formData.id, formData);
        alert("Supplier updated:", response?.name);
        getAllSuppliers();
      } catch (error) {
        const errorMessage = error.response?.data?.message || error?.message;
        alert(errorMessage);
      }
    } else {
      try {
        const response = await saveSupplier(formData);
        alert("Supplier saved:", response?.name);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error?.message;
        alert(errorMessage);
      }
      getAllSuppliers();
    }
  };

  return (
    <div className="  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-[#1C0E41] rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white">
              Add / Update Supplier
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Select Supplier *
                </label>
                <select
                  name="id"
                  value={formData.id}
                  onChange={(e) => setSupplierToUpdate(e)}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="New Supplier">New Supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
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
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-300"
                >
                  Address *
                </label>
                <textarea
                  type="text"
                  name="address"
                  id="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupplierRegistration;
