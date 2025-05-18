import { useEffect, useState } from 'react';
import { getOrgInfo, updateOrgInfo } from '../../API/APIOrg';

function Organization() {
  const [orgData, setOrgData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    logo: null,
    website: '',
    employeeCount: '',
    isActive: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    handleLoadData();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!orgData.name) newErrors.name = 'Name is required';
    if (!orgData.address) newErrors.address = 'Address is required';
    if (!orgData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(orgData.phone))
      newErrors.phone = 'Please enter a valid phone number';
    if (!orgData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(orgData.email))
      newErrors.email = 'Please enter a valid email address';
    if (orgData.employeeCount === '')
      newErrors.employeeCount = 'Employee Count is required';
    else if (isNaN(orgData.employeeCount) || parseInt(orgData.employeeCount) < 0)
      newErrors.employeeCount = 'Please enter a valid number of employees';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setOrgData({ ...orgData, [name]: files[0] });
      setLogoPreview(URL.createObjectURL(files[0]));
    } else {
      setOrgData({
        ...orgData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async () => {
    setSubmitSuccess(false);
    try {
      setIsSubmitting(true);
      setErrors({});
      if (validate()) {
        await updateOrgInfo(orgData);
        setSubmitSuccess(true);
      }
    } catch (error) {
      setErrors({ submit: 'Failed to submit organization data' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoadData = async () => {
    try {
      const response = await getOrgInfo();
      setOrgData({
        name: response.name,
        address: response.address,
        phone: response.phone,
        email: response.email,
        logo: null,
        website: response.website,
        employeeCount: response.employeeCount,
        isActive: response.isActive,
      });
      setLogoPreview(null);
      setSubmitSuccess(false);
      setErrors({});
    } catch (error) {
      setErrors({ submit: 'Failed to load organization data' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 hyper-bg -z-10"></div>
      <div className="relative w-full max-w-xl mx-auto z-10">
        <div className="relative bg-black/40 backdrop-blur-md p-6 sm:p-10 rounded-lg border border-[#f472b6]/30 shadow-lg overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-bold hyper-text-glow text-white mb-6 text-center">
            <span className="text-[#f472b6]">ORGANIZATION</span> INFO
          </h2>

          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-100/80 text-green-900 rounded-md text-center font-semibold">
              Organization information submitted successfully!
            </div>
          )}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-100/80 text-red-900 rounded-md text-center font-semibold">
              {errors.submit}
            </div>
          )}

          <div className="space-y-4">
            {/* Org Name */}
            <div>
              <label htmlFor="name" className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                Organization Name <span className="text-[#f472b6]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={orgData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2.5 rounded-md bg-[#0f0326]/70 border ${
                  errors.name ? 'border-[#f472b6]' : 'border-[#f472b6]/30'
                } text-white placeholder-purple-300/70 focus:outline-none focus:border-[#f472b6] transition-all`}
                placeholder="Enter organization name"
              />
              {errors.name && <p className="hyper-warning-text text-xs mt-1">{errors.name}</p>}
            </div>
            {/* Address */}
            <div>
              <label htmlFor="address" className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                Address <span className="text-[#f472b6]">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={orgData.address}
                onChange={handleChange}
                className={`w-full px-3 py-2.5 rounded-md bg-[#0f0326]/70 border ${
                  errors.address ? 'border-[#f472b6]' : 'border-[#f472b6]/30'
                } text-white placeholder-purple-300/70 focus:outline-none focus:border-[#f472b6] transition-all`}
                placeholder="Enter organization address"
                rows="3"
              />
              {errors.address && <p className="hyper-warning-text text-xs mt-1">{errors.address}</p>}
            </div>
            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                  Phone Number <span className="text-[#f472b6]">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={orgData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 rounded-md bg-[#0f0326]/70 border ${
                    errors.phone ? 'border-[#f472b6]' : 'border-[#f472b6]/30'
                  } text-white placeholder-purple-300/70 focus:outline-none focus:border-[#f472b6] transition-all`}
                  placeholder="Enter phone number"
                />
                {errors.phone && <p className="hyper-warning-text text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="email" className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                  Email Address <span className="text-[#f472b6]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={orgData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 rounded-md bg-[#0f0326]/70 border ${
                    errors.email ? 'border-[#f472b6]' : 'border-[#f472b6]/30'
                  } text-white placeholder-purple-300/70 focus:outline-none focus:border-[#f472b6] transition-all`}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="hyper-warning-text text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            {/* Logo */}
            <div>
              <label htmlFor="logo" className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                Organization Logo
              </label>
              <input
                type="file"
                id="logo"
                name="logo"
                onChange={handleChange}
                accept="image/*"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#f472b6]/10 file:text-[#f472b6]
                  hover:file:bg-[#f472b6]/20"
              />
              {logoPreview && (
                <div className="mt-2 flex flex-col items-center">
                  <p className="text-xs text-purple-200 mb-1">Preview:</p>
                  <div className="h-32 w-32 border border-[#f472b6] rounded-lg flex items-center justify-center overflow-hidden bg-[#0f0326]/60">
                    <img src={logoPreview} alt="Logo preview" className="max-h-full max-w-full object-contain" />
                  </div>
                </div>
              )}
              <p className="text-xs text-purple-300/80 mt-1">Select an image file for your organization's logo</p>
            </div>
            {/* Website */}
            <div>
              <label htmlFor="website" className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                Website
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={orgData.website}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-md bg-[#0f0326]/70 border border-[#f472b6]/30 text-white placeholder-purple-300/70 focus:outline-none focus:border-[#f472b6] transition-all"
                placeholder="Enter website URL"
              />
            </div>
            {/* Employee Count */}
            <div>
              <label htmlFor="employeeCount" className="hyper-text text-purple-300 text-sm font-medium mb-1 block">
                Number of Employees <span className="text-[#f472b6]">*</span>
              </label>
              <input
                type="number"
                id="employeeCount"
                name="employeeCount"
                value={orgData.employeeCount}
                onChange={handleChange}
                min="0"
                className={`w-full px-3 py-2.5 rounded-md bg-[#0f0326]/70 border ${
                  errors.employeeCount ? 'border-[#f472b6]' : 'border-[#f472b6]/30'
                } text-white placeholder-purple-300/70 focus:outline-none focus:border-[#f472b6] transition-all`}
                placeholder="Enter number of employees"
              />
              {errors.employeeCount && <p className="hyper-warning-text text-xs mt-1">{errors.employeeCount}</p>}
            </div>
            {/* Active Checkbox */}
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={orgData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#f472b6] border-[#f472b6]/40 focus:ring-[#f472b6]"
                />
                <label htmlFor="isActive" className="ml-2 text-purple-200 font-medium">
                  Organization is active
                </label>
              </div>
            </div>
            {/* Actions */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={handleLoadData}
                className="hyper-button bg-[#a1a1aa]/30 hover:bg-[#a1a1aa]/50 text-white border border-[#f472b6]/20 px-6 py-2.5 rounded-lg transition"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="hyper-button bg-[#f472b6] hover:bg-pink-600 border border-[#f472b6]/60 text-white px-6 py-2.5 rounded-lg font-bold transition relative"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      aria-hidden="true"
                      className="inline w-4 h-4 mr-2 text-gray-200 animate-spin fill-white"
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
                    Submitting...
                  </span>
                ) : (
                  "Save Organization"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Organization;
