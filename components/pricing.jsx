import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const Pricing = () => {
  return (
    
      
         <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Choose Your Power Level
          </h2>
          <p className="text-2xl text-white/70 max-w-3xl mx-auto">
            Scale your creative workflow with plans designed for every level of ambition
          </p><section className=' py-20 id="pricing" mx-auto max-w-6xl flex text-center px-6items-center'><PricingTable/></section></div></div>
  )
}

export default Pricing
