
// Imports : ( React ).
import React from "react";

// Function : ( SummaryCard ).
function SummaryCard ( { title , value , subtitle , borderColor } ) 
{
  return (

    <div className = { `bg-white rounded-xl shadow-md p-6 border-t-4 ${ borderColor } hover:shadow-lg transition` }>
      <div className = "flex flex-col">
        <span className = "text-gray-500 text-sm">{ title }</span>
        <span className = "text-3xl font-bold text-gray-900 mt-2">
          { value }
        </span>
        <span className = "text-xs text-gray-500 mt-2">
          { subtitle }
        </span>
      </div>
    </div>

  );

}

// Exporting the SummaryCard Component.
export default SummaryCard;
