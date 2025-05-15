import { useState, useEffect } from "react";
import {
  saveCustomer,
  updateCustomer,
  getCustomers,
} from "../../API/APICustomer";

const Customerregister = () => {
  const [customers, setCustomers] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    getAllCustomers();
  }, []);
  const [formData, setFormData] = useState({
    id: undefined,
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const getAllCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error?.message;
      alert(errorMessage);
    }
  };
  const setCustomerToUpdate = (e) => {
    if (e.target.value == "New Customer") {
      setFormData({
        id: undefined,
        name: "",
        email: "",
        phone: "",
        address: "",
      });
      setIsUpdate(false);
      return;
    }
    const customer = customers.find(
      (customer) => customer.id == e.target.value
    );
    setFormData({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
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
        const response = await updateCustomer(formData?.id, formData);
        alert("Customer updated successfully");
        getAllCustomers();
      } catch (error) {
        const errorMessage = error.response?.data?.message || error?.message;
        alert(errorMessage);
      }
    } else {
    try {
      const response = await saveCustomer(formData);
      alert("Customer saved successfully");
      getAllCustomers();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error?.message;
      alert(errorMessage);
    }
  }
  };

  return (
    <div className="max-h-[calc(100vh-7.5rem)]  py-12 px-4 sm:px-6 lg:px-8 min-h-full">
      <div className="max-w-md mx-auto bg-[#1C0E41] rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4">
          <div className="text-center ">
            <h2 className="text-3xl font-extrabold text-white">
              Add / Update Customer
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Select Customer
              </label>
              <select
                name="id"
                onChange={setCustomerToUpdate}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="New Customer">New Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
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
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-300"
              >
                Address *
              </label>
              <textarea
                name="address"
                id="address"
                rows={3}
                required
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-2 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Customerregister;
