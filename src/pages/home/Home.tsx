import React, { useEffect } from 'react';
import classes from './Home.module.scss';
import { localStorageKeys } from '../../interfaces/localStorage.interface';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const userdata = localStorage.getItem(
    localStorageKeys.USER_DATA
  );
  const parsedUserdata = userdata ? JSON.parse(userdata) : null;
  useEffect(() => {
    const userData = localStorage.getItem(localStorageKeys.USER_DATA);
    const authToken = localStorage.getItem(localStorageKeys.AUTH_TOKEN);

    if (!(userData && authToken)) {
        navigate('/auth/login');
    }
}, [navigate]);
  const handleLoginClick = () => {
    localStorage.setItem(localStorageKeys.USER_DATA, JSON.stringify({}));
    localStorage.setItem(localStorageKeys.AUTH_TOKEN, '');
    navigate('/auth/login')
  };
  return (
    <div className={classes['home']}>
      <div className={classes['welcome-message']}>Welcome to</div>
      <div className={classes['platform-name']}>Unstop</div>
      <div className={classes['user-profile']}>

        <img src={parsedUserdata?.image} className={classes['user-image']} />

        <div className={classes['user-name']}>
          {parsedUserdata?.firstName} {parsedUserdata?.lastName}
        </div>
        <div className={classes['user-email']}>
          {parsedUserdata?.email}
        </div>
        <div className={classes['user-email']}>
          {parsedUserdata?.gender}
        </div>
        <button onClick={handleLoginClick} className={classes['login-container']}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home