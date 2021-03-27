// Setups
process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('../app');
let items = require('../fakeDB');

// Create an item. 
let item1 = { name: "Racket", price: 1500.45 };

beforeEach(function(){
    items.push(item1);
});

afterEach(function(){
    items.length = 0;   // To reset the array. 
});


describe("GET /items", ()=>{
    
    test("Get all items", async ()=>{
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items: [item1]});
        expect(items).toHaveLength(1)
    });

    test('GET /items/:name', async ()=>{
        const res = await request(app).get('/items/Racket');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item: item1});
        expect(items).toHaveLength(1)
    });

    test('Responds with 404 for invalid item', async () =>{
        const res = await request(app).patch(`/items/asdsad`);
        expect(res.statusCode).toBe(404);
    });
});

describe("POST /items", ()=>{
    test("Creating an item", async ()=>{
        const res = await request(app).post('/items').send({ name: "Snickers", price: 4500});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ item: {name: "Snickers", price: 4500} });
        expect(items).toHaveLength(2)
    });
});

describe("PATCH /items/:name", ()=>{

    test("Change name Racket to Skittles", async ()=>{
        const res = await request(app).patch('/items/Racket').send({ name: "Skittles", price: 1500.45});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ item: {name: "Skittles", price: 1500.45} });
        expect(items).toHaveLength(1);
    });
    test('Responds with 404 for invalid name', async () =>{
        const res = await request(app).patch(`/items/Racket`).send({ name: 'aksdla' });
        expect(res.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", ()=>{

    test("Delete the item Racket.", async ()=>{
        const res = await request(app).delete(`/items/${item1.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'deleted' });
        expect(items).toHaveLength(0);
    });
});