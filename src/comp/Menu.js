import React from 'react';
import useFetch from '../hooks/useFetch';
import { useState, useEffect } from 'react';


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


    // Add or modify the products in the cart
    function handleAdd( product ) {
        const foundIndex = cart.findIndex( item => item.name === product.name );

        // If the item is in the cart
        if (foundIndex >= 0){
            const updateCart = [...cart];
            const itemUpdate =  updateCart[foundIndex];
            itemUpdate.qty += 1;
            updateCart.splice(foundIndex, 1)
            updateCart.push(itemUpdate);
            setCart(updateCart);

        // If it is not in the cart add it
        } else {
            product.qty = 1;
            product.hide = false;
            setCart([...cart, product ]);
        }
        setTotal(total + 1);
    }

    return ( 
        <div>
            <div className="filters">
                <input 
                className= 'input is-medium'
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
                    <li className="item box" id={ item.id } key={ item.id } onClick={ () => { handleAdd(item) } }>
                        <h2>{ item.name }</h2>
                        <p>
                            { item.dietaries.map(diet => <span key={ diet } className="dietary">{ diet }</span>) }
                        </p>
                    </li>
                    )
                )}
            </ul>
        </div>
     );
}
 
export default Menu;