
import React from 'react';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {string} props.variant - The button variant (default, primary, secondary, danger).
 * @param {function} props.onClick - Click handler.
 * @param {string} props.className - Additional classes to apply.
 * @param {Object} props.props - Additional props to pass to the button element.
 */
const HyperPOSButton = ( { 

  children, 
  variant = 'default',
  onClick,
  className = '',
  ...props

} ) => {

  const variantStyles = {

    default : 'bg-hyper-dark/50 border-hyper-pink/50 hover:bg-hyper-dark/70',
    primary : 'bg-hyper-purple/30 border-hyper-purple hover:bg-hyper-purple/50',
    secondary : 'bg-hyper-pink/30 border-hyper-pink hover:bg-hyper-pink/50',
    danger : 'bg-red-500/30 border-red-500 hover:bg-red-500/50'

  };
  
  const variantStyle = variantStyles[ variant ] || variantStyles.default;
  
  return (

    <button
      onClick = { onClick }
      className = { `hyper-button p-2 px-4 rounded flex items-center gap-2 text-white ${ variantStyle } ${ className }` }
      { ...props }
    >
      { children }
    </button>

  );
  
};

export default HyperPOSButton;