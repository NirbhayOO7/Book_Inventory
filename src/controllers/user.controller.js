import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";

export default class UserController {

    getRegisterForm(req, res) {
        return res.render('register', { errorMessage: null });
    }

    getLoginForm(req, res) {
        return res.render('login', { errorMessage: null });
    }

    postRegister(req, res) {
        let { name, email, password } = req.body;
        UserModel.addUser(name, email, password);

        return res.render('login', { errorMessage: null });
    }

    postLogin(req, res) {
        let { email, password } = req.body;

        const user = UserModel.isValidUser(email, password);
        if (!user) {
            return res.render('login', {
                errorMessage: 'Invalid Crendentials',
            });
        }
        else {

            req.session.userEmail = email;
            const products = ProductModel.get();
            return res.render('products', { products, userEmail: req.session.userEmail });
        }
    }

    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }
            else {
                return res.redirect('/login-form');
            }
        })
    }
}