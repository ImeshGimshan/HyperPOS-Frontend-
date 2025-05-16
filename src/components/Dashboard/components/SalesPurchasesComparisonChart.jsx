
import { ResponsiveBar } from "@nivo/bar";
import { nivoTheme } from "../../../utils/nivoTheme";

function SalesPurchasesComparisonChart ( { invoiceData , grnData } ) {

  // Process data to compare sales and purchases by month.
  const comparisonData = processComparisonData ( invoiceData , grnData );

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
      <ResponsiveBar
        data = { comparisonData }
        keys = { [ 'sales' , 'purchases' ] }
        indexBy = "month"
        margin = { { 
          top : 30, 
          right : 80, 
          bottom : 50, 
          left : 65 
        } }
        padding = { 0.3 }
        groupMode = "grouped"
        valueScale = { { type : 'linear' } }
        indexScale = { { type : 'band' , round : true } }
        colors = { ( { id } ) => id === 'sales' ? '#f472b6' : '#c026d3' }
        defs = { [
          {
            id : 'gradientSales',
            type : 'linearGradient',
            colors : [
              { offset : 0 , color : '#f472b6' , opacity : 0.8 },
              { offset : 100 , color : '#f472b6' , opacity : 0.3 }
            ]
          },
          {
            id : 'gradientPurchases',
            type : 'linearGradient',
            colors : [
              { offset : 0 , color : '#c026d3' , opacity : 0.8 },
              { offset : 100 , color : '#c026d3' , opacity : 0.3 }
            ]
          }
        ] }
        fill = { [
          { match : { id : 'sales' } , id : 'gradientSales' },
          { match : { id : 'purchases' } , id : 'gradientPurchases' }
        ] }
        borderColor = { { from : 'color' , modifiers : [ [ 'darker' , 1.6 ] ] } }
        axisTop = { null }
        axisRight = { null }
        axisBottom = { {
          tickSize : 5,
          tickPadding : 5,
          tickRotation : 0,
          legend : 'Month',
          legendPosition : 'middle',
          legendOffset : 32
        } }
        axisLeft = { {
          tickSize : 5,
          tickPadding : 8,
          tickRotation : 0,
          legend : 'Amount ( Rs )',
          legendPosition : 'middle',
          legendOffset : -55,
          format : value => 
            Math.abs ( value ) >= 1000000
              ? `${ ( value / 1000000 ).toFixed ( 1 ) }M`
              : Math.abs ( value ) >= 1000
              ? `${ ( value / 1000 ).toFixed ( 1 ) }K`
              : value,
          tickValues : 5
        } }
        enableGridY = { true }
        enableLabel = { false }
        labelSkipWidth = { 12 }
        labelSkipHeight = { 12 }
        labelTextColor = { { from : 'color' , modifiers : [ [ 'darker' , 1.6 ] ] } }
        legends = { [
          {
            dataFrom : 'keys',
            anchor : 'bottom-right',
            direction : 'column',
            justify : false,
            translateX : 70,
            translateY : 0,
            itemsSpacing : 2,
            itemWidth : 80,
            itemHeight : 20,
            itemDirection : 'left-to-right',
            itemOpacity : 0.85,
            symbolSize : 12,
            effects : [
              {
                on : 'hover',
                style : {
                  itemOpacity : 1
                }
              }
            ]
          }
        ] }
        animate = { true }
        motionStiffness = { 90 }
        motionDamping = { 15 }
        theme = { enhancedTheme }
      />
      
      <div className = "absolute inset-0 pointer-events-none bg-gradient-to-t from-purple-900/10 to-transparent"></div>
      <div className = "absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(244,114,182,0.05)_0%,transparent_70%)]"></div>
    </div>
  );
}

// Helper function to process comparison data.
function processComparisonData ( invoiceData , grnData ) {

  if ( ( !invoiceData || invoiceData.length === 0 ) && ( !grnData || grnData.length === 0 ) ) {
    return [];
  }

  const currentYear = new Date ().getFullYear ();

  const months = [
    'Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun', 
    'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec'
  ];

  const comparisonData = months.map ( month => ( {
    month,
    sales : 0,
    purchases : 0
  } ) );

  // Process sales data (invoices).
  if ( invoiceData && invoiceData.length > 0 ) {
    
    invoiceData.forEach ( invoice => {
      
      try {
        
        const dateString = invoice.updatedAt || invoice.createdAt;
        const total = Number ( invoice.total ) || 0;
  
        const date = new Date ( dateString );
        
        if ( date && !isNaN ( date.getTime () ) && !isNaN ( total ) ) {

          if ( date.getFullYear () === currentYear ) {
            const month = date.getMonth ();
            comparisonData [ month ].sales += total;
          }
          
        }
        
      } catch ( error ) {
        
        console.error ( "Error processing invoice:" , error , invoice );
        
      }
      
    } );
    
  }

  // Process purchase data (GRNs).
  if ( grnData && grnData.length > 0 ) {
    
    grnData.forEach ( grn => {
      
      try {
        
        const dateString = grn.updatedAt || grn.createdAt;
        const total = Number ( grn.total ) || 0;

        const date = new Date ( dateString );
        
        if ( date && !isNaN ( date.getTime () ) && !isNaN ( total ) ) {

          if ( date.getFullYear () === currentYear ) {
            const month = date.getMonth ();
            comparisonData [ month ].purchases += total;
          }
          
        }
        
      } catch ( error ) {
        
        console.error ( "Error processing GRN:" , error , grn );
        
      }
      
    } );
    
  }

  comparisonData.forEach ( data => {
    data.sales = Number ( data.sales.toFixed ( 2 ) );
    data.purchases = Number ( data.purchases.toFixed ( 2 ) );
  } );

  return comparisonData;
}

export default SalesPurchasesComparisonChart;
