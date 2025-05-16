
import { useMemo } from "react";

import { ResponsiveLine } from "@nivo/line";
import { nivoTheme } from "../../../utils/nivoTheme";

function RevenueGrowthChart ( { invoiceData } ) {

  // Process data for revenue growth.
  const revenueGrowthData = useMemo ( () => {
    return processRevenueGrowth ( invoiceData );
  } , [ invoiceData ] );

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
        stroke : "#f472b6",
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
    }
  };

  return (
    <div className = "relative w-full h-full overflow-hidden">
      <h3 className = "text-white text-lg font-semibold mb-2">Revenue Growth</h3>
    
      <div className = "w-full h-[calc(100%-2rem)]">
        <ResponsiveLine
          data = { revenueGrowthData }
          margin = { { top : 20 , right : 20 , bottom : 40 , left : 65 } }
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
            legend : 'Week',
            legendOffset : 30,
            legendPosition : 'middle'
          } }
          axisLeft = { {
            orient : 'left',
            tickSize : 5,
            tickPadding : 8,
            tickRotation : 0,
            legend : 'Revenue ( Rs )',
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
      </div>
    
      <div className = "absolute inset-0 pointer-events-none bg-gradient-to-t from-purple-900/10 to-transparent"></div>
      <div className = "absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(244,114,182,0.05)_0%,transparent_70%)]"></div>
    </div>
  );
}

// Helper function to process revenue growth data.
function processRevenueGrowth ( invoiceData ) {

  if ( !invoiceData || !Array.isArray ( invoiceData ) || invoiceData.length === 0 ) {
    return [ { id : 'No Data' , color : "#f472b6" , data : [] } ];
  }

  try {
  
    const currentDate = new Date ();
  
    // Calculate date 8 weeks ago.
    const startDate = new Date ();
    startDate.setDate ( currentDate.getDate () - ( 8 * 7 ) );
  
    // Initialize weekly data.
    const weeklyData = Array ( 8 ).fill ().map ( ( _ , i ) => {
      const weekStart = new Date ( startDate );
      weekStart.setDate ( startDate.getDate () + ( i * 7 ) );
    
      const weekEnd = new Date ( weekStart );
      weekEnd.setDate ( weekStart.getDate () + 6 );
    
      return {
        week : `W${ i + 1 }`,
        start : weekStart,
        end : weekEnd,
        revenue : 0
      };
    } );
  
    invoiceData.forEach ( invoice => {
    
      try {

        const dateString = invoice.updatedAt || invoice.createdAt;
        const total = Number ( invoice.total ) || 0;
      
        const date = new Date ( dateString );
      
        if ( date && !isNaN ( date.getTime () ) && !isNaN ( total ) ) {
        
          for ( let i = 0 ; i < weeklyData.length ; i++ ) {
            if ( date >= weeklyData [ i ].start && date <= weeklyData [ i ].end ) {
              weeklyData [ i ].revenue += total;
              break;
            }
          }
        
        }
      
      } catch ( error ) {
      
        console.error ( "Error processing invoice for revenue growth:" , error );
      
      }
    
    } );

    const chartData = [
      {
        id : "Weekly Revenue",
        color : "#f472b6",
        data : weeklyData.map ( week => ( {
          x : week.week,
          y : Number ( week.revenue.toFixed ( 2 ) )
        } ) )
      }
    ];
  
    return chartData;
  
  } catch ( error ) {
  
    console.error ( "Error processing revenue growth data:" , error );
    return [ { id : 'Error' , color : "#f472b6" , data : [] } ];
  
  }
}

export default RevenueGrowthChart;