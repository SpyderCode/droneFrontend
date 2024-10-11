import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoLogIn, IoPersonAdd, IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import ReCaptcha from 'react-google-recaptcha';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, isAuthenticated, errors: signInErrors } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/products');
    }
  }, [isAuthenticated, navigate]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  }



  const onSubmit = handleSubmit((data) => {
    signin(data);
  });



  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-screen-md w-full p-10 rounded-md">
        <h1 className="text-3xl text-white text-center">Iniciar Sesion</h1>
        {
          signInErrors.map((error, index) => (
            <p key={index} className="bg-red-500 p-2 my-2 text-white">{error}</p>
          ))
        }
        <form onSubmit={onSubmit}>

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
          
          <button type="Submit" className="bg-transparent hover:bg-zinc-500 text-white 
                        font-semibold hover:text-white py-2 px-4 border border-zinc-400 
                        border-transparent rounded"
                        disabled={!recaptchaValue}
                >
            <IoLogIn size={30} />
          </button>
          <ReCaptcha
            sitekey="6LelG10qAAAAAHgZrlqhtIO5juvpFU_hBLqgFcAj"
            onChange={(value) => setRecaptchaValue(value)}
          />
        </form>
        <div className="flex gap-x-2 justify-between pt-5 mt-5">
          ¿No tienes cuenta?
          <Link to="/register" className="text-blue-500">
            <div className="flex items-center">
              Registrate
              <IoPersonAdd size={30} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage