
// Imports : ( React , useState ) , ( Eye , SlidersHorizontal ) , ( userData )
import React, { useState } from "react";

import { Eye, SlidersHorizontal } from "lucide-react";

import userData from "../data/userData";

// Function : ( ViewModal )
// Passing : ( user - The data props. , onClose - To close the filter modal. )
function ViewModal ( { user, onClose } ) {

  return (

    <div className = "fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      <div className = "bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">

        <div className = "flex justify-between items-center mb-4">

          <div className = "w-full text-center">
            <h2 className = "text-2xl font-bold text-purple-900">User Details</h2>
          </div>

          <button
            onClick = { onClose }
            className = "absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl cursor-pointer"
          >
            &times;
          </button>

        </div>
        
        <div className = "space-y-4">

          {/* Basic Information */}
          <div className = "bg-purple-50 p-3 rounded-lg">

            <h3 className = "text-md font-semibold text-purple-800 mb-2 text-center">Basic Information</h3>

            <div className = "grid grid-cols-2 gap-3 text-sm">

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">User ID</span>
                <span className = "p-2 bg-white rounded-md">{ user.id }</span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Role</span>
                <span className = "p-2 bg-white rounded-md capitalize">{ user.role }</span>
              </div>

              <div className = "flex flex-col col-span-2">
                <span className = "font-medium text-gray-600">Name</span>
                <span className = "p-2 bg-white rounded-md">{ user.name }</span>
              </div>

            </div>

          </div>
          
          {/* Contact Information */}
          <div className = "bg-blue-50 p-3 rounded-lg">

            <h3 className = "text-md font-semibold text-blue-800 mb-2 text-center">Contact Information</h3>

            <div className = "grid grid-cols-1 gap-3 text-sm">

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Email</span>
                <span className = "p-2 bg-white rounded-md">{ user.email || "Not provided" }</span>
              </div>

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Phone</span>
                <span className = "p-2 bg-white rounded-md">{ user.phone || "Not provided" }</span>
              </div>

            </div>

          </div>
          
          {/* Security Information */}
          <div className = "bg-red-50 p-3 rounded-lg">

            <h3 className = "text-md font-semibold text-red-800 mb-2 text-center">Security Information</h3>

            <div className = "grid grid-cols-1 gap-3 text-sm">

              <div className = "flex flex-col">
                <span className = "font-medium text-gray-600">Password</span>
                <span className = "p-2 bg-white rounded-md">••••••••••</span>
              </div>

            </div>

          </div>

        </div>
        
        <div className = "mt-6 flex justify-center">

          <button
            onClick = { onClose }
            className = "px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition duration-200 cursor-pointer"
          >
            Close
          </button>

        </div>

      </div>

    </div>

  );

}

