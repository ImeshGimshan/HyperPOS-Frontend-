
import { ResponsiveBar } from "@nivo/bar";
import { nivoTheme } from "../../../utils/nivoTheme";

function UserActivity ( { userData , invoiceData } ) {

  // Process data to show user activity.
  const activityData = processUserActivity ( userData , invoiceData );

  const enhancedTheme = {
    ...nivoTheme,
    grid : {
      ...nivoTheme.grid,
      line : {
        stroke : "rgba( 244 , 114 , 182 , 0.15 )",
        strokeWidth : 1,
        strokeDasharray : "4 4"
      }
    },
    tooltip : {
      container : {
        background : "rgba( 15 , 3 , 38 , 0.9 )",
        color : "#fff",
        fontSize : 12,
        borderRadius : "4px",
        boxShadow : "0 0 10px rgba( 244 , 114 , 182 , 0.5 )",
        border : "1px solid rgba( 244 , 114 , 182 , 0.3 )"
      }
    },
    axis : {
      ...nivoTheme.axis,
      ticks : {
        ...nivoTheme.axis?.ticks,
        text : {
          ...nivoTheme.axis?.ticks?.text,
          fill : "rgba( 255 , 255 , 255 , 0.8 )",
          fontSize : 10
        }
      },
      legend : {
        ...nivoTheme.axis?.legend,
        text : {
          ...nivoTheme.axis?.legend?.text,
          fill : "rgba( 255 , 255 , 255 , 0.9 )",
          fontWeight : "bold",
          fontSize : 11,
          textShadow : "0 0 3px rgba( 244 , 114 , 182 , 0.5 )"
        }
      }
    },
    labels : {
      ...nivoTheme.labels,
      text : {
        ...nivoTheme.labels?.text,
        fill : "#ffffff",
        fontWeight : "bold",
        fontSize : 10
      }
    }
  };

  return (

    <div className = "relative h-full w-full">
      <ResponsiveBar
        data = { activityData }
        keys = { [ 'invoiceCount' ] }
        indexBy = "userName"
        margin = { { 
          top : 20, 
          right : 20, 
          bottom : 50, 
          left : 40 
        } }
        padding = { 0.3 }
        valueScale = { { type : 'linear' } }
        indexScale = { { type : 'band' , round : true } }
        colors = { [ '#f472b6' ] }
        borderColor = { { from : 'color' , modifiers : [ [ 'darker' , 1.6 ] ] } }
        axisTop = { null }
        axisRight = { null }
        axisBottom = { {
          tickSize : 5,
          tickPadding : 5,
          tickRotation : -45,
          legend : 'User',
          legendPosition : 'middle',
          legendOffset : 40
        } }
        axisLeft = { {
          tickSize : 5,
          tickPadding : 5,
          tickRotation : 0,
          legend : 'Invoices',
          legendPosition : 'middle',
          legendOffset : -30
        } }
        labelSkipWidth = { 12 }
        labelSkipHeight = { 12 }
        labelTextColor = { { from : 'color' , modifiers : [ [ 'darker' , 3 ] ] } }
        animate = { true }
        motionStiffness = { 90 }
        motionDamping = { 15 }
        theme = { enhancedTheme }
        defs = { [
          {
            id : 'gradient',
            type : 'linearGradient',
            colors : [
              { offset : 0 , color : '#c026d3' },
              { offset : 100 , color : '#f472b6' }
            ]
          }
        ] }
        fill = { [
          { match : '*' , id : 'gradient' }
        ] }
        borderRadius = { 4 }
        borderWidth = { 1 }
        enableGridY = { true }
        enableLabel = { false }
        isInteractive = { true }
        role = "application"
      />
      
      <div className = "absolute inset-0 pointer-events-none bg-gradient-to-t from-purple-900/10 to-transparent"></div>
      <div className = "absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(244,114,182,0.05)_0%,transparent_70%)]"></div>
    </div>

  );

}

// Helper function to process user activity data.
function processUserActivity ( userData , invoiceData ) {

  if ( !userData || userData.length === 0 || !invoiceData || invoiceData.length === 0 ) {
    return [];
  }

  const userInvoiceCounts = {};
  
  // Initialize counts for all users.
  userData.forEach ( user => {

    const displayName = ( user.name || user.username || `User ${ user.id }` );
    const shortName = displayName.length > 10 ? 
      displayName.substring ( 0 , 8 ) + '...' : 
      displayName;
      
    userInvoiceCounts [ user.id ] = {
      userId : user.id,
      userName : shortName,
      fullName : displayName,
      invoiceCount : 0
    };
  } );
  
  // Count invoices by user.
  invoiceData.forEach ( invoice => {
    const userId = invoice.userId || invoice.createdBy;
    if ( userId && userInvoiceCounts [ userId ] ) {
      userInvoiceCounts [ userId ].invoiceCount += 1;
    }
  } );
  
  // Convert to array and sort by invoice count.
  return Object.values ( userInvoiceCounts )
    .sort ( ( a , b ) => b.invoiceCount - a.invoiceCount )
    .slice ( 0 , 5 ); // Number of users.
}

export default UserActivity;
