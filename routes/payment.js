const express = require('express');
const router = express.Router();

router.get('/view', (req, res) => {
    if (req.session.user) {
        res.sendFile('payment.html', { root: './public' });
    } else {
        res.redirect('/login.html');
    }
});

router.post('/pay', (req, res) => {
    if (req.session.user && req.session.user.cart.length > 0) {
        req.session.user.cart = [];
        res.redirect('/payment-success');
    } else {
        res.send('No items in cart.');
    }
});

router.get('/payment-success', (req, res) => {
    if (req.session.user) {
        res.sendFile('payment-success.html', { root: './public' });
    } else {
        res.redirect('/login.html');
    }
});

module.exports = router;
