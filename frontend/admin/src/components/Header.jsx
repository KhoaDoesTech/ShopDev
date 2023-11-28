import React from 'react'
import Popover from './Popover';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout, shopSelector } from '../store/reducer/auth';

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const shop = useSelector(shopSelector);
  return (
    <header className="bg-gray-400 text-white p-4 flex justify-end items-center w-full">
      <Popover placement="bottomLeft" content={
        <ul className="min-w-max">
          <li className='menu-item'>
            Profile
          </li>
          <li className='menu-item' onClick={() => { dispatch(setLogout()); localStorage.removeItem("accessToken") }}>
            Đăng xuất
          </li>
        </ul>

      }>
        <div className="flex items-center">

          <div className="rounded-full overflow-hidden h-8 w-8">
      
            <img
              src="https://st4.depositphotos.com/14903220/22197/v/450/depositphotos_221970610-stock-illustration-abstract-sign-avatar-icon-profile.jpg"  // Replace with the path to your avatar image
              alt="Profile Avatar"
              className="object-cover h-full w-full"
              title={shop?.name}
            />
          </div>
          <span className="ml-2 text-container">{shop?.name}</span>
        </div>
      </Popover>
    </header>
  );
}

export default Header