import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from './store/postSlice.js';


function App() {
  const dispatch = useDispatch();
  // const state = useSelector((state) => state.post)
  useEffect(() => {
    axios.get("/api")
      .then((res) => {
        res.data.success && dispatch(getPost(res.data.post))
      })
      .catch((err) => console.log("클라이언트 에러", err))
  }, [])

  return (
    <div className='app'>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
