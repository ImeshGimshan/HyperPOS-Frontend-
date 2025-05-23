
import { ResponsiveLine } from "@nivo/line";
import { nivoTheme } from "../../../utils/nivoTheme";

function SalesTrendChart ( { invoiceData } ) {

  // Process data to get sales by month.
  const salesByMonth = processSalesByMonth ( invoiceData );

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

      <div className = "w-full h-full">
        <ResponsiveLine
          data = { salesByMonth }
          margin = { { top : 20 , right : 20 , bottom : 40 , left : 50 } }
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
            tickPadding : 5,
            tickRotation : 0,
            legend : 'Sales ( Rs )',
            legendOffset : -40,
            legendPosition : 'middle'
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
          legends = { [
            {
              anchor : 'bottom-right',
              direction : 'column',
              justify : false,
              translateX : 0,
              translateY : 0,
              itemsSpacing : 0,
              itemDirection : 'left-to-right',
              itemWidth : 80,
              itemHeight : 20,
              itemOpacity : 0.75,
              symbolSize : 12,
              symbolShape : 'circle',
              symbolBorderColor : 'rgba( 0 , 0 , 0 , .5 )',
              itemTextColor : '#ffffff',
              effects : [
                {
                  on : 'hover',
                  style : {
                    itemBackground : 'rgba( 0 , 0 , 0 , .03 )',
                    itemOpacity : 1
                  }
                }
              ]
            }
          ] }
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

// Helper function to process sales by month.
function processSalesByMonth ( invoiceData ) {

  if ( !invoiceData || invoiceData.length === 0 ) {
    return [ { id : 'No Data' , color : "#f472b6" , data : [] } ];
  }

  const currentYear = new Date ().getFullYear ();

  const months = [
    'Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun', 
    'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec'
  ];

  // Initialize sales data for current year.
  const salesData = months.map ( month => ( { x : month , y : 0 } ) );

  invoiceData.forEach ( invoice => {
    
    try {
      
      // Extract date and total from the invoice.
      const dateString = invoice.updatedAt || invoice.createdAt;
      const total = Number ( invoice.total ) || 0;
      
      const date = new Date ( dateString );
      
      // Only process invoices with valid dates and totals.
      if ( date && !isNaN ( date.getTime () ) && !isNaN ( total ) ) {
        
        if ( date.getFullYear () === currentYear ) {
          const month = date.getMonth ();
          salesData [ month ].y += total;
        }
        
      }
      
    } catch ( error ) {
      
      console.error ( "Error processing invoice:" , error , invoice );
      
    }
    
  } );

  salesData.forEach ( data => {
    data.y = Number ( data.y.toFixed ( 2 ) );
  } );

  return [
    {
      id : `Sales ${ currentYear }`,
      color : "#f472b6",
      data : salesData
    }
  ];
}

export default SalesTrendChart;
