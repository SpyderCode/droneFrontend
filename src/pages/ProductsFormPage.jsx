import { useForm } from "react-hook-form";
import { useProducts } from "../context/ProductsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { IoBagAdd } from "react-icons/io5";

export default function ProductsFormPage() {
  const { register, handleSubmit, setValue, formState:{ errors }} = useForm({
    defaultValues: {price: 0, year: new Date().getFullYear() },
  });
  const {createProduct, getProduct, updateProduct } = useProducts();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const product = await getProduct(params.id);
        setValue("name", product.name);
        setValue("price", product.price);
        setValue("year", product.year);
        console.log(product);
      }
    }
    loadProduct();
  }, [params.id, getProduct, setValue]);


  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateProduct(params.id, data);
    } else {
      createProduct(data);
    }
    navigate("/products");
  });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

      <form onSubmit={onSubmit}>
      <label className="text-2xl text-white">Nombre</label>
        <input
          type="text"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Nombre del producto"
          {...register("name", { required: true })}
          autoFocus
        />
        {
          errors.name && <p className="text-red-500">Este campo es requerido</p>
        }
        <label className="text-2xl text-white">Precio</label>
        <input
          type="number" step="0.10"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Precio del producto"
          {...register("price", { valueAsNumber: true })}
        />
        {
          errors.price && <p className="text-red-500">Este campo es requerido</p>
        }
        <label className="text-2xl text-white">Año</label>
        <input
          type="number" step="1" max={new Date().getFullYear() } min="1900"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Año del producto"
          {...register("year", { 
            valueAsNumber: true,
            min: { value: 1900, message: 'El año debe ser mayor a 1900' }
          })}
          
        />
        {
          errors.year && <p className="text-red-500">{errors.year.message}</p>
        }
        <button
          className="bg-transparent hover:bg-zinc-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-zinc-500 hover:border-transparent rounded"
          type="Submit" >
          <IoBagAdd size={20} className='inline mx-2' />
          Guardar
          </button>

      </form>
    </div>
  );
}
