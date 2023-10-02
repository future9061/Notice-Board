import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from './store/postSlice.js';
import { userLogin } from './store/userSlice';

function App() {
  const post = useSelector((state) => state.post)
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/api")
      .then((res) => {
        res.data.success && dispatch(getPost(res.data.post))
      })
      .catch((err) => console.log("클라이언트 에러", err))
  }, [post])

  useEffect(() => {
    for (const key of Object.keys(sessionStorage)) {
      if (key.includes('firebase:authUser:')) {
        const userData = JSON.parse(sessionStorage.getItem(key))
        dispatch(userLogin(userData));
      }
    }
  }, [])

  return (
    <div className='app'>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
