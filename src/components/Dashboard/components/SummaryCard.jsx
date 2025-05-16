
import HyperPOSCard from "../../UI/HyperPOSCard";

function SummaryCard ( { title , value , subtitle , isLoading = false } ) {
  return (
    <HyperPOSCard className = "h-full hyper-button relative overflow-hidden group transition-all duration-300 hover:scale-[1.02]">
      <div className = "absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></div>

      <div className = "absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-bl-xl"></div>
    
      <div className = "flex flex-col p-1 sm:p-3 md:p-4 relative z-10">
        <span className = "text-xs sm:text-sm text-gray-300 hyper-text mb-1 sm:mb-2">{ title }</span>
    
        <span className = "text-xl sm:text-2xl md:text-3xl font-bold text-white mt-1 sm:mt-2 hyper-text-glow">
          { isLoading ? (
            <div className = "h-6 sm:h-8 w-16 sm:w-24 bg-hyper-pink/10 animate-pulse rounded"></div>
          ) : (
            value
          ) }
        </span>
    
        <span className = "text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-2">
          { isLoading ? (
            <div className = "h-2 sm:h-3 w-24 sm:w-32 bg-hyper-pink/10 animate-pulse rounded mt-1 sm:mt-2"></div>
          ) : (
            subtitle
          ) }
        </span>
      
        <div className = "absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
      </div>
    </HyperPOSCard>
  );
}

export default SummaryCard;
