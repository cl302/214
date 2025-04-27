const express = require('express');
const router = express.Router();

const itemCosts = {
    "Headphones (500 pts)": 500,
    "Flight Upgrade (1000 pts)": 1000,
    "Gift Card (300 pts)": 300
};

router.post('/add-to-cart', (req, res) => {
    const { item } = req.body;
    if (req.session.user) {
        const cost = itemCosts[item] || 0;
        if (req.session.user.points >= cost) {
            req.session.user.points -= cost;
            req.session.user.cart.push(item);
            res.redirect('/dashboard');
        } else {
            res.send('Not enough points to redeem this item.');
        }
    } else {
        res.redirect('/login.html');
    }
});

router.get('/cart-items', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user.cart);
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.get('/view', (req, res) => {
    if (req.session.user) {
        res.sendFile('cart.html', { root: './public' });
    } else {
        res.redirect('/login.html');
    }
});

module.exports = router;
