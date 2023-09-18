import './ProjectHermesApp.scss'

import HermesNavBar from "./components/layout/HermesNavBar/HermesNavBar";
import HermesPostList from './pages/HermesPostList/HermesPostList';
import HermesPostDetails from './pages/HermesPostDetails/HermesPostDetails';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState, } from 'react';
import { User } from './utils/types';
import Hermes404 from './pages/Hermes404/Hermes404';
import HermesAlert from './components/ui/HermesAlert/HermesAlert';

const ProjectHermesApp = () => {
  // State to hold user information. The API returns posts without complete
  // user details (only includes userId). Since the API has a fixed set of 10 users,
  // fetching all users upfront is more efficient than fetching user details for each post.
  const usersRef = useRef<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const [isAlertActive, setIsAlertActive] = useState<boolean>(false);
  const alertMessage = useRef<string>('');

  const isHomePageActive = location.pathname === '/';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // alert placeholder for non-essential features, added to fill gaps in UI
  const alertUserAboutUnavailableFeature = (message: string) => {
    setIsAlertActive(true);
    alertMessage.current = message;
    setTimeout(() => {
      setIsAlertActive(false);
      setTimeout(() => {
        alertMessage.current = '';
      }, 500);
    }, 2000);
  };

  useEffect(() => {

    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      const userRes = await fetch(`https://jsonplaceholder.typicode.com/users`);
      const userData = await userRes.json();
      usersRef.current = userData;
      setIsLoadingUsers(false);
    };

    fetchUsers();
  }, []);

  return (
    <div className="layout-container">
      <HermesAlert isActive={isAlertActive} message={alertMessage.current} />
      <div className="layout-header">
        <img className='logo' src="../logo.png" alt="logo" />
      </div>
      <div className="layout-navigation">
        <HermesNavBar
          onSearchChange={setSearchValue}
          onNewPostPress={alertUserAboutUnavailableFeature}
        />
      </div>
      <div className="layout-search">
        <input
          type="text"
          disabled={!isHomePageActive}
          className='layout-search__input'
          placeholder={isHomePageActive ? "Filter posts by User's name..." : 'Filter disabled on details page'}
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <div id="main-layout" className="layout-main">
        <Routes>
          {!isLoadingUsers && <Route path="/" element={<HermesPostList users={usersRef.current} searchValue={searchValue} />} />}
          {!isLoadingUsers && <Route path="/posts/:id" element={<HermesPostDetails users={usersRef.current} />} />}
          <Route path="*" element={<Hermes404 customName='404 Page' />} />
        </Routes>
      </div>
      <div className="layout-other placeholder">
      </div>
      <div className="layout-empty placeholder">
      </div>
    </div>
  )
}

export default ProjectHermesApp
