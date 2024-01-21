import express from 'express';
import ProductController from './src/controllers/product_controller.js';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';

const app = express();
const port = 3000;
const productController = new ProductController();

app.use(express.static('src/views'));
app.set('views', path.join(path.resolve(), 'src', 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.get('/', productController.getProducts);

app.listen(port, (err) => {
    if (err) {
        console.log('Error while running server over port:', port);
        return;
    }

    console.log('Server running over port: ', port);
    return;
});