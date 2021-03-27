const items = require('./fakeDB');

class Item{

    // Item object will have a name and price. 
    constructor(name, price) {
        this.name = name;
        this.price = price;
        items.push(this);  // add to our items array.  
    }

    // Return all items. 
    static getAllItems(){
        return items;
    }

    // Update the item. 
    static updateItem(name, data){
        let foundItem = Item.find(name);

        if (foundItem === undefined) {
            throw {message: "Not Found", status: 404}
        }

        foundItem.name = data.name;
        foundItem.price = data.price;
        
        return foundItem;
    }

    // Locate the item in the items array. 
    static find(name){
        const foundItem = items.find(i => i.name === name);
        
        if (foundItem === undefined) {
            throw {message: "Not Found", status: 404}
        }
        
        return foundItem;
    }

    // Delete the item in the items array. 
    static deleteItem(name){
        let itemToDelete = items.findIndex(i => i.name === name);

        if (itemToDelete === -1){
            throw { message: "Item not found.", status: 404 };
        }
        // index of the deleted item, 1 is used to remove itself from items array.
        items.splice(itemToDelete, 1);
    }
}

module.exports = Item;