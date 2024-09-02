import React from 'react'
import '../Products/prod.css'
export default function ProductsItems({ProductData,currRateUSD}) {
  return (
    <div className='shadow-lg text-center pb-4'>
        <img src={ProductData.thumbnail} alt="hi" className='w-[100%] h-[220px] imgH'/>
        <h3 className='Ph3'>{ProductData.title}</h3>
        <b>RS {Math.round(ProductData.price*currRateUSD)}</b>
     </div>
  )
}
