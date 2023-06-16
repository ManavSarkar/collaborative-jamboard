import React, { useState } from 'react';

const DropdownButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <button onClick={toggleDropdown}>Toggle Dropdown</button>
      {isDropdownOpen && (
        <div className='dropdown-content'>
            Dropdown content
          {/* Dropdown content goes here */}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
