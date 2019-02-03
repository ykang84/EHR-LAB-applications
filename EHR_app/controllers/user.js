const User = require('../models/user');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.createUser = function (req, res) {
    let user = new User(
        {
            username: req.body.username,
            password: req.body.password
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.render('registerSuccess')
    })
};

exports.getUser = function (req, res) {
    User.findOne({"username": req.params.username}, function (err, user) {
        if (err){
            res.send(err);
            console.log ("error")
        }
        res.send(user);
        console.log ("you hit getuser success route")
        console.log(user)
    })
};

exports.updateUser = function (req, res) {
    User.updateOne(req.params, {$set: req.body}, function (err, user) {
        if (err) {
            return "Error: updateUser" + JSON.stringify(err);
        }
        res.send('User udpated.');
    });
};


exports.deleteUser = function (req, res) {
    User.deleteOne(req.params, function (err, user) {
        if (err) {
            return "Error: deleteUser" + JSON.stringify(err);
        }
        res.send('User deleted.');
    });
};
