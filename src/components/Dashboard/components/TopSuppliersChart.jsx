import { ResponsivePie } from "@nivo/pie";
import { nivoTheme } from "../../../utils/nivoTheme";

function TopSuppliersChart({ grnData }) {
  // Process data to get top suppliers
  const topSuppliers = processTopSuppliers(grnData);

  return (
    <ResponsivePie
      data={topSuppliers}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      colors={{ scheme: 'purples' }}
      theme={nivoTheme}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
    />
  );
}

// Helper function to process top suppliers data
function processTopSuppliers(grnData) {
  if (!grnData || grnData.length === 0) {
    return [
      { id: 'No Data', label: 'No Data', value: 1 }
    ];
  }

  // Group GRNs by supplier
  const supplierTotals = {};
  
  grnData.forEach(grn => {
    const supplierId = grn.supplierId || 'Unknown';
    if (!supplierTotals[supplierId]) {
      supplierTotals[supplierId] = 0;
    }
    supplierTotals[supplierId] += grn.total || 0;
  });
  
  // Convert to array and sort by total amount
  return Object.entries(supplierTotals)
    .map(([supplierId, value]) => ({
      id: `Supplier ${supplierId}`,
      label: `Supplier ${supplierId}`,
      value
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Get top 5 suppliers
}

export default TopSuppliersChart;