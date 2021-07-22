import './App.css';
import Menu from './comp/Menu';
import { useState } from 'react';
import Selected from './comp/Selected';
import Allergens from './comp/Allergens';

const App = () => {

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  return ( 
    <div className="columns">
        <div className="column box">
            <h2 className='is-size-3 has-text-centered p-5'>Menu</h2>
            <Menu cart={ cart } setCart={ setCart } total={ total } setTotal={ setTotal }/>
        </div>
        <div className="column box">
            <div className="container">
            <h2 className='is-size-3 has-text-centered p-5'>Your Selection</h2>
                <div className="is-flex is-justify-content-space-between">
                    <span>Total: { total } items</span>
                    <Allergens cart={ cart } setCart={ setCart }/>
                </div>
            </div>
            <div className="container">
                <Selected cart={ cart } setCart={ setCart } total={ total } setTotal={ setTotal }/>
            </div>
        </div>
  </div>
  );
}
 
export default App;

