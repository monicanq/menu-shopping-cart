import React from 'react';
import { useEffect, useState } from 'react';

const Allergens = ({ cart, setCart }) => {
    const [allergenObject, setAllergenObject] = useState( {} );

    useEffect(() => {
        let updateDietObject =  {'ve': 0, 'v': 0, 'rsf': 0, 'n!': 0, 'df': 0, 'gf': 0};
        cart.map(item => {
            item.allergens.map(allergen => {
                updateDietObject[allergen] += item.qty;
                return null;
            })
            return null;
        });
        setAllergenObject(updateDietObject);
    }, [cart, setAllergenObject])
    
    return (
        <div className='is-flex'>
            {
                Object.entries(allergenObject).map((item) =>(
                    <p key={item[0]}><span className="allergen">{ item[0] } </span>{ item[1] }</p>
                )
              )
            } 
        </div>
    )
}
 
export default Allergens;