import React, { useEffect, useState } from 'react'
import '../Home/Home.css'
import Catagories from '../Catagories/Catagories'
import axios from 'axios'
import ProductsItems from '../Products/ProductsItems';

import '../Products/prod.css'
export default function HomePage() {
    let [finalCatagories, setFinalCatagories] = useState([]);
    let [finalProducts, setfinalProducts] = useState([]);
    let [catName, setcatName] = useState('');
    let [loading ,setLoading] = useState(false)
    let [currRateUSD ,setcurrRateUSD] = useState(0)


    let GetCategories = ()=>{
        setLoading(true)
        axios.get('https://dummyjson.com/products/categories')
        .then((res)=>res.data)
        .then((finalData)=>{
            // console.log(finalData)
            setFinalCatagories(finalData);
            setLoading(false)
                })
    }
       
    let GetProducts = ()=>{
        setLoading(true)
        axios.get("https://dummyjson.com/products")
        .then((res)=>res.data)
        .then((finalData)=>{
            setfinalProducts(finalData.products)
            // console.log(finalData.products)
            setLoading(false)
        })
    }

    let GetCurrentDollorDate = ()=>{
        axios.get("https://api.exchangerate-api.com/v4/latest/USD")
        .then((res)=>res.data)
        .then((finalData)=>{
            //setfinalProducts(finalData.products)
            setcurrRateUSD(finalData.rates.PKR)
            
        })
    }

    useEffect(()=>{
        GetCategories()
        GetProducts()
        GetCurrentDollorDate();
        
    },[])

    let piItems = finalProducts.map((value,index)=>{
        return(
            <ProductsItems ProductData={value} key={index} currRateUSD={currRateUSD}/>
        )
    })

    useEffect(()=>{
        if(catName!=="")
        {
            setLoading(true)
            axios.get(`https://dummyjson.com/products/category/${catName}`)
            .then((res)=>res.data)
            .then((finalData)=>{
                setfinalProducts(finalData.products)
                console.log(finalData)
                setLoading(false)
            }) 
        }       

    },[catName])



  return (
    <>
        <div className='py-[40px]'>
            <div className='max-w-[1320px] mx-auto'>
                <h1 className='text-center text-[50px] font-bold mb-[40px]'>Our Products</h1>
                <div className='grid grid-cols-[30%_auto] gap-[20px]'>
                    <div className=''>

                            {
                                finalCatagories.length>=1? 
                                        <Catagories finalCatagories={finalCatagories} setcatName={setcatName}/>
                                    : 
                                        <h1>Not Found</h1>}
                            
                    </div>
                    
                    <div>
                    {
                        loading?
                                <div className='box'>
                                        <img src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1263.gif" 
                                    alt="loading" 
                                    className='center'
                                    />
                                </div>
                                :
                                <div className='grid grid-cols-3 gap-4 cont'>
                                     { ProductsItems.length>=1?
                                     piItems
                                     :
                                    "Product not found"
                                     }
                        
                         </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
