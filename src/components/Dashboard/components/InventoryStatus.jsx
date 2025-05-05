
// Imports : ( React , ResponsiveBar ) , ( processInventoryData ).
import React from "react";

import { ResponsiveBar } from "@nivo/bar";

// Function : ( InventoryStatus ).
function InventoryStatus ( { productData } ) {

  // Process data for inventory status.
  const inventoryData = processInventoryData(productData);

  return (

    <ResponsiveBar

      data = { inventoryData }
      keys = { [ 'quantity' ] }
      indexBy = "name"
      margin = { { top : 10 , right : 20 , bottom : 70 , left : 60 } }
      padding = { 0.3 }
      valueScale = { { type : 'linear' } }
      indexScale = { { type : 'band' , round : true } }
      colors = { { scheme : 'green_blue' } }
      borderColor = { { from: 'color', modifiers : [ [ 'darker' , 1.6 ] ] } }
      axisTop = { null }
      axisRight = { null }

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
        legend : 'Quantity',
        legendPosition : 'middle',
        legendOffset : -50

      } }

      labelSkipWidth = { 12 }
      labelSkipHeight = { 12 }
      labelTextColor = { { from : 'color' , modifiers : [ [ 'darker' , 1.6 ] ] } }
      animate = { true }
      motionStiffness = { 90 }
      motionDamping = { 15 }
      theme = {{
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
      } }

    />

  );

}

// Helper function to process inventory data.
function processInventoryData ( productData ) {

  // Sort products by quantity and get top 5
  return productData
    .map ( product => ( {
      name : product.name ? product.name.substring ( 0 , 20 ) : `Product ${ product.id }`,
      quantity : product.quantity || 0
    } ) )
    .sort ( ( a , b ) => b.quantity - a.quantity )
    .slice ( 0 , 5 );
}

// Exporting the InventoryStatus component.
export default InventoryStatus;
