import { useLoaderData } from "react-router-dom"
import Cart from "./cart/Cart"
import { useEffect, useState } from "react"
import axios from "axios"
import URL from "../../../../url/URL"

const Home = () => {
  const {data} = useLoaderData()
  const [products, setProducts] = useState(data)
  const [count, setCount] = useState(0)
  const [perPageItems, setPerPageItems] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(()=>{
    axios(`${URL}/productsCount`)
    .then(res=>{
      setCount(res.data.count)
    })
  },[])
  useEffect(()=>{
    axios(`${URL}/products?page=${currentPage}&size=${perPageItems}`)
    .then(res=>setProducts(res.data))
  },[currentPage, perPageItems])
  
  console.log(count)
  const totalPage = Math.ceil(count/perPageItems)
  const pages = [...Array(totalPage).keys()]
  console.log(pages)

  const handlePerPageItem=(e)=>{
    const val = parseInt(e.target.value)
    setCurrentPage(1)
    setPerPageItems(val)
  }
  const handlePrevious = ()=>{
    if(currentPage>1)
      setCurrentPage(currentPage - 1)
  }
  const handleNext = ()=>{
    if(currentPage<totalPage)
      setCurrentPage(currentPage + 1)
  }

  return (
    <div>
      <div className="flex justify-center gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          products.map(product=><Cart key={product._id} product={product}/>)
        }
      </div>
        <div>
          <div className="p-10 bg-gray-50">
            <h2 className="text-2xl font-bold underline mb-6">My Cart</h2>
            <h4 className="text-xl font-semibold">Select Items : </h4>
            <h4 className="text-lg font-semibold my-6">Total price : price</h4>
            <button className="btn btn-secondary">Clear cart</button>
          </div>
        </div>
      </div>
        <div className="flex justify-center">
        <button className="btn" onClick={handlePrevious}>Previous</button>
          {
            pages.map(page=><button
            className={ currentPage===page+1 ? `btn btn-warning` : `btn`} 
            onClick={()=>setCurrentPage(page+1)}
            key={page+1}>{page+1}</button>)
          }
          <button className="btn" onClick={handleNext}>Next</button>
          <select className="ml-10 bg-slate-200 p-3" value={perPageItems} onChange={handlePerPageItem}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
    </div>
  )
}

export default Home