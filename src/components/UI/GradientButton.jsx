
const GradientButton = ( { children , onClick , className = "" } ) => {

  return (

    <a 
      href = "#_" 
      onClick = { onClick }
      className = { `relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white rounded-2xl shadow-2xl group ${ className }` }
    >
      {/* Blur Effect. */}
      <span className = "absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-[#ff44cc] rounded-full blur-md ease"></span>
      
      {/* Rotate animation on hover. */}
      <span className = "absolute inset-0 w-full h-full transition-all duration-300 group-hover:animate-spin">
        <span className = "absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-[#9854F8] rounded-full blur-md"></span>
        <span className = "absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-[#ff44cc] rounded-full blur-md"></span>
      </span>
      
      <span className = "relative text-white font-medium">{ children }</span>
    </a>
  );

};

export default GradientButton;
