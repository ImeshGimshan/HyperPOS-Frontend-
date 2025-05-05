
// Imports  : ( React , useState , useEffect ) , ( Calendar ) , ( 'react-calendar/dist/Calendar.css' - styling )
import React, { useState, useEffect } from "react";

import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

// Function : ( Topbar )
function Topbar ( ) {

  // Using useState to store the current date n' time and to set to the current moment.
  const  [ time , setTime ] = useState ( new Date ( ) );
  // Using the useState to track whether the calendar is visible or not.    
  const [ showCalendar , setShowCalendar ] = useState ( false );

  useEffect ( ( ) => {
    const interval = setInterval ( ( ) => setTime ( new Date ( ) ) , 1000 );
    return ( ) => clearInterval ( interval );
  } , [ ] );

  const formattedTime = time.toLocaleTimeString ( [ ] , {
    hour : "2-digit",
    minute : "2-digit",
    second : "2-digit",
  } );

  return (

    <header className = "h-16 bg-purple-900 shadow flex items-center justify-between px-6 text-sm text-gray-100">
      
      <div>Welcome, Admin</div>

      <div className = "flex items-center gap-4 relative">
        <span className = "font-mono tracking-widest">{ formattedTime }</span>
        <button
          // Using the onClick event to toggle the calendar visibility.
          onClick = { ( ) => setShowCalendar ( !showCalendar ) }
          className = "p-1 px-2 bg-purple-100 text-purple-900 rounded hover:bg-purple-200"
        >
          📅
        </button>
        { showCalendar && (
          <div className = "absolute top-12 left-1/2 transform -translate-x-1/2 bg-white text-purple-900 rounded-xl shadow-lg z-50 p-4">
            <Calendar
              value = { time }
              onChange = { ( ) => { } }
              selectRange = { false }
              showNeighboringMonth = { true }
              prev2Label = { null }
              next2Label = { null }
            />
          </div>
        )}
      </div>

      <div className = "flex items-center gap-3">
        <button
          onClick = { ( ) => alert ( "Logging out !" ) } // To be implemented.
          className = "p-1 px-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 border border-transparent hover:border-purple-400"
        >
          Logout
        </button>
      </div>
    </header>

  );

}

// Exporting the component.
export default Topbar;