// Function : ( FilterModal )
// Passing : ( onClose - To close the filter modal. , onApply - To apply the filter. , roleList - To show the role list. , currentFilters - To show the current filters. )
function FilterModal ( { onClose, onApply, roleList, currentFilters } ) {

  // Using useState to store the values of the filters.
  const [ name, setName ] = useState ( currentFilters.name || "" );
  const [ role, setRole ] = useState ( currentFilters.role || "" );
  const [ email, setEmail ] = useState ( currentFilters.email || "" );
  const [ phone, setPhone ] = useState ( currentFilters.phone || "" );

  // Arrow Function : ( handleApply )
  const handleApply = ( ) => {

    // Calling the onApply function to apply the filter.
    onApply ( { name, role, email, phone } );
    // Calling the onClose function to close the modal.
    onClose ( );

  };

  // Arrow Function : ( handleReset )
  const handleReset = ( ) => {

    // Setting the values of the filters to empty.
    setName ( "" );
    setRole ( "" );
    setEmail ( "" );
    setPhone ( "" );

  };

  return (

    <div className = "fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className = "bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">

        <button
          onClick = { onClose }
          className = "absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl cursor-pointer"
        >
          &times;
        </button>
        
        <h2 className = "text-xl font-semibold text-purple-900 mb-4 text-center">Advanced Filters</h2>
        
        {/* User Information Section */}
        <div className = "mb-4">

          <h3 className = "text-md font-medium text-purple-700 mb-2 text-center">User Information</h3>

          <div className = "grid grid-cols-2 gap-4 text-sm">

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Name</label>
              <input
                type = "text"
                value = { name }
                onChange = { ( e ) => setName ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
                placeholder = "Filter by name"
              />

            </div>

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Role</label>
              <select
                value = { role }
                onChange = { ( e ) => setRole ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
              >
                <option value = "">All</option>
                { roleList.map ( ( r ) => (
                  <option key = { r } value = { r }>{ r }</option>
                ) ) }
              </select>

            </div>

          </div>

        </div>
        
        {/* Contact Information Section */}
        <div className = "mb-4">

          <h3 className = "text-md font-medium text-purple-700 mb-2 text-center">Contact Information</h3>

          <div className = "grid grid-cols-2 gap-4 text-sm">

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Email</label>
              <input
                type = "text"
                value = { email }
                onChange = { ( e ) => setEmail ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
                placeholder = "Filter by email"
              />

            </div>

            <div className = "flex flex-col">

              <label className = "text-gray-600 mb-1">Phone</label>
              <input
                type = "text"
                value = { phone }
                onChange = { ( e ) => setPhone ( e.target.value ) }
                className = "p-2 rounded-lg border border-gray-300 focus:outline-none"
                placeholder = "Filter by phone"
              />

            </div>

          </div>

        </div>
        
        <div className = "flex justify-center gap-4 mt-6">
          <button onClick = { handleReset } className = "px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 cursor-pointer">Reset</button>
          <button onClick = { handleApply } className = "px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 cursor-pointer">Apply</button>
        </div>

      </div>

    </div>

  );

}

// Function : ( UserPage )
function UserPage ( ) {

  // Using the useState to create a variable and then update it accordingly by the function.
  const [ selectedUser, setSelectedUser ] = useState ( null );
  const [ searchTerm, setSearchTerm ] = useState ( "" );
  const [ showFilterModal, setShowFilterModal ] = useState ( false );
  const [ filters, setFilters ] = useState ( { } );

  const roleList = [ ...new Set ( userData.map ( ( user ) => user.role ) ) ];

  // Filtering the data based on the search term and other filters
  const filteredData = userData.filter ( ( user ) => {

    // Search across all fields
    const searchFields = [
      user.id.toString ( ),
      user.name,
      user.email || "",
      user.phone || "",
      user.role
    ];
    
    const matchesSearch = searchFields.some ( field => 
      field.toLowerCase ( ).includes ( searchTerm.toLowerCase ( ) )
    );

    // Apply filters
    const matchesName = !filters.name || user.name.toLowerCase ( ).includes ( filters.name.toLowerCase ( ) );
    const matchesRole = !filters.role || user.role === filters.role;
    const matchesEmail = !filters.email || ( user.email && user.email.toLowerCase ( ).includes ( filters.email.toLowerCase ( ) ) );
    const matchesPhone = !filters.phone || ( user.phone && user.phone.includes ( filters.phone ) );

    // Return true if all conditions are met
    return matchesSearch && matchesName && matchesRole && matchesEmail && matchesPhone;

  } );

  return (

    <div className = "p-6">

      <h1 className = "text-3xl font-bold mb-6 text-purple-900 text-center">Users</h1>

      <div className = "flex flex-wrap justify-center gap-4 mb-6">

        <input
          type = "text"
          placeholder = "Search..."
          value = { searchTerm }
          onChange = { ( e ) => setSearchTerm ( e.target.value ) }
          className = "px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick = { ( ) => setShowFilterModal ( true ) }
          className = "px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition flex items-center gap-2 cursor-pointer"
        >
          <SlidersHorizontal size = { 16 } /> Options
        </button>

      </div>

      <div className = "overflow-x-auto bg-white rounded-xl shadow-md">

        <table className = "min-w-full text-sm text-left">

          <thead>
            <tr className = "bg-purple-800 text-white">
              <th className = "p-3">ID</th>
              <th className = "p-3">Name</th>
              <th className = "p-3">Email</th>
              <th className = "p-3">Phone</th>
              <th className = "p-3">Role</th>
              <th className = "p-3 text-center">View</th>
            </tr>
          </thead>

          <tbody>
            { filteredData.map ( ( user ) => (

              <tr key = { user.id } className = "border-t hover:bg-gray-50 transition duration-200 ease-in-out">
                <td className = "p-3">{ user.id }</td>
                <td className = "p-3">{ user.name }</td>
                <td className = "p-3">{ user.email || "—" }</td>
                <td className = "p-3">{ user.phone || "—" }</td>
                <td className = "p-3 capitalize">{ user.role }</td>
                <td className = "p-3 text-center">
                  <button
                    onClick = { ( ) => setSelectedUser ( user ) }
                    className = "text-purple-700 hover:text-purple-900 cursor-pointer transition"
                  >
                    <Eye size = { 18 } />
                  </button>
                </td>
              </tr>

            ) ) }
          </tbody>

        </table>

      </div>

      { selectedUser && <ViewModal user = { selectedUser } onClose = { ( ) => setSelectedUser ( null ) } /> }
      { showFilterModal && (

        <FilterModal
          roleList = { roleList }
          currentFilters = { filters }
          onClose = { ( ) => setShowFilterModal ( false ) }
          onApply = { setFilters }
        />

      ) }

    </div>

  );

}

// Exporting the component
export default UserPage;

