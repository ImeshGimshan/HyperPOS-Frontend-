import { useState, useEffect } from "react";
import { Eye, SlidersHorizontal, Edit, Save, X } from "lucide-react";
import { getOrgData, updateOrgData } from "../data/orgData";
import FetchLoader from './FetchLoader';

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
    <div className="fixed inset-0 top-14 sm:top-16 bg-black/70 backdrop-blur-sm flex justify-center items-center z-40 p-4 sm:p-8">
      <div className="bg-hyper-dark/90 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative border border-purple-500/30">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-purple-500/30">
          <div className="w-full text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white hyper-text-glow">
              {isEditing ? "Edit Organization" : "Organization Details"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white text-xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="mx-4 my-3 p-3 bg-red-900/50 text-red-300 rounded-lg text-center border border-red-500/30">
            {error}
          </div>
        )}

        {/* Container with padding to create space for scrollbar */}
        <div className="px-2">
          {/* Scrollable content area with purple-themed scrollbar */}
          <div className="max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-purple-900/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-500/50 hover:[&::-webkit-scrollbar-thumb]:bg-purple-400/70 p-4 sm:p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 sm:space-y-5">
                {/* Basic Information */}
                <div className="bg-purple-900/30 p-3 sm:p-4 rounded-xl border border-purple-500/30">
                  <h3 className="text-md font-semibold text-purple-300 mb-2 sm:mb-3 text-center">Basic Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Organization ID</span>
                      <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{organization.id}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Name</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleChange}
                          className="p-2 bg-hyper-dark/70 border border-purple-500/30 rounded-md shadow-sm text-white focus:outline-none focus:border-pink-500/50"
                          required
                        />
                      ) : (
                        <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{organization.name}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-blue-900/30 p-3 sm:p-4 rounded-xl border border-blue-500/30">
                  <h3 className="text-md font-semibold text-blue-300 mb-2 sm:mb-3 text-center">Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Address</span>
                      {isEditing ? (
                        <textarea
                          name="address"
                          value={formData.address || ""}
                          onChange={handleChange}
                          className="p-2 bg-hyper-dark/70 border border-blue-500/30 rounded-md shadow-sm text-white focus:outline-none focus:border-pink-500/50"
                          rows="2"
                        />
                      ) : (
                        <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{organization.address || "Not provided"}</span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Phone</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone || ""}
                          onChange={handleChange}
                          className="p-2 bg-hyper-dark/70 border border-blue-500/30 rounded-md shadow-sm text-white focus:outline-none focus:border-pink-500/50"
                        />
                      ) : (
                        <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{organization.phone || "Not provided"}</span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Email</span>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email || ""}
                          onChange={handleChange}
                          className="p-2 bg-hyper-dark/70 border border-blue-500/30 rounded-md shadow-sm text-white focus:outline-none focus:border-pink-500/50"
                        />
                      ) : (
                        <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{organization.email || "Not provided"}</span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Website</span>
                      {isEditing ? (
                        <input
                          type="url"
                          name="website"
                          value={formData.website || ""}
                          onChange={handleChange}
                          className="p-2 bg-hyper-dark/70 border border-blue-500/30 rounded-md shadow-sm text-white focus:outline-none focus:border-pink-500/50"
                        />
                      ) : (
                        <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{organization.website || "Not provided"}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="bg-green-900/30 p-3 sm:p-4 rounded-xl border border-green-500/30">
                  <h3 className="text-md font-semibold text-green-300 mb-2 sm:mb-3 text-center">Additional Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Employee Count</span>
                      {isEditing ? (
                        <input
                          type="number"
                          name="employeeCount"
                          value={formData.employeeCount || 0}
                          onChange={handleChange}
                          min="0"
                          className="p-2 bg-hyper-dark/70 border border-green-500/30 rounded-md shadow-sm text-white focus:outline-none focus:border-pink-500/50"
                        />
                      ) : (
                        <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">{organization.employeeCount || 0}</span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Status</span>
                      {isEditing ? (
                        <div className="p-2 bg-hyper-dark/70 border border-green-500/30 rounded-md shadow-sm text-white">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              name="isActive"
                              checked={formData.isActive}
                              onChange={handleChange}
                              className="form-checkbox h-5 w-5 text-purple-600 rounded border-green-500/50"
                            />
                            <span className="ml-2">Active</span>
                          </label>
                        </div>
                      ) : (
                        <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">
                          <span className={`px-2 py-1 rounded-full text-xs ${organization.isActive ? 'bg-green-900/50 text-green-300 border border-green-500/30' : 'bg-red-900/50 text-red-300 border border-red-500/30'}`}>
                            {organization.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Date Information */}
                <div className="bg-amber-900/30 p-3 sm:p-4 rounded-xl border border-amber-500/30">
                  <h3 className="text-md font-semibold text-amber-300 mb-2 sm:mb-3 text-center">Date Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Created At</span>
                      <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">
                        {formatDate(organization.createdAt)}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Updated At</span>
                      <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">
                        {formatDate(organization.updatedAt)}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Created By</span>
                      <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">
                        {organization.createdBy || "Not available"}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium text-gray-400">Updated By</span>
                      <span className="p-2 bg-hyper-dark/50 rounded-md shadow-sm text-white">
                        {organization.updatedBy || "Not available"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition duration-200 flex items-center gap-2 cursor-pointer"
                    disabled={isSubmitting}
                  >
                    <X size={16} /> Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition duration-200 flex items-center gap-2 cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : <><Save size={16} /> Save</>}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        {!isEditing && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-purple-500/30">
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition duration-200 flex items-center gap-2 cursor-pointer"
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
            </div>
          </div>
        )}
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
    <div className="fixed inset-0 top-14 sm:top-16 bg-black/70 backdrop-blur-sm flex justify-center items-center z-40 p-4 sm:p-8">
      <div className="bg-hyper-dark/90 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden relative border border-purple-500/30">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white text-xl cursor-pointer"
        >
          &times;
        </button>

        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-purple-500/30">
          <h2 className="text-xl font-semibold text-white hyper-text-glow text-center">Advanced Filters</h2>
        </div>

        <div className="p-4 sm:p-6">
          {/* Organization Name */}
          <div className="mb-4">
            <h3 className="text-md font-medium text-purple-300 mb-2">Organization Name</h3>
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="flex flex-col">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Filter by name..."
                  className="p-2 rounded-lg bg-hyper-dark/70 border border-purple-500/30 text-white focus:outline-none focus:border-pink-500/50"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mb-4">
            <h3 className="text-md font-medium text-purple-300 mb-2">Status</h3>
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="flex flex-col">
                <select
                  value={isActive}
                  onChange={(e) => setIsActive(e.target.value)}
                  className="p-2 rounded-lg bg-hyper-dark/70 border border-purple-500/30 text-white focus:outline-none focus:border-pink-500/50"
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
            <h3 className="text-md font-medium text-purple-300 mb-2">Employee Count</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col">
                <label className="text-gray-400 mb-1">Min Employees</label>
                <input 
                  type="number" 
                  className="p-2 rounded-lg bg-hyper-dark/70 border border-purple-500/30 text-white focus:outline-none focus:border-pink-500/50" 
                  value={minEmployees} 
                  onChange={(e) => setMinEmployees(e.target.value)} 
                  min="0"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 mb-1">Max Employees</label>
                <input 
                  type="number" 
                  className="p-2 rounded-lg bg-hyper-dark/70 border border-purple-500/30 text-white focus:outline-none focus:border-pink-500/50" 
                  value={maxEmployees}
                  onChange={(e) => setMaxEmployees(e.target.value)} 
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={handleReset} 
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition cursor-pointer"
            >
              Reset
            </button>
            <button 
              onClick={handleApply} 
              className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Function: (OrganizationPage)
function OrganizationPage() {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch organization data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setIsFetching(true);
        const data = await getOrgData();
        
        // If data is an array, use it directly, otherwise wrap it in an array
        const orgsArray = Array.isArray(data) ? data : [data].filter(Boolean);
        setOrganizations(orgsArray);
      } catch (err) {
        setError("Failed to fetch organization data");
        console.error("Error fetching organization data:", err);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setIsFetching(false);
        }, 1500); // Keep the fetch loader visible for at least 1.5 seconds
      }
    };

    fetchData();
  }, []);

  // Handle organization update
  const handleUpdateOrg = async (id, updatedData) => {
    try {
      const updatedOrg = await updateOrgData(updatedData);
      
      // Update the organizations list with the updated organization
      setOrganizations(prevOrgs => 
        prevOrgs.map(org => org.id === id ? updatedOrg : org)
      );
      
      // Update the selected organization if it's currently being viewed
      if (selectedOrg && selectedOrg.id === id) {
        setSelectedOrg(updatedOrg);
      }
      
      return updatedOrg;
    } catch (error) {
      console.error("Error updating organization:", error);
      throw error;
    }
  };

  // Filter organizations based on search term and filters
  const filteredOrganizations = organizations.filter(org => {
    // Skip invalid entries
    if (!org) return false;

    // Search across all fields
    const searchFields = [
      org.id?.toString() || '',
      org.name || '',
      org.email || '',
      org.phone || '',
      org.address || ''
    ];

    const matchesSearch = searchFields.some(field => 
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply filters
    const matchesName = !filters.name || 
      (org.name && org.name.toLowerCase().includes(filters.name.toLowerCase()));

    const matchesStatus = filters.isActive === undefined || 
      org.isActive === filters.isActive;

    const matchesEmployeeCount = 
      (!filters.minEmployees || (org.employeeCount && org.employeeCount >= filters.minEmployees)) && 
      (!filters.maxEmployees || (org.employeeCount && org.employeeCount <= filters.maxEmployees));

    // Return true if all conditions are met
    return matchesSearch && matchesName && matchesStatus && matchesEmployeeCount;
  });

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white hyper-text-glow text-center">Organizations</h1>

      {/* Search and filter controls */}
      <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
        <input
          type="text"
          placeholder="Search organizations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 bg-hyper-dark/50 border border-purple-500/30 rounded-lg shadow-sm focus:outline-none focus:border-pink-500/50 text-white w-full sm:w-auto"
        />
        <button
          onClick={() => setShowFilterModal(true)}
          className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <SlidersHorizontal size={16} /> Options
        </button>
      </div>

      {/* Organizations table */}
      <div className="bg-hyper-dark/30 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-purple-500/20">
        {isFetching ? (
          <FetchLoader />
        ) : loading ? (
          <div className="p-6 text-center text-white">Loading organization data...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-400">{error}</div>
        ) : (
          <div className="relative">
            <div className="max-h-[70vh] overflow-y-auto overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-300/50 hover:[&::-webkit-scrollbar-thumb]:bg-purple-400/70">
              <table className="w-full text-sm text-left">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-purple-800 text-white shadow-sm">
                    <th className="p-3 whitespace-nowrap rounded-tl-lg">ID</th>
                    <th className="p-3 whitespace-nowrap">Name</th>
                    <th className="p-3 whitespace-nowrap hidden sm:table-cell">Email</th>
                    <th className="p-3 whitespace-nowrap hidden md:table-cell">Phone</th>
                    <th className="p-3 whitespace-nowrap hidden lg:table-cell">Employees</th>
                    <th className="p-3 whitespace-nowrap">Status</th>
                    <th className="p-3 text-center whitespace-nowrap rounded-tr-lg">View</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrganizations.length > 0 ? (
                    filteredOrganizations.map((org) => (
                      <tr key={org.id} className="border-t border-purple-500/10 text-gray-300 hover:bg-purple-900/20 transition duration-200 ease-in-out">
                        <td className="p-3 font-medium">{org.id}</td>
                        <td className="p-3">{org.name}</td>
                        <td className="p-3 hidden sm:table-cell">{org.email || "—"}</td>
                        <td className="p-3 hidden md:table-cell">{org.phone || "—"}</td>
                        <td className="p-3 hidden lg:table-cell">{org.employeeCount || 0}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${org.isActive ? 'bg-green-900/50 text-green-300 border border-green-500/30' : 'bg-red-900/50 text-red-300 border border-red-500/30'}`}>
                            {org.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSelectedOrg(org)}
                            className="text-purple-400 hover:text-purple-300 cursor-pointer transition"
                            aria-label="View organization details"
                          >
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-3 text-center font-medium text-gray-500">No organizations found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedOrg && (
        <ViewEditModal 
          organization={selectedOrg} 
          onClose={() => setSelectedOrg(null)} 
          onUpdate={handleUpdateOrg}
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