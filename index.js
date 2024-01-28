import express from 'express';
import ProductController from './src/controllers/product_controller.js';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import validationMiddleware from './src/middlewares/validation.middleware.js'
import upload from './src/middlewares/file-upload.middleware.js';


const app = express();
const port = 3000;
const productController = new ProductController();

app.use(express.urlencoded({ extended: true }));

//when we mark any folder as static folder for express server then we don't have to write the full address while linking the files present in static folders like css and js mentioned in layouts.ejs
app.use(express.static(path.join(path.resolve(), 'src', 'assets')));
app.set('views', path.join(path.resolve(), 'src', 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.get('/', productController.getProducts);
app.get('/new-product', (req, res, next) => {
    // console.log(req.body);
    next();
}, productController.getAddForm);
app.post('/add-product', upload.single('imageUrl'), validationMiddleware.validateNewProductRequest, productController.addNewProduct);
app.get('/update-product/:id', productController.getUpdateProductView);
app.post('/post-update-product', validationMiddleware.validateUpdateProductRequest, productController.updateProduct);
app.post('/delete-product/:id', productController.deleteProduct);

app.listen(port, (err) => {
    if (err) {
        console.log('Error while running server over port:', port);
        return;
    }

    console.log('Server running over port: ', port);
    return;
});