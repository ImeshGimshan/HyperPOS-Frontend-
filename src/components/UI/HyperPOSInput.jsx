
/**
 * @param {Object} props
 * @param {string} props.label - Input label.
 * @param {string} props.type - Input type (text, password, etc.).
 * @param {string} props.value - Input value.
 * @param {function} props.onChange - Change handler.
 * @param {string} props.placeholder - Input placeholder.
 * @param {string} props.className - Additional classes to apply.
 * @param {Object} props.props - Additional props to pass to the input element.
 */
const HyperPOSInput = ( { 

  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  ...props

} ) => {

  return (

    <div className = { `mb-4 ${ className }` }>
      
      { label && (
        <label className = "block mb-2 text-sm hyper-text text-hyper-accent">
          { label }
        </label>
      ) }
      
      <div className = "relative">
        
        <input
          type = { type }
          value = { value }
          onChange = { onChange }
          placeholder = { placeholder }
          className = "w-full bg-hyper-dark/50 border border-hyper-pink/30 text-white p-2 rounded focus:outline-none focus:border-hyper-pink focus:ring-1 focus:ring-hyper-pink/50"
          style = { {
            boxShadow : 'inset 0 0 5px rgba( 192, 38, 211, 0.2 )'
          } }
          { ...props }
        />
        
        <div className = "absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-hyper-pink via-transparent to-hyper-pink opacity-50"></div>
        
      </div>
      
    </div>

  );
  
};

export default HyperPOSInput;