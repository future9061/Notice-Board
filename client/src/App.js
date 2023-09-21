import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <div className='app'>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
