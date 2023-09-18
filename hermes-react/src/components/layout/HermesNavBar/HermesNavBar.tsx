/* eslint-disable react-refresh/only-export-components */
import { createRef, useState } from 'react';
import './HermesNavBar.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import withLog from '../../../hoc/withLog';

interface HermesNavBarProps {
  onSearchChange: (value: string) => void;
  onNewPostPress: (message: string) => void;
}

const HermesNavBar = ({ onSearchChange, onNewPostPress }: HermesNavBarProps) => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const searchUserInputRef = createRef<HTMLInputElement>();
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePageActive = location.pathname === '/';

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleNewPostPress = () => {
    onNewPostPress("Creating New Posts");
  };

  const toggleSearchOpen = () => {
    const newSearchOpenState = !isSearchOpen;
    setSearchOpen(newSearchOpenState);

    // // focus the input
    // if (!searchUserInputRef.current) {
    //   return;
    // }

    // if (newSearchOpenState) {
    //   searchUserInputRef.current.focus();
    // } else {
    //   searchUserInputRef.current.blur();
    // }
  };

  return (
    <>
      <div className="mobile-bottom-nav prevent-select">
        <div className={`
            mobile-bottom-nav__search 
            ${isSearchOpen ? 'mobile-bottom-nav__search--open' : ''}
            ${!isHomePageActive ? 'mobile-bottom-nav__search--disabled' : ''}
          `}>
          <i className="fa-solid fa-magnifying-glass" />
          <input
            ref={searchUserInputRef}
            type="text"
            className='mobile-bottom-nav__search-input'
            disabled={!isHomePageActive}
            placeholder={isHomePageActive ? "Filter posts by User's name..." : 'Filter disabled on details page'}
            onChange={handleInputChange}
          />
          <button className='mobile-bottom-nav__search-action-item' onClick={toggleSearchOpen}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="mobile-bottom-nav__actions">
          <button
            onClick={() => handleHomeClick()}
            className={`mobile-bottom-nav__action-item mobile-bottom-nav__action-item--secondary ${isHomePageActive ? 'mobile-bottom-nav__action-item--active' : ''}`}>
            <i className="fa-solid fa-house" />
          </button>
          <button
            className={`
            mobile-bottom-nav__action-item 
            mobile-bottom-nav__action-item--primary 
            ${isSearchOpen ? 'mobile-bottom-nav__action-item--primary--hidden' : ''}
            `}
            onClick={handleNewPostPress}>
            <i className="fa-solid fa-plus" />
          </button>
          <button
            className='mobile-bottom-nav__action-item mobile-bottom-nav__action-item--secondary'
            onClick={toggleSearchOpen}>
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </div>
      </div>


      <div className="web-sidebar-nav">
        <button
          onClick={() => handleHomeClick()}
          className={`web-sidebar-nav__action-item ${isHomePageActive ? 'web-sidebar-nav__action-item--active' : ''}`}>
          <i className="fa-solid fa-house" /><span>Home</span>
        </button>
      </div>
    </>
  )
}

export default withLog(HermesNavBar);