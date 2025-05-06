
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

"use client"
import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "../../../lib/utils"

// Context for sharing scroll progress.
const ContainerScrollContext = React.createContext ( undefined )

function useContainerScrollContext ( ) {

  const context = React.useContext ( ContainerScrollContext )
  
  if ( !context ) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component"
    )
  }
  
  return context

}

// Main scroll container component.
const ContainerScroll = ( {
  children,
  className,
  ...props
} ) => {

  const scrollRef = React.useRef(null)
  
  const { scrollYProgress } = useScroll( {
    target: scrollRef,
  } )
  
  return (
  
    <ContainerScrollContext.Provider value = { { scrollYProgress } }>
      <div
        ref = { scrollRef }
        className = { cn ( "relative min-h-screen w-full" , className ) }
        { ...props }
      >
        { children }
      </div>
    </ContainerScrollContext.Provider>
    
  )
  
}

// Component for scaling content based on scroll.
const ContainerScale = React.forwardRef(

  ( { className     , style, ...props }, ref ) => {
  
    const { scrollYProgress } = useContainerScrollContext( )
    const opacity = useTransform ( scrollYProgress , [ 0 , 0.5 ] , [ 1 , 0 ] )
    const scale = useTransform ( scrollYProgress , [ 0 , 0.5 ] , [ 1 , 0 ] )
    const position = useTransform ( scrollYProgress , ( pos ) =>
      pos >= 0.6 ? "absolute" : "fixed"
    )
    
    return (
    
      <motion.div
        ref = { ref }
        className = { cn("left-1/2 top-1/2 size-fit", className) }
        style = { {
          translate: "-50% -50%",
          scale,
          position,
          opacity,
          ...style,
        } }
        { ...props }
      />
      
    )
    
  }
  
)
ContainerScale.displayName = "ContainerScale"

export { ContainerScroll, ContainerScale, useContainerScrollContext }
