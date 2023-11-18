import React from 'react'
import Popover from './Popover';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogout } from '../store/reducer/auth';

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  return (
    <header className="bg-gray-400 text-white p-4 flex justify-between items-center w-full">
      <div>
        <h1 className="text-2xl font-bold">My App</h1>
      </div>
      <Popover placement="bottomLeft" content={
        <ul className="min-w-max">
          <li className='menu-item'>Profile</li>
          <li className='menu-item' onClick={() => dispatch(setLogout())}>Sign out</li>
        </ul>

      }>
        <div className="flex items-center">

          <div className="rounded-full overflow-hidden h-8 w-8">
            <img
              src="https://st4.depositphotos.com/14903220/22197/v/450/depositphotos_221970610-stock-illustration-abstract-sign-avatar-icon-profile.jpg"  // Replace with the path to your avatar image
              alt="Profile Avatar"
              className="object-cover h-full w-full"
            />
          </div>
          {/* You can add a user's name or other information here */}
          <span className="ml-2">John Doe</span>
        </div>
      </Popover>
    </header>
  );
}

export default Header