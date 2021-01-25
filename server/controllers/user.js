const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');
        const result = await db.user.find_user_by_username([username]);
        const existingUser = result[0];
        if (existingUser) {
            return res.status(409).send('Username taken.')
        };
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [user] = await db.user.create_user([username, hash, `https://robohash.org/${username}.png`]);
        req.session.user = {
            username: user.username,
            id: user.id,
            profile_pic: user.profile_pic
        };
        res.status(201).send(req.session.user);
    },
    login: async (req, res) => {
        const {username, password} = req.body;
        const [user] = await req.app.get('db').user.find_user_by_username([username]);
        if (!user) {
            return res.status(401).send('User not found.')
        };
        const isAuthenticated = bcrypt.compareSync(password, user.password);
        if (!isAuthenticated) {
            return res.status(403).send('Incorrect password.')
        };
        req.session.user = {
            username: user.username,
            id: user.id,
            profile_pic: user.profile_pic
        };
        res.status(200).send(req.session.user);
    },
    getUser: async (req, res) => {
        console.log('test')
        if (!req.session.user) {
            return res;
            // return res.sendStatus(404);
            // would throw an error immediately when the page loaded???
        };
        res.status(200).send(req.session.user);
    },
    logout: async (req, res) => {
        req.session.destroy();
        return res.sendStatus(200);
    }
}