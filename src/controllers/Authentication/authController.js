const authService = require('../../services/Authentication/authService');

async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await authService.authenticateUser(username, password);
        if (user) {
            req.session.user = user.username; // Set user session
            res.redirect('/dashboard');
        } else {
            res.redirect('/loginFail');
        }
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).send('Authentication error');
    }
}

function logout(req, res) {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            res.redirect('/login');
        }
    });
}

module.exports = {
    login,
    logout
};

