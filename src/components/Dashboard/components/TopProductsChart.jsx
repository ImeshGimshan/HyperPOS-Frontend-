
// Imports : ( ResponsiveBar ).

import { ResponsiveBar } from "@nivo/bar";

// Function : ( TopProductsChart ).
function TopProductsChart ( { invoiceData , productData } ) {

  // Process data to get top products
  const topProducts = processTopProducts(invoiceData, productData);

  return (

    <ResponsiveBar

      data = { topProducts }
      keys = { [ 'sales' ] }
      indexBy = "name"
      margin = { { top : 10 , right : 20 , bottom : 70 , left : 80 } }
      padding = { 0.3 }
      valueScale = { { type : 'linear' } }
      indexScale = { { type : 'band' , round : true } }
      colors = { { scheme : 'blue_purple' } }
      borderColor = { { from : 'color' , modifiers : [ [ 'darker' , 1.6 ] ] } }
      axisTop = { null }
      axisRight = {null }
      axisBottom = { {

        tickSize : 5,
        tickPadding : 5,
        tickRotation : -45,
        legend : 'Product',
        legendPosition : 'middle',
        legendOffset : 60

      } }
      axisLeft = { {

        tickSize : 5,
        tickPadding : 5,
        tickRotation : 0,
        legend : 'Sales (Rs)',
        legendPosition : 'middle',
        legendOffset : -60

      }}
      labelSkipWidth = { 12 }
      labelSkipHeight = { 12 }
      labelTextColor = { { from : 'color' , modifiers : [ [ 'darker' , 1.6 ] ] } }
      animate = { true }
      motionStiffness = { 90 }
      motionDamping = { 15 }
      theme = { {
        axis : {
          ticks : {
            text : {
              fontSize : 12
            }
          },
          legend : {
            text : {
              fontSize : 14,
              fontWeight : 'bold'
            }
          }
        },
        grid : {
          line : {
            stroke : '#e0e0e0',
            strokeWidth : 1
          }
        },
        tooltip : {
          container : {
            background : '#ffffff',
            fontSize : 14,
            borderRadius : 4,
            boxShadow : '0 4px 8px rgba ( 0 , 0 , 0 , 0.15 )'
          }
        }
      }}

    />

  );

}

// Helper function to process top products data.
function processTopProducts ( invoiceData , productData ) {

  // Check if invoiceData is available and has the expected structure
  if (!invoiceData || invoiceData.length === 0) {
    return [];
  }

  // Check if we have the old or new data structure
  const hasItems = invoiceData[0] && invoiceData[0].items;

  // If we have the old structure with items, process it as before
  if (hasItems) {
    // Creating a map to store sales by product ID.
    const productSalesMap = { };
  
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
        const name = product ? ( product.name || `Product ${ productId }` ) : `Product ${ productId }`;
      
        return { productId : parseInt ( productId ) , name : name.substring ( 0 , 20 ) , sales };
      } )
      .sort ( ( a , b ) => b.sales - a.sales ) 
      .slice ( 0 , 5 );
  
    return productSales;
  }

  // For the new structure without items, we'll create a placeholder
  // since we don't have item-level data
  else {
    // If we have productData, use it to create a placeholder chart
    if (productData && productData.length > 0) {
      return productData
        .slice(0, 5)
        .map(product => ({
          productId: product.id,
          name: product.name ? product.name.substring(0, 20) : `Product ${product.id}`,
          sales: 0 // We don't have sales data per product in the new structure
        }));
    }
  
    // If we don't have product data either, return an empty array
    return [];
  }
}

// Exporting the TopProductsChart component.
export default TopProductsChart;
