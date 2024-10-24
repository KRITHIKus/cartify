import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import Home from './pages/home';
import Cart from './pages/cart';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Productdetails from './pages/productdetail';
import { useState } from 'react';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const[cartitems,setcartitems]=useState([ ])
  return (
    <div className="App">
      <Router>
        <div>
          <ToastContainer 
         theme='dark'
          position="top-center"
          // autoClose={5000}
          // hideProgressBar={false}
          // newestOnTop={false}
          // closeOnClick
          // rtl={false}
          pauseOnFocusLoss
          draggable
          // pauseOnHover
          // theme="dark"
          // transition: Bounce
          />
         
        <Header cartitems={cartitems}/>
        <Routes>
          <Route path="/" element={  <Home/>}/>
          <Route path="/search" element={  <Home/>}/>
          <Route path="/product/:id" element={  <Productdetails cartitems={cartitems}setcartitems={setcartitems}/>}/>
        <Route path='/cart' element={<Cart cartitems={cartitems} setcartitems={setcartitems}/>}/>
        </Routes>
        </div>
        
      </Router>
      
     
     <Footer/>
    </div>

  );
}

export default App;
