const ArrayModifier = ({ cart:array, modificationType, product:item, index, total }) => {
    let data = [...array];
    let itemUpdate = {};
    let totalUpdate = total;

    switch(modificationType){

        case 'Add':
            if (index >= 0) {
                itemUpdate = data[index];
                itemUpdate.qty +=1;
                data.splice(index, 1, itemUpdate);
            } else {
                itemUpdate = item;
                itemUpdate.qty = 1;
                data.push(itemUpdate);
            }
            totalUpdate = total + 1;
            break;

        case 'Remove':
            if (index < 0){
                break;
            }
            itemUpdate = data[index];
            itemUpdate.qty -=1;
            itemUpdate.qty !== 0 ? data.splice(index, 1, itemUpdate) : data.splice(index, 1);
            totalUpdate = total - 1;
            break;

        case 'RemoveAll':
            totalUpdate = total - data[index].qty;
            data.splice(index, 1);            
            break;
            
        default:
            console.log('Modification type not accepted, received modification type ' + modificationType + ' expected: Add, Remove, RemoveAll');
            break;
    }

    return { data, totalUpdate };
}

export default ArrayModifier;