// Setups
const express = require('express');
const app = require('../app');
const router = new express.Router();
const Item = require('../item')

/**
 * Route to handle adding items to shopping cart (items array).
 */
router.post('/', function addToShoppingCart(req, res, next){
    
    try{
        let newItem = new Item(req.body.name, req.body.price);
        return res.status(201).json({ item: newItem });
    } catch(e){
        // let express know that we are passing an error.
        next(e);
    }
});

/**
 * Route to return all the items in the shopping list (items array).
 */
router.get('/', function getShoppingList(req, res, next){
    
    try{
        return res.status(200).json({ items: Item.getAllItems() });
    } catch(e){
        // let express know that we are passing an error.
        next(e);
    }
});

/**
 * Route to get the item's info by name. 
 */
router.get('/:name', function getItemInfo(req, res, next){

    try{
        return res.status(200).json({ item: Item.find(req.params.name) });
    } catch(e){
        // let express know that we are passing an error.
        next(e);
    }
});

/**
 * Route to modify the item's attribute: name and/or price. 
 */
router.patch('/:name', function modifyItemInfo(req, res, next){
    
    try{
        let foundItem = Item.updateItem(req.params.name, req.body);
        return res.status(201).json({ item: foundItem });
    } catch(e){
        // let express know that we are passing an error.
        next(e);
    }
});

/**
 * Route to delete the item from the shopping list (items array).
 */
router.delete('/:name', function deleteItem(req, res, next){
    try{
        Item.deleteItem(req.params.name);
        return res.json({ message: 'deleted' });
    } catch(e){
        // let express know that we are passing an error.
        next(e);
    }
});


module.exports = router;