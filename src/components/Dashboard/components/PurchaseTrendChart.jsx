
import React from 'react';

import { ResponsiveLine } from "@nivo/line";
import { nivoTheme } from "../../../utils/nivoTheme";

function PurchaseTrendChart ( { grnData } ) {

  // Process data to get purchases by month.
  const purchasesByMonth = React.useMemo ( () => {
    return processPurchasesByMonth ( grnData );
  } , [ grnData ] );

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
    crosshair : {
      line : {
        stroke : "#c026d3",
        strokeWidth : 1,
        strokeOpacity : 0.8,
        strokeDasharray : "5 5"
      }
    },
    tooltip : {
      container : {
        background : "rgba( 15 , 3 , 38 , 0.9 )",
        color : "#fff",
        fontSize : 12,
        borderRadius : "4px",
        boxShadow : "0 0 10px rgba( 192 , 38 , 211 , 0.5 )",
        border : "1px solid rgba( 192 , 38 , 211 , 0.3 )"
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
          textShadow : "0 0 3px rgba( 192 , 38 , 211 , 0.5 )"
        }
      }
    }
  };

  return (
    <div className = "relative w-full h-full overflow-hidden">
      <ResponsiveLine
        data = { purchasesByMonth }
        margin = { { 
          top : 20, 
          right : 20, 
          bottom : 40, 
          left : 65
        } }
        xScale = { { type : 'point' } }
        yScale = { { 
          type : 'linear', 
          min : 'auto', 
          max : 'auto', 
          stacked : false, 
          reverse : false 
        } }
        yFormat = " >-.2f"
        axisTop = { null }
        axisRight = { null }
        axisBottom = { {
          orient : 'bottom',
          tickSize : 5,
          tickPadding : 5,
          tickRotation : 0,
          legend : 'Month',
          legendOffset : 30,
          legendPosition : 'middle'
        } }
        axisLeft = { {
          orient : 'left',
          tickSize : 5,
          tickPadding : 8,
          tickRotation : 0,
          legend : 'Purchases ( Rs )',
          legendOffset : -45,
          legendPosition : 'middle',
          format : value => 
            Math.abs ( value ) >= 1000000
              ? `${ ( value / 1000000 ).toFixed ( 1 ) }M`
              : Math.abs ( value ) >= 1000
              ? `${ ( value / 1000 ).toFixed ( 1 ) }K`
              : value,
          tickValues : 5
        } }
        pointSize = { 8 }
        pointColor = { { theme : 'background' } }
        pointBorderWidth = { 2 }
        pointBorderColor = { { from : 'serieColor' } }
        pointLabelYOffset = { -12 }
        useMesh = { true }
        colors = { [ '#f472b6' ] }
        lineWidth = { 3 }
        enableArea = { true }
        areaOpacity = { 0.15 }
        enableSlices = "x"
        curve = "monotoneX"
        defs = { [
          {
            id : 'gradientA',
            type : 'linearGradient',
            colors : [
              { offset : 0 , color : '#c026d3' , opacity : 0.6 },
              { offset : 100 , color : '#f472b6' , opacity : 0 } 
            ]
          }
        ] }
        fill = { [ { match : '*' , id : 'gradientA' } ] } 
        theme = { enhancedTheme }
        animate = { true }
        motionConfig = "gentle"
      />

      <div className = "absolute inset-0 pointer-events-none bg-gradient-to-t from-purple-900/10 to-transparent"></div>
      <div className = "absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(192,38,211,0.05)_0%,transparent_70%)]"></div>
    </div>
  );
}

// Helper function to process purchases by month.
function processPurchasesByMonth ( grnData ) {

  if ( !grnData || !Array.isArray ( grnData ) || grnData.length === 0 ) {
    return [ { id : 'No Data' , color : "#f472b6" , data : [] } ]; // Updated color to match
  }

  try {

    const currentYear = new Date ().getFullYear ();

    const months = [
      'Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun', 
      'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec'
    ];

    const purchaseData = months.map ( month => ( { x : month , y : 0 } ) );

    grnData.forEach ( grn => {
      
      try {
        
        const dateString = grn.updatedAt || grn.createdAt;
        const total = Number ( grn.total ) || 0;
        
        const date = new Date ( dateString );

        if ( date && !isNaN ( date.getTime () ) && !isNaN ( total ) ) {

          if ( date.getFullYear () === currentYear ) {
            const month = date.getMonth ();

            purchaseData [ month ].y += total;
          }
          
        }
        
      } catch ( error ) {
        
        console.error ( "Error processing individual GRN:" , error , grn );
        
      }
      
    } );

    purchaseData.forEach ( data => {
      data.y = Number ( data.y.toFixed ( 2 ) );
    } );

    return [
      {
        id : `Purchases ${ currentYear }`,
        color : "#f472b6", 
        data : purchaseData
      }
    ];
    
  } catch ( error ) {
    
    console.error ( "Error processing purchase data:" , error );
    return [ { id : 'Error' , color : "#f472b6" , data : [] } ]; 
    
  }
}

export default PurchaseTrendChart;
