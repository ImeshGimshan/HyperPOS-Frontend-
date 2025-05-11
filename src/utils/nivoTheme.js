
// Nivo theme configuration.
export const nivoTheme = {

  background : 'transparent',
  textColor : '#4a2d7d', 
  fontSize : 12,

  axis : {

    domain : {
      line : {
        stroke : '#8a6db1', 
        strokeWidth : 1
      }
    },

    ticks : {
      line : {
        stroke : '#8a6db1', 
        strokeWidth : 1
      },
      text : {
        fontSize : 12,
        fill : '#4a2d7d' 
      }
    },

    legend : {
      text : {
        fontSize : 14,
        fontWeight : 'bold',
        fill : '#4a2d7d' 
      }
    }

  },

  grid : {

    line : {
      stroke : '#e6e0f0', 
      strokeWidth : 1
    }

  },

  legends : {

    title : {
      text : {
        fontSize : 12,
        fill : '#4a2d7d'
      }
    },

    text : {
      fontSize : 12,
      fill : '#4a2d7d'
    },

    ticks : {
      line : {},
      text : {
        fontSize : 10,
        fill : '#4a2d7d' 
      }
    }

  },

  annotations : {

    text : {
      fontSize : 13,
      fill : '#4a2d7d', 
      outlineWidth : 2,
      outlineColor : '#ffffff',
      outlineOpacity : 1
    },

    link : {
      stroke : '#6a3ca3', 
      strokeWidth : 1,
      outlineWidth : 2,
      outlineColor : '#ffffff',
      outlineOpacity : 1
    },

    outline : {
      stroke : '#6a3ca3', 
      strokeWidth : 2,
      outlineWidth : 2,
      outlineColor : '#ffffff',
      outlineOpacity : 1
    },

    symbol : {
      fill : '#6a3ca3', 
      outlineWidth : 2,
      outlineColor : '#ffffff',
      outlineOpacity : 1
    }

  },

  tooltip : {

    container : {
      background : '#ffffff',
      color : '#4a2d7d',
      fontSize : 12,
      borderRadius : 4,
      boxShadow : '0 4px 8px rgba( 74 , 45 , 125 , 0.15 )' 
    },

    basic: {
      whiteSpace : 'pre',
      display : 'flex',
      alignItems : 'center'
    },

    table: { },

    tableCell : {
      padding : '3px 5px'
    }

  }

};