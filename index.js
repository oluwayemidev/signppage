const path = require('path')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const express = require('express')
const app = express()
const port = 3000


const urlencodedParser = bodyParser.urlencoded({ extended: false })


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('', (req, res, next) => {
    res.render('index')
})

app.get('/', (req, res, next) => {
    res.render('index')
})

app.post('/', urlencodedParser, [
    check('fname', 'Your name can not be empty')
    .notEmpty(),
    check('email', 'Email can not be empty')
    .isEmail()
    .normalizeEmail(),
    check('passkey', 'Your password can not be empty')
    .notEmpty(),
    check('passkey', 'Your password can not be less than 8 characters, and at least 1 numbers')
    .isLength({ min: 8 })
], (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        const userData = {
            "fname": req.body.fname,
            "email": req.body.email
        }

        res.render('index', {
            alert,
            userData
        })
    }

})


app.listen(port)