import express from 'express';
import ProductController from './src/controllers/product_controller.js';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import validationMiddleware from './src/middlewares/validation.middleware.js'
import upload from './src/middlewares/file-upload.middleware.js';
import UserController from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js'

const app = express();
const port = 3000;
const productController = new ProductController();
const userController = new UserController();

app.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}))

app.use(express.urlencoded({ extended: true }));

//when we mark any folder as static folder for express server then we don't have to write the full address while linking the files present in static folders like css and js mentioned in layouts.ejs
app.use(express.static(path.join(path.resolve(), 'src', 'assets')));
app.set('views', path.join(path.resolve(), 'src', 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// routes for products
app.get('/', productController.getProducts);
app.get('/new-product', auth, (req, res, next) => {
    // console.log(req.body);
    next();
}, productController.getAddForm);
app.post('/add-product', auth, upload.single('imageUrl'), validationMiddleware.validateNewProductRequest, productController.addNewProduct);
app.get('/update-product/:id', auth, productController.getUpdateProductView);
app.post('/post-update-product', auth, upload.single('imageUrl'), validationMiddleware.validateUpdateProductRequest, productController.updateProduct);
app.post('/delete-product/:id', auth, productController.deleteProduct);

// routes for user 
app.get('/register-form', userController.getRegisterForm);
app.get('/login-form', userController.getLoginForm);
app.post('/register-user', userController.postRegister);
app.post('/login-user', userController.postLogin);
app.get('/logout-user', userController.logout);

app.listen(port, (err) => {
    if (err) {
        console.log('Error while running server over port:', port);
        return;
    }

    console.log('Server running over port: ', port);
    return;
});