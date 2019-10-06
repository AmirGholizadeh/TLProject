const User = require('./../models/userModel');
exports.getHomepage = async(req, res, next) => {


    res.status(200).render('homepage', {
        title: 'Homepage | TL',
    });


};
exports.getLoginForm = (req, res, next) => {
    res.status(200).render('login', {
        title: 'Login | TL'
    });
};
exports.getUsers = async(req, res, next) => {
    const users = await User.aggregate([{
        $match: {
            "role": "user"
        }
    }]);
    const admins = await User.aggregate([{
        $match: {
            "role": "admin"
        }
    }]);
    console.log(admins);
    if (req.user.role === 'admin') {
        res.status(200).render('users', {
            title: 'Users | TL',
            users
        });
    } else if (req.user.role === 'manager') {
        if (admins.length === 0) {
            res.status(200).render('users', {
                title: 'Users | TL',
                users
            });
        } else {
            res.status(200).render('users', {
                title: 'Users | TL',
                users,
                admins
            });
        }

    }
};
exports.getSignupForm = (req, res, next) => {
    res.status(200).render('signup', {
        title: 'Signup | TL'
    });
};
exports.getMessages = async(req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, { messagesRead: true });
    res.status(200).render('messages', {
        title: 'Messages | TL'
    });
};
exports.getMe = async(req, res, next) => {
    res.status(200).render('me', {
        title: 'My account | TL'
    })
};