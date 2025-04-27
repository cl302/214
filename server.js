const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'flydreamair_secret',
    resave: false,
    saveUninitialized: true
}));

// Static Files
app.use(express.static('public'));

// ===== Real Pages Routes =====

// Redirect "/" to login page
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Dashboard Page
app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
    } else {
        res.redirect('/login.html');
    }
});

// Cart Page
app.get('/cart', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'cart.html'));
    } else {
        res.redirect('/login.html');
    }
});

// Payment Page
app.get('/payment', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'payment.html'));
    } else {
        res.redirect('/login.html');
    }
});

// Payment Success Page
app.get('/payment-success', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'payment-success.html'));
    } else {
        res.redirect('/login.html');
    }
});

// ===== Other Functional Routes =====
const authRoutes = require('./routes/auth');
const loyaltyRoutes = require('./routes/loyalty');
const cartRoutes = require('./routes/cart');
const paymentRoutes = require('./routes/payment');

app.use('/auth', authRoutes);
app.use('/loyalty', loyaltyRoutes);
app.use('/cart', cartRoutes);
app.use('/payment', paymentRoutes);

// ===== Server Start =====
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
