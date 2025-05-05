
// Imports : ( React ) , ( ResponsiveLine ).
import React from "react";
import { ResponsiveLine } from "@nivo/line";

// Function : ( SalesTrendChart ).
function SalesTrendChart ( { invoiceData } ) {

  // Process data for sales trend chart.
  const salesByMonth = processSalesByMonth ( invoiceData );

  return (

    <ResponsiveLine
      data = { salesByMonth }
      margin = { { top : 20 , right : 50 , bottom : 70 , left : 80 } }
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
        tickSize : 5,
        tickPadding : 5,
        tickRotation : -45,
        legend : 'Month',
        legendOffset : 50,
        legendPosition : 'middle'
      } }
      axisLeft = { {
        tickSize : 5,
        tickPadding : 5,
        tickRotation : 0,
        legend : 'Sales (Rs)',
        legendOffset : -60,
        legendPosition : 'middle'
      } }
      colors = { ['#8a2be2'] }
      pointSize = { 10 }
      pointColor = { '#8a2be2' }
      pointBorderWidth = { 2 }
      pointBorderColor = { '#6a1b9a' }
      pointLabelYOffset = { -12 }
      useMesh = { true }
      curve = "monotoneX" 
      lineWidth = { 3 } 
      enablePoints = { true }
      enableGridX = { true }
      enableGridY = { true }
      enableSlices = "x"
      legends = { [
        {
          anchor : 'bottom',
          direction : 'row',
          justify : false,
          translateX : 0,
          translateY : 70,
          itemsSpacing : 0,
          itemDirection : 'left-to-right',
          itemWidth : 80,
          itemHeight : 20,
          itemOpacity : 0.75,
          symbolSize : 12,
          symbolShape : 'circle',
          symbolBorderColor : 'rgba ( 0 , 0 , 0 , .5 )',
          effects : [
            {
              on : 'hover',
              style : {
                itemBackground : 'rgba ( 0 , 0 , 0 , .03 )',
                itemOpacity : 1
              }
            }
          ]
        }
      ] }
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
      } }
    />
  );
}

// Helper function to process sales data by month.
function processSalesByMonth ( invoiceData ) {

  // Create a map to store sales by month
  const salesMap = { };
  
  // Process each invoice.
  invoiceData.forEach ( invoice => {

    const date = new Date ( invoice.invoice.date );
    const monthYear = `${ date.toLocaleString ( 'default' , { month : 'short' } ) } ${ date.getFullYear ( ) }`;
    
    if ( !salesMap [ monthYear ] ) {
      salesMap [ monthYear ] = 0;
    }
    
    salesMap [ monthYear ] += invoice.invoice.total;

  } );
  
  // Converting the map to an array of data points.
  const dataPoints = Object.entries ( salesMap ).map ( ( [ month , total ] ) => ( {

    x : month,
    y : total

  } ) );
  
  // Sorting by date.
  dataPoints.sort ( ( a , b ) => {

    const [ monthA , yearA ] = a.x.split ( ' ' );
    const [ monthB , yearB ] = b.x.split ( ' ' );
    
    if ( yearA !== yearB ) {

      return parseInt ( yearA ) - parseInt ( yearB );

    }
    
    const months = [ 'Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec' ];
    return months.indexOf ( monthA ) - months.indexOf ( monthB );

  } );
  
  // Returning the processed data.
  return [

    {
      id : "Sales",
      color : "#8a2be2",
      data : dataPoints
    }

  ];

}

// Exporting the SalesTrendChart component.
export default SalesTrendChart;
