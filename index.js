const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const router = express.Router();

app.use(express.json());

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

router.get('/profile', (req, res) => {
    const userData = fs.readFileSync(path.join(__dirname, 'user.json'));
    res.json(JSON.parse(userData));
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const userData = JSON.parse(fs.readFileSync(path.join(__dirname, 'user.json')));
    const user = userData;  // Adjusting to match your single user structure

    if (user.username !== username) {
        res.json({ status: false, message: 'User Name is invalid' });
    } else if (user.password !== password) {
        res.json({ status: false, message: 'Password is invalid' });
    } else {
        res.json({ status: true, message: 'User Is valid' });
    }
});

router.get('/logout', (req, res) => {
    const { username } = req.query;
    res.send(`<b>${username} successfully logged out.</b>`);
});

app.use((err, req, res, next) => {
    res.status(500).send('Server Error');
});

app.use('/', router);

app.listen(process.env.PORT || 8081, () => {
    console.log('Web Server is listening at port ' + (process.env.PORT || 8081));
});
