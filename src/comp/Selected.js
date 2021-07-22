import React from 'react';
import ArrayModifier from './ArrayModifier';

const Selected = ({ cart, setCart, total, setTotal}) => {
    
    function handleClick (product, e) {
        const index = cart.findIndex(item => item.name === product.name);
        const modificationType = e.target.value;
        const { data, totalUpdate} = ArrayModifier ({ index, modificationType, cart, product, total});
        setCart(data);
        setTotal(totalUpdate);
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
                                { item.allergens.map( allergen =><span key={ allergen } className="allergen">{ allergen }</span>) }
                            </p>
                            <p> Quantity: { item.qty }</p>
                            <button className="remove-item delete" value='RemoveAll' onClick={(e) => { handleClick(item, e) }}>x</button>
                        </li>
                    )
                }
            }
            )}
        </ul>
     );
}
 
export default Selected;