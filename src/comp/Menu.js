import React from 'react';
import useFetch from '../hooks/useFetch';
import { useState, useEffect } from 'react';
import ArrayModifier from './ArrayModifier';


const Menu = ( {cart, setCart, total, setTotal}) => {
    let url = 'http://localhost:8000/menu';
    const [name, setName] = useState('');
    const [menuItems, setMenuItems] = useState(null);
    const { data, isPending, error } = useFetch(url);

    // Fill out the menu items when we receive the data
    useEffect(() => {
        setMenuItems(data);
    }, [data]);

    // Filter out the items in the menu per user input
    useEffect(()=>{
        const updateMenu = [];
        const search = name.toLowerCase();
        if (data) {
            data.items.map((item) => {
                if (item.name.toLowerCase().includes(search)) updateMenu.push(item); 
                return null;
            });
        }
        setMenuItems({items: updateMenu});
    },[name, data]);

    //Call ArrayModifier component to modify the cart
    function handleClick (product, e) {
        const modificationType = e.target.value;
        const index = cart.findIndex( item => item.name === product.name );
        const { data:array, totalUpdate} = ArrayModifier ({ index, modificationType, cart, product, total});
        setCart(array);
        setTotal(totalUpdate);
    }

    return ( 
        <div>
            <div className="filters">
                <input 
                className= 'input is-medium '
                placeholder='Search by ingredient'
                type="text"
                required
                value={ name }
                onChange= {e=> setName(e.target.value)}
                />
            </div>
            <ul className="item-picker" >
                {error && <div> { error }</div>}
                {isPending && <div>{ isPending }</div>}
                {menuItems &&  menuItems.items.map( item =>
                    (
                    <li className="item box" id={ item.id } key={ item.id } >
                        <h2>{ item.name }</h2>
                        <p>
                            { item.allergens.map(allergen => <span key={ allergen } className="allergeb">{ allergen }</span>) }
                        </p>
                        <div className="is-flex is-justify-content-flex-end">
                            <button className='button is-outlined qty' value='Add' onClick={ (e) => { handleClick( item, e ) } }>+</button>
                            <button className='button is-outlined qty' value='Remove' onClick={ (e) => { handleClick( item, e ) } }>-</button>
                        </div>
                    </li>
                    )
                )}
            </ul>
        </div>
     );
}
 
export default Menu;