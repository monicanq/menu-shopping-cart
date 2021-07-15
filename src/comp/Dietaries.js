import React from 'react';
import { useEffect, useState } from 'react';

const Dietaries = ({ cart, setCart }) => {
    const [dietObject, setDietObject] = useState( {'ve': 0, 'v': 0, 'rsf': 0, 'n!': 0, 'df': 0, 'gf': 0});
    const [selectedArray, setSelectedArray] = useState([]);
    
    useEffect(() => {
        let dietArray = [];
        let updateDietObject =  {'ve': 0, 'v': 0, 'rsf': 0, 'n!': 0, 'df': 0, 'gf': 0};
        
        cart.map(item => {
            for (let i = 0; i < item.qty; i++) dietArray.push(...item.dietaries)
            return null;
        });

        dietArray.map(item => (item in dietObject) ? updateDietObject[item] +=  1 : updateDietObject[item] = 1);
        setDietObject({...updateDietObject});

    }, [cart, dietObject])
    
    const handleClick = (item, e) => {
        e.preventDefault();
        const update = [...selectedArray];
        if(selectedArray.includes(item[0])){
            update.splice(update.indexOf(item[0]),1);
        } else{
            update.push(item[0]);
        }
        setSelectedArray(update);
    }

    // useEffect(() => {  
    //     const updateCart = [...cart]
        
    //     updateCart.map(item => {
    //         if (selectedArray.length === 0) {
    //             item.hide = false;
    //         }

    //         selectedArray.map(selected => {
    //             if (!item.dietaries.includes(selected)){
    //                 item.hide = true;
    //             } else {
    //                 item.hide = false;
    //             }
    //         })
    //         setCart(updateCart)
    //     })       
    // }, [selectedArray])

    
    return (
        <div className="col-6 menu-summary-right">
            {
                Object.entries(dietObject).map((item) =>(
                    <p onClick={ (e) => { handleClick(item, e) }} key={ item[0] }
                    className={selectedArray.includes(item[0]) ? 'selected' : ''}> 
                    <span className="dietary">{ item[0] } </span>{ item[1] }</p>
                )
              )
            } 
        </div>
    )
}
 
export default Dietaries;