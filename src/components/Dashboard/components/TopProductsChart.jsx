
import { ResponsiveBar } from "@nivo/bar";
import { nivoTheme } from "../../../utils/nivoTheme";

function TopProductsChart ( { invoiceData , productData } ) {

  // Process data to get top products.
  const topProducts = processTopProducts ( invoiceData , productData );

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
        data = { topProducts }
        keys = { [ 'sales' ] }
        indexBy = "name"
        margin = { { 
          top : 20, 
          right : 20, 
          bottom : 60, 
          left : 50 
        } }
        padding = { 0.3 }
        valueScale = { { type : 'linear' } }
        indexScale = { { type : 'band' , round : true } }
        colors = { [ '#f472b6' , '#c026d3' , '#a21caf' , '#86198f' , '#701a75' ] }
        borderColor = { { from : 'color' , modifiers : [ [ 'darker' , 1.6 ] ] } }
        axisTop = { null }
        axisRight = { null }
        axisBottom = { {
          tickSize : 5,
          tickPadding : 5,
          tickRotation : -45,
          legend : 'Product',
          legendPosition : 'middle',
          legendOffset : 50
        } }
        axisLeft = { {
          tickSize : 5,
          tickPadding : 5,
          tickRotation : 0,
          legend : 'Sales ( Rs )',
          legendPosition : 'middle',
          legendOffset : -40
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
            id : 'dots',
            type : 'patternDots',
            background : 'inherit',
            color : 'rgba( 255 , 255 , 255 , 0.3 )',
            size : 4,
            padding : 1,
            stagger : true
          },
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
          { match : ( d ) => d.index % 2 === 0 , id : 'dots' },
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

// Helper function to process top products data.
function processTopProducts ( invoiceData , productData ) {

  if ( !invoiceData || invoiceData.length === 0 ) {
    return [];
  }

  const hasItems = invoiceData [ 0 ] && invoiceData [ 0 ].items;

  if ( hasItems ) {
    
    // Creating a map to store sales by product ID.
    const productSalesMap = {};
  
    // Process each invoice item.
    invoiceData.forEach ( invoice => {
      invoice.items.forEach ( item => {
        if ( !productSalesMap [ item.productId ] ) {
          productSalesMap [ item.productId ] = 0;
        }
      
        productSalesMap [ item.productId ] += item.amount;
      } );
    } );
  
    // Convert to array and sort by sales amount.
    const productSales = Object.entries ( productSalesMap )
      .map ( ( [ productId , sales ] ) => {
        // Find product name from productData
        const product = productData.find ( p => p.id === parseInt ( productId ) );
        let name = product ? ( product.name || `Product ${ productId }` ) : `Product ${ productId }`;

        if ( name.length > 15 ) {
          name = name.substring ( 0 , 12 ) + '...';
        }
      
        return { 
          productId : parseInt ( productId ), 
          name, 
          fullName : product?.name || `Product ${ productId }`, 
          sales 
        };
      } )
      .sort ( ( a , b ) => b.sales - a.sales ) 
      .slice ( 0 , 5 );
  
    return productSales;
  }

  else {
    
    if ( productData && productData.length > 0 ) {
      return productData
        .slice ( 0 , 5 )
        .map ( product => {
          let name = product.name ? product.name : `Product ${ product.id }`;
          
          if ( name.length > 15 ) {
            name = name.substring ( 0 , 12 ) + '...';
          }
          
          return {
            productId : product.id,
            name,
            fullName : product.name || `Product ${ product.id }`,
            sales : 0 
          };
        } );
    }
  
    return [ ];

  }

}

export default TopProductsChart;
