
/* eslint-disable no-unused-vars */

"use client"
import * as React from "react"
import { motion , useTransform } from "framer-motion"
import { cn } from "../../../lib/utils"
import { useContainerScrollContext } from "./ContainerComponents"

// Bento grid layout variants
const bentoGridVariants = {

  default : `
    grid-cols-8 grid-rows-[1fr_0.5fr_0.5fr_1fr]
    [&>*:first-child]:col-span-8 md:[&>*:first-child]:col-span-6 [&>*:first-child]:row-span-3
    [&>*:nth-child(2)]:col-span-2 md:[&>*:nth-child(2)]:row-span-2 [&>*:nth-child(2)]:hidden md:[&>*:nth-child(2)]:block
    [&>*:nth-child(3)]:col-span-2 md:[&>*:nth-child(3)]:row-span-2 [&>*:nth-child(3)]:hidden md:[&>*:nth-child(3)]:block
    [&>*:nth-child(4)]:col-span-4 md:[&>*:nth-child(4)]:col-span-3
    [&>*:nth-child(5)]:col-span-4 md:[&>*:nth-child(5)]:col-span-3
  `,

  threeCells : `
    grid-cols-2 grid-rows-2
    [&>*:first-child]:col-span-2
  `,

  fourCells : `
    grid-cols-3 grid-rows-2
    [&>*:first-child]:col-span-1
    [&>*:nth-child(2)]:col-span-2
    [&>*:nth-child(3)]:col-span-2
  `,

}

// Bento grid component
const BentoGrid = React.forwardRef(

  ( { variant = "default" , className , ...props }, ref ) => {

    return (

      <div
        ref = { ref }
        className = { cn (
          "relative grid gap-4 [&>*:first-child]:origin-top-right [&>*:nth-child(3)]:origin-bottom-right [&>*:nth-child(4)]:origin-top-right",
          bentoGridVariants [ variant ],
          className
        ) }
        { ...props }
      />

    )

  }

)
BentoGrid.displayName = "BentoGrid"

// Individual bento cell component
const BentoCell = React.forwardRef(

  ( { className , style , ...props } , ref ) => {

    const { scrollYProgress } = useContainerScrollContext( )
    const translate = useTransform ( scrollYProgress , [ 0.1 , 0.9 ] , [ "-35%" , "0%" ] )
    const scale = useTransform ( scrollYProgress , [ 0 , 0.9 ] , [ 0.5 , 1 ] )
    
    return (

      <motion.div
        ref = { ref }
        className = { className }
        style = { { translate, scale, ...style } }
        { ...props }
      />

    )

  }

)
BentoCell.displayName = "BentoCell"

export { BentoGrid , BentoCell }
