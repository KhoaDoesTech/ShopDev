import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { signup } from '../services/auth';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, control, formState: { errors }, watch } = useForm();
  const onSubmit = async (data) => {
    const response = await signup(data);
    if (response.status === 201) {
      toast.success('Đăng ký thành công!')
      toast.success('Quay về trang đăng nhập sau 3s..')
      setTimeout(() => navigate("/login"), 3000)
    }
    else {
      toast.error('Đăng ký thất bại! Email đã được sử dụng')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-4 rounded-md bg-gray-50">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng ký
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto my-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tên shop</label>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: 'Tên shop không được để trống',
                maxLength: {
                  value: 32,
                  message: "Tên shop không được vượt quá 32 ký tự"
                }
              }}
              render={({ field }) => <input {...field} className="w-full p-2 border border-gray-300 rounded" />}
            />
            <p className="text-red-500 text-xs mt-1">{errors.name && errors.name.message}</p>
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nhập lại mật khẩu</label>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: 'Vui lòng nhập lại mật khẩu.',
                validate: (value) =>
                  value === watch("password") ||
                  "Xác nhận mật khẩu không khớp."
              }}
              render={({ field }) => <input type="password" {...field} className="w-full p-2 border border-gray-300 rounded" />}
            />
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword && errors.confirmPassword.message}</p>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full mb-5">Đăng ký</button>
          <Link to={"/login"} className="text-blue-400 text-sm font-bold w-full flex justify-between items-center mb-2 hover:text-blue-600 cursor-pointer">
            Quay về trang đăng nhập
          </Link>
        </form>
      </div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  );
};

export default SignUp;
