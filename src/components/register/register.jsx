import { useState, useEffect, useRef } from "react";
import {
  getSuppliers,
  saveSupplier,
  updateSupplier,
} from "../../API/APISupplier";

const SupplierRegistration = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: undefined,
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getAllSuppliers();
  }, []);

  const setSupplierToUpdate = (e) => {
    if (e.target.value === "New Supplier") {
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
      alert(error.response?.data?.message || error?.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Simple validation: expand as needed!
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      submitSupplier();
    }
  };

  const submitSupplier = async () => {
    setIsLoading(true);
    if (isUpdate) {
      try {
        const response = await updateSupplier(formData.id, formData);
        alert("Supplier updated: " + response?.name);
        getAllSuppliers();
      } catch (error) {
        alert(error.response?.data?.message || error?.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await saveSupplier(formData);
        alert("Supplier saved: " + response?.name);
        getAllSuppliers();
      } catch (error) {
        alert(error.response?.data?.message || error?.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8 sm:px-6 md:px-8">
      <div className="absolute inset-0 hyper-bg -z-10"></div>
      <div className="relative w-full max-w-sm md:max-w-xl mx-auto z-10">
        <div className="relative bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-lg border border-[#f472b6]/30 shadow-lg overflow-hidden">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold hyper-text-glow text-white mb-1 sm:mb-2">
              {isUpdate ? "UPDATE" : "ADD"} <span className="text-[#f472b6]">SUPPLIER</span>
            </h2>
            <p className="text-purple-300/70 text-xs tracking-wider">
              Fill the supplier details below
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Select Supplier */}
              <div>
                <label className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                  SELECT SUPPLIER
                </label>
                <select
                  name="id"
                  value={formData.id || "New Supplier"}
                  onChange={setSupplierToUpdate}
                  className="w-full px-3 py-2.5 rounded-sm bg-[#0f0326]/70 border border-[#f472b6]/30 text-white focus:outline-none focus:border-[#f472b6] transition-all"
                >
                  <option value="New Supplier">New Supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Name */}
              <div>
                <label className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                  NAME *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-sm bg-[#0f0326]/70 border border-[#f472b6]/30 text-white focus:outline-none focus:border-[#f472b6] transition-all"
                />
                {errors.name && (
                  <p className="hyper-warning-text text-xs mt-1">{errors.name}</p>
                )}
              </div>
            </div>
            {/* Address */}
            <div>
              <label className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                ADDRESS *
              </label>
              <textarea
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-sm bg-[#0f0326]/70 border border-[#f472b6]/30 text-white focus:outline-none focus:border-[#f472b6] transition-all"
              />
              {errors.address && (
                <p className="hyper-warning-text text-xs mt-1">{errors.address}</p>
              )}
            </div>
            {/* Email */}
            <div>
              <label className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-sm bg-[#0f0326]/70 border border-[#f472b6]/30 text-white focus:outline-none focus:border-[#f472b6] transition-all"
              />
              {errors.email && (
                <p className="hyper-warning-text text-xs mt-1">{errors.email}</p>
              )}
            </div>
            {/* Phone */}
            <div>
              <label className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                PHONE NUMBER *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-sm bg-[#0f0326]/70 border border-[#f472b6]/30 text-white focus:outline-none focus:border-[#f472b6] transition-all"
              />
              {errors.phone && (
                <p className="hyper-warning-text text-xs mt-1">{errors.phone}</p>
              )}
            </div>
            {/* Submit Button */}
            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="hyper-button w-full py-2.5 text-white uppercase tracking-wider text-sm font-medium relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <svg
                        aria-hidden="true"
                        className="inline w-4 h-4 mr-2 text-gray-200 animate-spin fill-[#f472b6]"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span>{isUpdate ? "Updating..." : "Saving..."}</span>
                    </>
                  ) : (
                    isUpdate ? "Update Supplier" : "Register Supplier"
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupplierRegistration;
