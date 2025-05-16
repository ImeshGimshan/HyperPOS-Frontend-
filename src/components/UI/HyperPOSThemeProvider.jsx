
import React from 'react';

import ParticleBackground from '../ui/ParticleBackground';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be styled.
 * @param {boolean} props.particles - Whether to show particle effects (default: true).
 * @param {boolean} props.scanlines - Whether to show scanline effects (default: true).
 * @param {boolean} props.horizontalLines - Whether to show horizontal neon lines (default: false).
 * @param {boolean} props.bottomGlow - Whether to show bottom glow effect (default: false).
 * @param {boolean} props.customScrollbar - Whether to apply custom scrollbar styling (default: true).
 * @param {boolean} props.animatedScrollbar - Whether to animate the scrollbar glow (default: false).
 * @param {boolean} props.chartMode - Whether to apply special styling for charts (default: false).
 * @param {string} props.className - Additional classes to apply.
 */

const HyperPOSThemeProvider = ( { 

    children, 
    particles = true, 
    scanlines = true,
    horizontalLines = false,
    bottomGlow = false,
    customScrollbar = true,
    animatedScrollbar = true,
    chartMode = false,
    className = ''

} ) => {

    // Determine scrollbar classes based on props.
    const scrollbarClasses = customScrollbar 
        ? `hyper-scrollbar ${ animatedScrollbar ? 'hyper-scrollbar-animated' : '' }` 
        : '';

    // Determine chart mode classes.
    const chartClasses = chartMode ? 'hyper-chart-container' : '';

    return (

        <div className = { `relative ${ scrollbarClasses } ${ chartClasses } ${ className }` }>
            
            {/* Background. */}
            <div className = "absolute inset-0 hyper-bg -z-10"></div>

            {/* Particles. */}
            {particles && (

                <div className = "absolute inset-0 -z-5 pointer-events-none">
                    <ParticleBackground count = { chartMode ? 8 : 15 } color = "#f472b6" opacity = { 0.1 } />
                </div>

            ) }

            {/* Scanlines. */}
            { scanlines && (

                <div className = "hyper-scanlines absolute inset-0 -z-5 pointer-events-none"></div>
            
            ) }

            {/* Horizontal neon lines. */}
            { horizontalLines && (

                <div className = "absolute inset-0 overflow-hidden opacity-20 -z-5 pointer-events-none">

                    { [ ...Array ( 10 ) ].map ( ( _ , i ) => (

                        <div 
                            key = { i }
                            className = "hyper-line"
                            style = { {
                                top : `${ i * 10 }%`,
                                opacity : 0.6,
                                background : i % 2 === 0 ? '#f0abfc' : '#c026d3',
                                boxShadow: i % 2 === 0 
                                    ? '0 0 10px 1px #f0abfc, 0 0 20px 1px #f0abfc' 
                                    : '0 0 10px 1px #c026d3, 0 0 20px 1px #c026d3',
                            }}
                        >                         
                        </div>

                    ) ) }

                </div>

            ) }

            {/* Chart grid lines for chart mode. */}
            { chartMode && (

                <div className = "absolute inset-0 overflow-hidden opacity-20 -z-5 pointer-events-none">

                    { [ ...Array ( 5 ) ].map ( ( _ , i ) => (

                        <div 
                            key = { i }
                            className = "absolute left-0 right-0 border-t border-dashed border-pink-500/20"
                            style = { {
                                top: `${ ( i + 1 ) * 20 }%`,
                            } }
                        >
                        </div>

                    ) ) }
                    
                    { [ ...Array ( 5 ) ].map ( ( _ , i ) => (

                        <div 
                            key = { i }
                            className = "absolute top-0 bottom-0 border-l border-dashed border-pink-500/20"
                            style = { {
                                left: `${ ( i + 1 ) * 20 }%`,
                            } }
                        >
                        </div>

                    ) ) }

                </div>

            ) }

            {/* Content */}
            <div className = "relative z-10">
                { children }
            </div>

            {/* Bottom glow */}
            { bottomGlow && (
                <div className = "hyper-glow-bottom"></div>
            ) }
            
        </div>

    );
};

export default HyperPOSThemeProvider;