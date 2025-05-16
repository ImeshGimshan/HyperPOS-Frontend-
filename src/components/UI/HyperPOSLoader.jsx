
import GlowingLogo from './GlowingLogo';

/**
 * @param {Object} props
 * @param {string} props.size - Size of the loader (sm, md, lg)
 * @param {string} props.text - Optional loading text
 * @param {string} props.className - Additional classes
 */

const HyperPOSLoader = ( { size = 'md', text = 'Loading data...', className = '' } ) => {

    // Size classes for responsivity.
    const sizeClasses = {
        sm : 'w-24 h-24',
        md : 'w-32 h-32',
        lg : 'w-40 h-40'
    };

    const logoSizes = {
        sm : 40,
        md : 50,
        lg : 60
    };

    const sizeClass = sizeClasses[ size ] || sizeClasses.md;
    const logoSize = logoSizes[ size ] || logoSizes.md;

    return (

        <div className = { `flex flex-col items-center justify-center ${ className }` }>
            
            <div className = { `relative ${ sizeClass }` }>
                
                {/* Hexagon background. */}
                <div className = "absolute inset-0 flex items-center justify-center">
                    <div className = "w-full h-full bg-hyper-dark/50 rounded-lg rotate-45 border border-pink-500/30"></div>
                </div>
            
                {/* Outer ring with gradient. */}
                <div className = "absolute inset-0 rounded-full border-4 border-transparent border-t-pink-500 border-r-purple-500 animate-spin duration-3000 opacity-70"></div>
            
                {/* Middle hexagon - rotates. */}
                <div className = "absolute inset-4 flex items-center justify-center animate-spin duration-5000">
                    <div className = "w-3/4 h-3/4 border-2 border-purple-500/70 rotate-45 shadow-[0_0_10px_rgba(192,38,211,0.5)]"></div>
                </div>
            
                {/* Center logo. */}
                <div className = "absolute inset-0 flex items-center justify-center">
                    <GlowingLogo 
                        src = "/HyperPOS.svg" 
                        alt = "HyperPOS Logo" 
                        width = { logoSize } 
                        glowColor = "rgba( 244, 114, 182, 0.8 )"
                        hoverGlowColor = "rgba( 244, 114, 182, 0.9 )"
                    />
                </div>
                
            </div>
            
            {/* Modern loading text with gradient. */}
            <div className = "mt-6 relative">
                
                <div className = "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-bold text-lg animate-pulse">
                    { text }
                </div>
            
                {/* Animated progress bar. */}
                <div className = "mt-2 h-1 w-full bg-gray-800/50 rounded-full overflow-hidden">
                    <div className = "h-full bg-gradient-to-r from-pink-500 to-purple-600 animate-progress-indeterminate"></div>
                </div>
                
            </div>
            
        </div>

    );

};

export default HyperPOSLoader;