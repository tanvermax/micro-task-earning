import React, { useState, useRef, useEffect } from 'react';

const UserDropDown = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className=" ps-1 pe-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <img className="w-8 h-auto rounded-full" src={user.photoURL} alt="Avatar" />
        <div className="flex flex-col gap-0.5 text-left">
          <span className="text-gray-600 font-medium truncate max-w-30 dark:text-neutral-400">{user.displayName}</span>
          <span className="text-gray-600 font-medium truncate max-w-30 dark:text-neutral-400">{user.email}</span>
        </div>

        <svg className={`size-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-lg bg-white shadow-md dark:bg-neutral-800 dark:border dark:border-neutral-700">
          <div className="p-1 space-y-0.5">
            <a className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700" href="/dashbord/UserProfile">
             Edit Profile
            </a>
            <a className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700" href="#">
              Purchases
            </a>
            <a className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700" href="#">
              Account Setting
            </a>
              <a className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700" href="#">
              Support
            </a>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-red-600"
            >
              Log Out
            </button>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropDown;
