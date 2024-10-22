import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogIn, IoPersonAdd, IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/products');
    }
  }, [isAuthenticated, navigate]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  }


  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    signup(data);
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <h1 className="text-3xl text-white text-center">Registrar</h1>
        {
          registerErrors.map((error, index) => (
            <p key={index} className="bg-red-500 p-2 my-2 text-white">{error}</p>
          ))
        }
        <form onSubmit={onSubmit}>
        <label className="text-2xl text-white">Username</label>
          <input
            {...register("username", { required: true, minLength: 5 })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="text"
            placeholder="Username"
          />
          {
            errors.username?.type === 'required' && <p className="text-red-500">This field is required</p>
          }
          {
            errors.username?.type === 'minLength' && <p className="text-red-500">This field must have at least 5 characters</p>
          }
          <label className="text-2xl text-white">Email</label>
          <input
            {...register("email", {
              required: true,
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
              }
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="email"
            placeholder="Email"
          />
          {
            errors.email?.type === 'required' && <p className="text-red-500">This field is required</p>
          }
          {
            errors.email?.message && <p className="text-red-500">Invalid email</p>
          }
          <label className="text-2xl text-white">Password</label>
          <div className="flex justify-end items-center relative">
          <input type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {
            showPassword ? 
            <IoEyeOffSharp size={30} onClick={togglePassword} className="absolute right-2 cursor-pointer" /> :
            <IoEyeSharp size={30} onClick={togglePassword} className="absolute right-2 cursor-pointer" />
          }
          {
            errors.password?.type === 'required' && <p className="text-red-500">This field is required</p>
          }
          </div>

          <label className="text-2xl text-white">Role</label>
          <select
            {...register("role", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          >
            <option value="">Select Role</option>
            <option value="operator">Operator</option>
            <option value="analyst">Analyst</option>
            {/* Add more roles as needed */}
          </select>
          {errors.role && <p className="text-red-500">Please select a role</p>}

          <button type="Submit" className="bg-transparent hover:bg-zinc-500 text-white 
                        font-semibold hover:text-white py-2 px-4 border border-zinc-400 
                        border-transparent rounded"
                >
                  <IoPersonAdd size={30} className="inline"/> Registrar
                </button>
        </form>
        <p className="flex gap-x-2 justify-between pt-5 mt-5">
          ¿Ya tienes cuenta?
          <Link to="/login" className="text-blue-500">
          <IoLogIn size={30} className="inline"/>
          Inicia Sesion</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
