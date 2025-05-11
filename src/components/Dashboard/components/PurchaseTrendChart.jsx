import { ResponsiveLine } from "@nivo/line";
import { nivoTheme } from "../../../utils/nivoTheme";

function PurchaseTrendChart({ grnData }) {
  // Process data to get purchases by month
  const purchasesByMonth = processPurchasesByMonth(grnData);

  return (
    <ResponsiveLine
      data={purchasesByMonth}
      margin={{ top: 20, right: 20, bottom: 50, left: 80 }}
      xScale={{ type: 'point' }}
      yScale={{ 
        type: 'linear', 
        min: 'auto', 
        max: 'auto', 
        stacked: false, 
        reverse: false 
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Month',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Purchases (Rs)',
        legendOffset: -60,
        legendPosition: 'middle'
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      colors={['#8a6db1']}
      theme={nivoTheme}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 0,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  );
}

// Helper function to process purchases by month
function processPurchasesByMonth(grnData) {
  // Check if grnData is available
  if (!grnData || grnData.length === 0) {
    return [{ id: 'No Data', color: "hsl(180, 70%, 50%)", data: [] }];
  }

  // Get current year
  const currentYear = new Date().getFullYear();

  // Initialize months array with all months
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Initialize purchase data for current year
  const purchaseData = months.map(month => ({ x: month, y: 0 }));

  // Process each GRN
  grnData.forEach(grn => {
    const date = new Date(grn.createdAt || grn.updatedAt);
    
    // Only process GRNs with valid dates
    if (date && !isNaN(date.getTime())) {
      // Only process GRNs from current year
      if (date.getFullYear() === currentYear) {
        const month = date.getMonth();
        purchaseData[month].y += grn.total || 0;
      }
    }
  });

  // Return formatted data for the chart
  return [
    {
      id: `Purchases ${currentYear}`,
      color: "hsl(180, 70%, 50%)",
      data: purchaseData
    }
  ];
}

export default PurchaseTrendChart;