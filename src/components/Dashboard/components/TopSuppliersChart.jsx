
import { ResponsivePie } from "@nivo/pie";
import { nivoTheme } from "../../../utils/nivoTheme";

function TopSuppliersChart ( { grnData } ) {

  // Process data to get top suppliers.
  const topSuppliers = processTopSuppliers ( grnData );

  const enhancedTheme = {
    ...nivoTheme,
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
    labels : {
      text : {
        fill : "#ffffff",
        fontSize : 11,
        fontWeight : "bold",
        textShadow : "0 0 3px rgba( 0 , 0 , 0 , 0.7 )"
      }
    },
    legends : {
      text : {
        fill : "#ffffff",
        fontSize : 10
      }
    }
  };

  return (

    <div className = "relative h-full w-full">
      <ResponsivePie
        data = { topSuppliers }
        margin = { { 
          top : 20, 
          right : 20, 
          bottom : 40, 
          left : 20 
        } }
        innerRadius = { 0.5 }
        padAngle = { 0.7 }
        cornerRadius = { 3 }
        activeOuterRadiusOffset = { 8 }
        borderWidth = { 1 }
        borderColor = { { from : 'color' , modifiers : [ [ 'darker' , 0.2 ] ] } }
        arcLinkLabelsSkipAngle = { 10 }
        arcLinkLabelsTextColor = "#ffffff"
        arcLinkLabelsThickness = { 2 }
        arcLinkLabelsColor = { { from : 'color' } }
        arcLabelsSkipAngle = { 10 }
        arcLabelsTextColor = { { from : 'color' , modifiers : [ [ 'darker' , 2 ] ] } }
        colors = { [ '#f472b6' , '#e879f9' , '#d946ef' , '#c026d3' , '#a21caf' ] }
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
            id : 'lines',
            type : 'patternLines',
            background : 'inherit',
            color : 'rgba( 255 , 255 , 255 , 0.3 )',
            rotation : -45,
            lineWidth : 6,
            spacing : 10
          }
        ] }
        fill = { [
          { match : ( d ) => d.id.includes ( '1' ) , id : 'dots' },
          { match : ( d ) => d.id.includes ( '3' ) , id : 'lines' }
        ] }
        animate = { true }
        motionConfig = "gentle"
        legends = { [
          {
            anchor : 'bottom',
            direction : 'row',
            justify : false,
            translateX : 0,
            translateY : 30,
            itemsSpacing : 0,
            itemWidth : 60,
            itemHeight : 18,
            itemTextColor : '#ffffff',
            itemDirection : 'left-to-right',
            itemOpacity : 1,
            symbolSize : 12,
            symbolShape : 'circle',
            effects : [
              {
                on : 'hover',
                style : {
                  itemTextColor : '#f472b6'
                }
              }
            ]
          }
        ] }

        // Respsondive adjustments.
        arcLinkLabel = { datum => {

          const isSmallScreen = window.innerWidth < 640;
          if ( isSmallScreen ) {

            const match = datum.id.match ( /Supplier (\d+)/ );
            return match ? `S${ match [ 1 ] }` : datum.id;
          }
          return datum.id;
        } }

        enableArcLabels = { window.innerWidth >= 480 }

        arcLinkLabelsOffset = { window.innerWidth < 640 ? 1 : 2 }
        arcLinkLabelsDiagonalLength = { window.innerWidth < 640 ? 8 : 16 }
        arcLinkLabelsStraightLength = { window.innerWidth < 640 ? 8 : 24 }
      />
      
      <div className = "absolute inset-0 pointer-events-none bg-gradient-to-t from-purple-900/10 to-transparent"></div>
      <div className = "absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(244,114,182,0.05)_0%,transparent_70%)]"></div>
    </div>
    
  );

}

// Helper function to process top suppliers data.
function processTopSuppliers ( grnData ) {

  if ( !grnData || grnData.length === 0 ) {
    return [
      { id : 'No Data' , label : 'No Data' , value : 1 }
    ];
  }

  // Group GRNs by supplier.
  const supplierTotals = {};
  
  grnData.forEach ( grn => {
    const supplierId = grn.supplierId || 'Unknown';
    if ( !supplierTotals [ supplierId ] ) {
      supplierTotals [ supplierId ] = 0;
    }
    supplierTotals [ supplierId ] += grn.total || 0;
  } );
  
  // Convert to array and sort by total amount.
  return Object.entries ( supplierTotals )
    .map ( ( [ supplierId , value ] ) => ( {
      id : `Supplier ${ supplierId }`,
      label : `Supplier ${ supplierId }`,
      value
    } ) )
    .sort ( ( a , b ) => b.value - a.value )
    .slice ( 0 , 5 ); // Number of suppliers.
}

export default TopSuppliersChart;
