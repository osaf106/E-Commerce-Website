import React from 'react'
import '../Catagories/catagories.css'
export default function Catagories({finalCatagories,setcatName}) {
    let cat =  finalCatagories.map((value,index)=>{
        return(
                 <li onClick={()=>{
                    setcatName(value.slug)
                    window.scrollTo({
                        top: 0, // Scroll to the top
                        behavior: 'smooth' // For smooth scrolling
                      });
                 }} key={index} className='bg-[#ccc] p-[7px] cursor-pointer text-[20px] font-serif font-[500] mb-2 Cli'>{value.name}</li>
        )
    })
  return (
    <div>
            <h3 className='text-[20px] font-[500] p-[10px] Ch3'>Product Category</h3>

            <ul>
                {
                    cat
                }
                
            </ul>
    </div>
  )
}
