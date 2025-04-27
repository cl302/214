const express = require('express');
const router = express.Router();

router.post('/earn', (req, res) => {
    if (req.session.user) {
        req.session.user.points += 100;
        res.redirect('/dashboard.html');
    } else {
        res.redirect('/login.html');
    }
});

router.get('/points', (req, res) => {
    if (req.session.user) {
        res.json({ points: req.session.user.points });
    } else {
        res.status(401).send('Unauthorized');
    }
});

module.exports = router;
