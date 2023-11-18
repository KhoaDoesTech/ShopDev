// NotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-16">
       <div className="flex justify-center w-full"><img src="https://opendoodles.s3-us-west-1.amazonaws.com/clumsy.svg" className='w-[calc(100vw/3)] mt-8'/></div>
      <h1 className="text-4xl font-bold mt-8">404 - Trang không tồn tại</h1>
      <p className="text-lg mt-4">Trang bạn tìm kiếm đ** tồn tại</p>
      <a href="/" className="underline text-sky-400">Trở về trang chủ</a>
    </div>
  );
};

export default NotFound;
