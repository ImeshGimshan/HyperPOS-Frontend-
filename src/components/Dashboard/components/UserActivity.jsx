import { ResponsiveBar } from "@nivo/bar";
import { nivoTheme } from "../../../utils/nivoTheme";

function UserActivity({ userData, invoiceData }) {
  // Process data to show user activity
  const activityData = processUserActivity(userData, invoiceData);

  return (
    <ResponsiveBar
      data={activityData}
      keys={['invoiceCount']}
      indexBy="userName"
      margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={['#6a3ca3']}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legend: 'User',
        legendPosition: 'middle',
        legendOffset: 50
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Invoices Created',
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

// Helper function to process user activity data
function processUserActivity(userData, invoiceData) {
  if (!userData || userData.length === 0 || !invoiceData || invoiceData.length === 0) {
    return [];
  }

  // Create a map to count invoices by user
  const userInvoiceCounts = {};
  
  // Initialize counts for all users
  userData.forEach(user => {
    userInvoiceCounts[user.id] = {
      userId: user.id,
      userName: user.name || user.username || `User ${user.id}`,
      invoiceCount: 0
    };
  });
  
  // Count invoices by user
  invoiceData.forEach(invoice => {
    const userId = invoice.userId || invoice.createdBy;
    if (userId && userInvoiceCounts[userId]) {
      userInvoiceCounts[userId].invoiceCount += 1;
    }
  });
  
  // Convert to array and sort by invoice count
  return Object.values(userInvoiceCounts)
    .sort((a, b) => b.invoiceCount - a.invoiceCount)
    .slice(0, 5); // Get top 5 users
}

export default UserActivity;