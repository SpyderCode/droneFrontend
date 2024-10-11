
import PropTypes from 'prop-types';
import { useProducts } from '../context/ProductsContext';
import {Link} from 'react-router-dom';
import { IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5';

export default function ProductCard({product}) {
    const { deleteProduct } = useProducts();
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md ">
        <header className="flex justify-between">
            <h1 className="text-2xl text-white font-bold">{product.name}</h1>
            <div className="flex gap-x-2 items-center">
                <button
                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    onClick={() => deleteProduct(product._id)}
                >
                  <IoTrashBinSharp size={20} className='inline' />
                  </button>
                <Link 
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                to={'/products/'+product._id} >
                  <IoPencilSharp size={20} className='inline' />
                  </Link>
            </div>
        </header>
        <p className="text-slate-300 my-2">${product.price}</p>
        <p className="text-slate-300 my-2">{product.year}</p>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
};
