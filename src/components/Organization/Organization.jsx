import {useState} from 'react';


function Organization() {
    const [orgData, setOrgData] = useState(
        {
            name: '',
            address: '',
            phone: '',
            email: '',
            logo: null,
            website: '',
            employeeCount:'',
            isActive: true
        }
    );

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitSuccess, setSubmitSucceses] = useState(false);
    const [logoPreview, setLogoPreview] = useState(null);

    const validate = () => {
        const newErrors = {};

        if (!orgData.name) {
            newErrors.name = 'Name is required';
        }

        if( !orgData.address) {
            newErrors.address = 'Address is required';
        }

        if( !orgData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        }
        else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(orgData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if( !orgData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(orgData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!orgData.website) {
            newErrors.website = 'Website is required';
        }
        if (!orgData.employeeCount === ''){
            newErrors.employeeCount = 'Employee Count is required';
        }
        else if (isNaN(orgData.employeeCount) || parseInt(orgData.employeeCount) < 0) {
            newErrors.employeeCount = 'Please enter a valid number of employees';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleChange = (e) => {
        const {name, value, type, checked, files} = e.target;

        if (type === 'file'){
            setOrgData(
                {
                    ...orgData,
                    [name]: files[0]
                }
            );

            const preview = URL.createObjectURL(files[0]);
            setLogoPreview(preview);
        }
        else {
            setOrgData(
                {
                    ...orgData,
                    [name]: type === 'checkbox' ? checked : value
                }
            );
        }
    };

    const handleSubmit = async () => {};
    const handleReset = () => {};




  return (
    <div className="max-w-2xl mx-auto p-6 my-20 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Organization Information</h2>
      
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">
          Organization information submitted successfully!
        </div>
      )}
      
      {errors.submit && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-md">
          {errors.submit}
        </div>
      )}
      
      <div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Organization Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={orgData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter organization name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={orgData.address}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter organization address"
            rows="3"
          />
          {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={orgData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter phone number"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={orgData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter email address"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="logo" className="block text-gray-700 font-medium mb-2">
            Organization Logo
          </label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
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
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
            {logoPreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Preview:</p>
                <div className="h-32 w-32 border border-gray-300 rounded-md flex items-center justify-center overflow-hidden">
                  <img 
                    src={logoPreview} 
                    alt="Logo preview" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            )}
            <p className="text-xs text-gray-500">Select an image file for your organization's logo</p>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="website" className="block text-gray-700 font-medium mb-2">
            Website
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={orgData.website}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.website ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter website URL"
          />
          {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="employeeCount" className="block text-gray-700 font-medium mb-2">
            Number of Employees <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="employeeCount"
            name="employeeCount"
            value={orgData.employeeCount}
            onChange={handleChange}
            min="0"
            className={`w-full px-3 py-2 border rounded-md ${errors.employeeCount ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter number of employees"
          />
          {errors.employeeCount && <p className="mt-1 text-sm text-red-500">{errors.employeeCount}</p>}
        </div>
        
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={orgData.isActive}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-gray-700">
              Organization is active
            </label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isSubmitting ? 'Submitting...' : 'Save Organization'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Organization
