import React from 'react';

const Selected = ({ cart, setCart, total, setTotal}) => {
    
    function handleRemove(product) {
        const productIndex = cart.findIndex(item => item.name === product.name);
        const updateCart = [...cart];
        setTotal(total - updateCart[productIndex].qty);
        updateCart.splice(productIndex, 1)
        setCart(updateCart);
        return ;
    }

    return ( 
      
        <ul className="menu-preview">
            { cart.length > 0 && cart.map( item => {
                if (item.hide) {
                    console.log('selected', item, item.hide)
                    return null;
                } else {
                    return (
                        <li className="item box" key={ item.id }>
                            <h2>{ item.name }</h2>
                            <p>
                                { item.dietaries.map( diet =><span key={ diet } className="dietary">{ diet }</span>) }
                            </p>
                            <p> Quantity: { item.qty }</p>
                            <button className="remove-item" onClick={() => { handleRemove(item) }}>x</button>
                        </li>
                    )
                }
            }
            )}
        </ul>
     );
}
 
export default Selected;