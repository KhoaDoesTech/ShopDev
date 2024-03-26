// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { login } from '../services/auth';
import { setLogin, setShop } from '../store/reducer/auth';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, control, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    const response = await login({
      email: data.email,
      password: data.password,
      role: "SHOP"
    });
    if (response.message === "OK") {
      toast.success('Đăng nhập thành công!')
      const token = response.metadata.tokens.accessToken
      const shop = response.metadata.shop;
      dispatch(setLogin(token))
      dispatch(setShop(shop));
    }
    else {
      toast.error('Đăng nhập thất bại!')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-4 rounded-md bg-gray-50">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto my-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: 'Email không được để trống.',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Địa chỉ email không hợp lệ.',
                },
              }}
              render={({ field }) => <input {...field} className="w-full p-2 border border-gray-300 rounded" />}
            />
            <p className="text-red-500 text-xs mt-1">{errors.email && errors.email.message}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Mật khẩu</label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: 'Mật khẩu không được để trống.',
                // minLength: {
                //   value: 6,
                //   message: 'Mật khẩu phải chứa ít nhất 6 ký tự.',
                // },
                // pattern: {
                //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                //   message: 'Mật khẩu phải chứa chữ in hoa, in thường, ký tự đặc biệt và số.',
                // },
              }}
              render={({ field }) => <input type="password" {...field} className="w-full p-2 border border-gray-300 rounded" />}
            />
            <p className="text-red-500 text-xs mt-1">{errors.password && errors.password.message}</p>
          </div>
          <Link to={"/passrecover"} className="text-blue-400 font-bold text-sm w-full flex justify-between items-center mb-2 hover:text-blue-600 cursor-pointer">
            Quên mật khẩu
          </Link>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full mb-4">Đăng nhập</button>
          <p className="text-center text-sm">
            Chưa có tài khoản?
            <Link to={"/signup"} className="text-blue-400 font-bold text-sm w-full inline ml-1 justify-between items-center mb-2 hover:text-blue-600 cursor-pointer">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  );
};

export default Login;
