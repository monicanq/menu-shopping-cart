import './App.css';
import Menu from './comp/Menu';
import { useState } from 'react';
import Selected from './comp/Selected';
import Dietaries from './comp/Dietaries';

const App = () => {

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  return ( 
    <div className="wrapper">
    <div className="menu-summary">
      <div className="container">
        <div className="row">
          <div className="col-6 menu-summary-left">
            <span>{ total } items</span>
          </div>
          <Dietaries cart={ cart } setCart={ setCart }/>
        </div>
      </div>
    </div>
    <div className="container menu-builder">
      <div className="row">
          <Menu cart={ cart } setCart={ setCart } total={ total } setTotal={ setTotal }/>
        <div className="col-8"> 
          <h2>Menu preview</h2>
          <Selected cart={ cart } setCart={ setCart } total={ total } setTotal={ setTotal }/>
        </div>
      </div>
    </div>
  </div>
  );
}
 
export default App;

