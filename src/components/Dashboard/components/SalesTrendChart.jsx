
// Imports : ( ResponsiveLine ).
import { ResponsiveLine } from "@nivo/line";

// Function : ( SalesTrendChart ).
function SalesTrendChart ( { invoiceData } ) {

  // Process data to get sales by month
  const salesByMonth = processSalesByMonth ( invoiceData );

  return (

    <ResponsiveLine

      data = { salesByMonth }
      margin = { { top : 20 , right : 20 , bottom : 50 , left : 80 } }
      xScale = { { type : 'point' } }
      yScale = { { 
        type : 'linear' , 
        min : 'auto' , 
        max : 'auto' , 
        stacked : false , 
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
        legendOffset : 36,
        legendPosition : 'middle'

      } }
      axisLeft = { {

        orient : 'left',
        tickSize : 5,
        tickPadding : 5,
        tickRotation : 0,
        legend : 'Sales (Rs)',
        legendOffset : -60,
        legendPosition : 'middle'

      } }
      pointSize = { 10 }
      pointColor = { { theme : 'background' } }
      pointBorderWidth = { 2 }
      pointBorderColor = { { from : 'serieColor' } }
      pointLabelYOffset = { -12 }
      useMesh = { true }
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
          symbolBorderColor : 'rgba(0, 0, 0, .5)',
          effects : [
            {
              on : 'hover',
              style : {
                itemBackground : 'rgba(0, 0, 0, .03)',
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
            boxShadow : '0 4px 8px rgba(0, 0, 0, 0.15)'
          }
        }
      } }

    />

  );

}

// Helper function to process sales by month.
function processSalesByMonth ( invoiceData ) {

  // Check if invoiceData is available
  if (!invoiceData || invoiceData.length === 0) {
    return [{ id: 'No Data', color: "hsl(240, 70%, 50%)", data: [] }];
  }

  // Get current year
  const currentYear = new Date().getFullYear();

  // Initialize months array with all months
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Initialize sales data for current year
  const salesData = months.map(month => ({ x: month, y: 0 }));

  // Check if we have the old or new data structure
  const hasNestedInvoice = invoiceData[0] && invoiceData[0].invoice;

  // Process each invoice
  invoiceData.forEach(invoice => {
    let date;
    let total;
  
    if (hasNestedInvoice) {
      // Old structure
      date = new Date(invoice.invoice.date);
      total = invoice.invoice.total;
    } else {
      // New structure
      date = new Date(invoice.updatedAt || invoice.createdAt);
      total = invoice.total;
    }
  
    // Only process invoices with valid dates
    if (date && !isNaN(date.getTime())) {
      // Only process invoices from current year
      if (date.getFullYear() === currentYear) {
        const month = date.getMonth();
        salesData[month].y += total;
      }
    }
  });

  // Return formatted data for the chart
  return [
    {
      id: `Sales ${currentYear}`,
      color: "hsl(240, 70%, 50%)",
      data: salesData
    }
  ];
}

// Exporting the SalesTrendChart component.
export default SalesTrendChart;
