/*
 *   index.js
 *   InClass 4
 *
 *   Revision History
 *      Boa Im, 2022.03.24: Created
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

var myApp = express();
myApp.use(bodyParser.urlencoded({ extended: false }));


myApp.set('views', path.join(__dirname, 'views'));
myApp.use(express.static(__dirname + '/public'));
myApp.set('view engine', 'ejs');



myApp.get('/', function(req, res) {
    res.render('form');
});

var phoneRegex = /^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/;

function checkRegex(userInput, regex) {
    if (regex.test(userInput)) {
        return true;
    } else {
        return false;
    }
}

function customPhoneValidation(value) {
    if (!checkRegex(value, phoneRegex)) {
        throw new Error('Phone should be in the format xxx-xxx-xxxx');
    }
    return true;
}

myApp.post('/', [
    check('name', 'Must have a name').not().isEmpty(),
    check('email', 'Must have email').isEmail(),
    check('phone').custom(customPhoneValidation),
    check('address', 'Must have an adress').not().isEmpty()
], function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('form', {
            errors: errors.array()
        });
    } else {
        var name = req.body.name;
        var email = req.body.email;
        var phone = req.body.phone;
        var address = req.body.address;
        var province = req.body.province;
        var pageData = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            province: province,
        };
        res.render('form', pageData);
    }
});

myApp.listen(8080);