const express = require('express');
const router = express.Router();
const fs = require('fs');
const {
    v4: uuidv4
} = require('uuid');

const json_pedidos = fs.readFileSync('json/pedidos.json', 'utf-8')
let pedidos = JSON.parse(json_pedidos);


//home route
router.get('/', (req, res) => {
    res.render('index')
});
router.get('/carrito', (req, res) => {
    let total = 0
    if (pedidos[0]) {
        for (let i = 0; i < pedidos.length; i++) {
            total += Number(pedidos[i].prize)
        }
        total = total.toFixed(2)
    }
    res.render('cargacompra', {
        pedidos,
        total
    });
});
router.get('/entrantes', (req, res) => {
    res.render('carrito-entrantes')
});
router.get('/bebidas', (req, res) => {
    res.render('carrito-bebidas')
});
router.get('/hamburguesas', (req, res) => {
    res.render('carrito-hamburguesas')
});
router.get('/japanese', (req, res) => {
    res.render('carrito-japanese')
});
router.get('/mexican', (req, res) => {
    res.render('carrito-mexican')
});
router.get('/pizzas', (req, res) => {
    res.render('carrito-pizzas')
});
router.get('/postres', (req, res) => {
    res.render('carrito-postres')
});
router.get('/send', (req, res) => {
    let pedidoTotal = ""
    let precioTotal = 0

    for (let i = 0; i < pedidos.length; i++) {
        precioTotal += Number(pedidos[i].prize)
        pedidoTotal += ` Pedido ${i+1}: ${pedidos[i].name}, cantidad:  ${pedidos[i].cant};
         \n `
    }
    console.log(pedidoTotal)

    res.render('home', {
        pedidoTotal,
        precioTotal
    })
});
router.get('/compra', (req, res) => {
    res.render('compra')
});
router.get('/cargar', (req, res) => {
    res.render('cargacompra')
});



router.post('/data', (req, res) => {
    let {
        name,
        prize,
        cant
    } = req.headers
    if (cant == 0) {
        cant = 1;
    } else {
        prize *= Number(cant)
        prize = prize.toFixed(2)
        cant = Number(cant)
    }
    let nuevoPedido = {
        id: uuidv4(),
        name,
        prize,
        cant
    };
    pedidos.push(nuevoPedido);

    const json_pedidos = JSON.stringify(pedidos);
    fs.writeFileSync('json/pedidos.json', json_pedidos, 'utf-8');

    res.sendStatus(200);
});

router.get('/delete/:id', (req, res) => {
    pedidos = pedidos.filter(pedido => pedido.id != req.params.id);
    console.log(req.params.id)

    // saving data
    const json_pedidos = JSON.stringify(pedidos);
    fs.writeFileSync('json/pedidos.json', json_pedidos, 'utf-8');

    res.redirect('/carrito')
});

module.exports = router;