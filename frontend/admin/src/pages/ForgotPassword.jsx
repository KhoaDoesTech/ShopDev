// ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { login } from '../services/auth';
import { setLogin, setShop } from '../store/reducer/auth';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, control, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    const response = await login(data);
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
            Khôi phục mật khẩu
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

          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full mb-4">Gửi mail khôi phục mật khẩu</button>
        </form>
      </div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  );
};

export default ForgotPassword;
