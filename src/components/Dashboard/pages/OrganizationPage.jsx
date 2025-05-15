  import { useState, useEffect } from "react";
  import { Eye, SlidersHorizontal, Edit, Save, X } from "lucide-react";
  import { getOrgData , updateOrgData } from "../data/orgData";
  // import FetchLoader from "../../ui/FetchLoader";

  // Function: (ViewEditModal)
  // Passing: (organization - The data props, onClose - To close the modal, onUpdate - To update the organization data)
  function ViewEditModal({ organization, onClose, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...organization });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Function to format date strings
    const formatDate = (dateString) => {
      if (!dateString) return "Not available";
      const date = new Date(dateString);
      return date.toLocaleString();
    };

    // Handle form input changes
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
    
      // Handle different input types
      if (type === 'number') {
        setFormData({ ...formData, [name]: parseInt(value, 10) });
      } else if (type === 'checkbox') {
        setFormData({ ...formData, [name]: checked });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError(null);

      try {
        await onUpdate(organization.id, formData);
        setIsEditing(false);
      } catch (err) {
        setError("Failed to update organization. Please try again.");
        console.error("Update error:", err);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="w-full text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-purple-900">
                {isEditing ? "Edit Organization" : "Organization Details"}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-600 hover:text-gray-900 text-xl cursor-pointer"
            >
              &times;
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Basic Information */}
              <div className="bg-purple-50 p-3 rounded-lg">
                <h3 className="text-md font-semibold text-purple-800 mb-2 text-center">Basic Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Organization ID</span>
                    <span className="p-2 bg-white rounded-md">{organization.id}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Name</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                      />
                    ) : (
                      <span className="p-2 bg-white rounded-md">{organization.name}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="text-md font-semibold text-blue-800 mb-2 text-center">Contact Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Address</span>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={formData.address || ""}
                        onChange={handleChange}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        rows="2"
                      />
                    ) : (
                      <span className="p-2 bg-white rounded-md">{organization.address || "Not provided"}</span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Phone</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handleChange}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    ) : (
                      <span className="p-2 bg-white rounded-md">{organization.phone || "Not provided"}</span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Email</span>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    ) : (
                      <span className="p-2 bg-white rounded-md">{organization.email || "Not provided"}</span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Website</span>
                    {isEditing ? (
                      <input
                        type="url"
                        name="website"
                        value={formData.website || ""}
                        onChange={handleChange}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    ) : (
                      <span className="p-2 bg-white rounded-md">{organization.website || "Not provided"}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="bg-green-50 p-3 rounded-lg">
                <h3 className="text-md font-semibold text-green-800 mb-2 text-center">Additional Details</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Employee Count</span>
                    {isEditing ? (
                      <input
                        type="number"
                        name="employeeCount"
                        value={formData.employeeCount || 0}
                        onChange={handleChange}
                        min="0"
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    ) : (
                      <span className="p-2 bg-white rounded-md">{organization.employeeCount || 0}</span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Status</span>
                    {isEditing ? (
                      <div className="p-2 bg-white rounded-md">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            className="form-checkbox h-5 w-5 text-purple-600"
                          />
                          <span className="ml-2">Active</span>
                        </label>
                      </div>
                    ) : (
                      <span className="p-2 bg-white rounded-md">
                        <span className={`px-2 py-1 rounded-full text-xs ${organization.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {organization.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Date Information */}
              <div className="bg-amber-50 p-3 rounded-lg">
                <h3 className="text-md font-semibold text-amber-800 mb-2 text-center">Date Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Created At</span>
                    <span className="p-2 bg-white rounded-md">
                      {formatDate(organization.createdAt)}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Updated At</span>
                    <span className="p-2 bg-white rounded-md">
                      {formatDate(organization.updatedAt)}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Created By</span>
                    <span className="p-2 bg-white rounded-md">
                      {organization.createdBy || "Not available"}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">Updated By</span>
                    <span className="p-2 bg-white rounded-md">
                      {organization.updatedBy || "Not available"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200 flex items-center gap-2 cursor-pointer"
                    disabled={isSubmitting}
                  >
                    <X size={16} /> Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 flex items-center gap-2 cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : <><Save size={16} /> Save</>}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center gap-2 cursor-pointer"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition duration-200 cursor-pointer"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Function: (FilterModal)
  function FilterModal({ onClose, onApply, currentFilters }) {
    const [name, setName] = useState(currentFilters.name || "");
    const [isActive, setIsActive] = useState(
      currentFilters.isActive === undefined ? "" : currentFilters.isActive.toString()
    );
    const [minEmployees, setMinEmployees] = useState(currentFilters.minEmployees || "");
    const [maxEmployees, setMaxEmployees] = useState(currentFilters.maxEmployees || "");

    const handleApply = () => {
      onApply({
        name,
        isActive: isActive === "" ? undefined : isActive === "true",
        minEmployees: minEmployees === "" ? undefined : Number(minEmployees),
        maxEmployees: maxEmployees === "" ? undefined : Number(maxEmployees)
      });
      onClose();
    };

    const handleReset = () => {
      setName("");
      setIsActive("");
      setMinEmployees("");
      setMaxEmployees("");
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto m-4">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-600 hover:text-gray-900 text-xl cursor-pointer"
          >
            &times;
          </button>

          <h2 className="text-xl font-semibold text-purple-900 mb-4 text-center">Advanced Filters</h2>

          {/* Organization Name */}
          <div className="mb-4">
            <h3 className="text-md font-medium text-purple-700 mb-2">Organization Name</h3>
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="flex flex-col">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Filter by name..."
                  className="p-2 rounded-lg border border-gray-300 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mb-4">
            <h3 className="text-md font-medium text-purple-700 mb-2">Status</h3>
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="flex flex-col">
                <select
                  value={isActive}
                  onChange={(e) => setIsActive(e.target.value)}
                  className="p-2 rounded-lg border border-gray-300 focus:outline-none"
                >
                  <option value="">All</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Employee Count */}
          <div className="mb-4">
            <h3 className="text-md font-medium text-purple-700 mb-2">Employee Count</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col">
                <label className="text-gray-600 mb-1">Min Employees</label>
                <input 
                  type="number" 
                  className="p-2 rounded-lg border border-gray-300" 
                  value={minEmployees} 
                  onChange={(e) => setMinEmployees(e.target.value)} 
                  min="0"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 mb-1">Max Employees</label>
                <input 
                  type="number" 
                  className="p-2 rounded-lg border border-gray-300" 
                  value={maxEmployees} 
                  onChange={(e) => setMaxEmployees(e.target.value)} 
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button onClick={handleReset} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 cursor-pointer">Reset</button>
            <button onClick={handleApply} className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 cursor-pointer">Apply</button>
          </div>
        </div>
      </div>
    );
  }

  // Function: (OrganizationPage)
  function OrganizationPage() {
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filters, setFilters] = useState({});
    const [orgData, setOrganizationData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    // Fetch organization data from API when component mounts
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          setIsFetching(true);
          const data = await getOrgData();

          if (data) {
            setOrganizationData(data);
          } else {
            setError("No data returned from API");
          }
        } catch (err) {
          setError("Failed to fetch organization data");
          console.error("Error fetching organization data:", err);
        } finally {
          setLoading(false);
          setTimeout(() => {
            setIsFetching(false);
          }, 3000);
        }
      };

      fetchData();
    }, []);

    // Function to handle organization update
    const handleUpdateOrganization = async (id, updatedData) => {
      try {
        // Include the ID in the data object if needed by your API
        const dataToUpdate = { ...updatedData, id };
        const response = await updateOrgData(dataToUpdate);
      
        // Update the local state with the updated organization
        setOrganizationData(prevData => 
          prevData.map(org => org.id === id ? { ...org, ...updatedData } : org)
        );
      
        // Show success message
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      
        return response;
      } catch (error) {
        console.error("Error updating organization:", error);
        throw error;
      }
    };

    // Function to format date for display in the table
    const formatDate = (dateString) => {
      if (!dateString) return "—";
      const date = new Date(dateString);
      return date.toLocaleDateString();
    };

    // Filtering the data based on the search term and other filters
    const filteredData = orgData.filter((org) => {
      // Search across all fields
      const searchFields = [
        org.id?.toString() || "",
        org.name || "",
        org.email || "",
        org.phone || "",
        org.address || "",
        org.website || ""
      ];

      const matchesSearch = searchFields.some(field => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Apply filters
      const matchesName = !filters.name || 
        org.name?.toLowerCase().includes(filters.name.toLowerCase());

      const matchesStatus = filters.isActive === undefined || 
        org.isActive === filters.isActive;

      const matchesEmployeeCount = 
        (!filters.minEmployees || org.employeeCount >= filters.minEmployees) && 
        (!filters.maxEmployees || org.employeeCount <= filters.maxEmployees);

      // Return true if all conditions are met
      return matchesSearch && matchesName && matchesStatus && matchesEmployeeCount;
    });

    return (
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-purple-900 text-center">Organizations</h1>

        {/* Success message */}
        {updateSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
            Organization updated successfully!
          </div>
        )}

        {/* Responsive search and filter controls */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-auto"
          />
          <button
            onClick={() => setShowFilterModal(true)}
            className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <SlidersHorizontal size={16} /> Options
          </button>
        </div>

        {/* Responsive table container */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          {isFetching ? (
            <FetchLoader />
          ) : loading ? (
            <div className="p-6 text-center">Loading organization data...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">{error}</div>
          ) : (
            <div className="relative">
              <div className="max-h-[70vh] overflow-y-auto overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-300/50 hover:[&::-webkit-scrollbar-thumb]:bg-purple-400/70">
                <table className="w-full text-sm text-left">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-purple-800 text-white shadow-sm">
                      <th className="p-3 whitespace-nowrap rounded-tl-lg">ID</th>
                      <th className="p-3 whitespace-nowrap">Name</th>
                      <th className="p-3 whitespace-nowrap hidden md:table-cell">Email</th>
                      <th className="p-3 whitespace-nowrap hidden lg:table-cell">Phone</th>
                      <th className="p-3 whitespace-nowrap">Status</th>
                      <th className="p-3 whitespace-nowrap hidden xl:table-cell">Updated At</th>
                      <th className="p-3 text-center whitespace-nowrap rounded-tr-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((org) => (
                        <tr key={org.id} className="border-t hover:bg-gray-50 transition duration-200 ease-in-out">
                          <td className="p-3 font-medium">{org.id}</td>
                          <td className="p-3">{org.name || "—"}</td>
                          <td className="p-3 hidden md:table-cell">{org.email || "—"}</td>
                          <td className="p-3 hidden lg:table-cell">{org.phone || "—"}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${org.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {org.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="p-3 hidden xl:table-cell">{formatDate(org.updatedAt)}</td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => setSelectedOrganization(org)}
                              className="text-purple-700 hover:text-purple-900 cursor-pointer transition"
                              aria-label="View organization details"
                            >
                              <Eye size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="p-3 text-center font-medium text-gray-500">No organization records found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {selectedOrganization && (
          <ViewEditModal 
            organization={selectedOrganization} 
            onClose={() => setSelectedOrganization(null)} 
            onUpdate={handleUpdateOrganization}
          />
        )}
      
        {showFilterModal && (
          <FilterModal
            currentFilters={filters}
            onClose={() => setShowFilterModal(false)}
            onApply={setFilters}
          />
        )}
      </div>
    );
  }

  // Exporting the component
  export default OrganizationPage;