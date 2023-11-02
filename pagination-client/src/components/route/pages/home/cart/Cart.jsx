import PropTypes from 'prop-types';
// import {  useState } from 'react';

const Cart = ({product}) => {
    const {_id,img, category,name,price,seller} = product
    // const [ids, setIds] = useState([])
    // const handleAddtoCart=(id)=>{

  
    // }


  return (
    <div>
        <div className="card w-full bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={img} alt="product Image" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{name}</h2>
              <h2 className="card-title">Type : {category}</h2>
              <h2 className="card-title">Price : {price}</h2>
              <h2 className="card-title">Brand : {seller}</h2>
              <div className="card-actions">
                <button className="btn btn-primary" >Add To Cart</button>
              </div>
            </div>
        </div>
    </div>
  )
}

Cart.propTypes={
    product:PropTypes.object
}

export default Cart