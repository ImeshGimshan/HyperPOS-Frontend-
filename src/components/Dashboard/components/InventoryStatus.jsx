// Imports : ( React , ResponsiveBar ) , ( processInventoryData ).
import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { nivoTheme } from "../../../utils/nivoTheme";

// Function : ( InventoryStatus ).
function InventoryStatus({ productData }) {
  // Process data for inventory status.
  const inventoryData = processInventoryData(productData);

  return (
    <ResponsiveBar
      data={inventoryData}
      keys={['quantity']}
      indexBy="name"
      margin={{ top: 10, right: 20, bottom: 70, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={['#8a6db1', '#6a3ca3', '#4a2d7d', '#9d85c1', '#d4c5e9']}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legend: 'Product',
        legendPosition: 'middle',
        legendOffset: 60
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Quantity',
        legendPosition: 'middle',
        legendOffset: -50
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      theme={nivoTheme}
    />
  );
}

// Helper function to process inventory data.
function processInventoryData(productData) {
  // Sort products by quantity and get top 5
  return productData
    .map(product => ({
      name: product.name ? product.name.substring(0, 20) : `Product ${product.id}`,
      quantity: product.quantity || 0
    }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
}

// Exporting the InventoryStatus component.
export default InventoryStatus;
