const express = require('express');
const router = express.Router();

const users = [];

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password, points: 0, cart: [] });
    res.redirect('/login.html');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.user = user;
        res.redirect('/dashboard');
    } else {
        res.send('Invalid credentials');
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login.html');
});

router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.sendFile('dashboard.html', { root: './public' });
    } else {
        res.redirect('/login.html');
    }
});

module.exports = router;
