import { ResponsiveBar } from "@nivo/bar";
import { nivoTheme } from "../../../utils/nivoTheme";

function SalesPurchasesComparisonChart({ invoiceData, grnData }) {
  // Process data to compare sales and purchases by month
  const comparisonData = processComparisonData(invoiceData, grnData);

  return (
    <ResponsiveBar
      data={comparisonData}
      keys={['sales', 'purchases']}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      groupMode="grouped"
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={({ id }) => id === 'sales' ? '#6a3ca3' : '#9d85c1'}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Month',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Amount (Rs)',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      theme={nivoTheme}
    />
  );
}

// Helper function to process comparison data
function processComparisonData(invoiceData, grnData) {
  // Check if data is available
  if ((!invoiceData || invoiceData.length === 0) && (!grnData || grnData.length === 0)) {
    return [];
  }

  // Get current year
  const currentYear = new Date().getFullYear();

  // Initialize months array with all months
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Initialize comparison data
  const comparisonData = months.map(month => ({
    month,
    sales: 0,
    purchases: 0
  }));

  // Process sales data
  if (invoiceData && invoiceData.length > 0) {
    invoiceData.forEach(invoice => {
      const date = new Date(invoice.createdAt || invoice.updatedAt);
      
      if (date && !isNaN(date.getTime()) && date.getFullYear() === currentYear) {
        const month = date.getMonth();
        comparisonData[month].sales += invoice.total || 0;
      }
    });
  }

  // Process purchase data
  if (grnData && grnData.length > 0) {
    grnData.forEach(grn => {
      const date = new Date(grn.createdAt || grn.updatedAt);
      
      if (date && !isNaN(date.getTime()) && date.getFullYear() === currentYear) {
        const month = date.getMonth();
        comparisonData[month].purchases += grn.total || 0;
      }
    });
  }

  return comparisonData;
}

export default SalesPurchasesComparisonChart;