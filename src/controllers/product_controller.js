import ProductModel from "../models/product.model.js";
import path from 'path';


export default class ProductController {

    // render product on home page 
    getProducts(req, res) {
        // console.log(path.resolve());
        // return res.sendFile(path.join(path.resolve(), 'src', 'views', 'products.html'));
        const products = ProductModel.get();
        return res.render('products', { products });
    }

    // get form for adding new product 
    getAddForm(req, res) {
        return res.render('new-product', { errorMessage: null });
    }

    // add new product action 
    addNewProduct(req, res) {

        // below lines of code used when imageUrl is url
        // ProductModel.addProducts(req.body);
        // const products = ProductModel.get();
        // return res.redirect('/');

        // new updated code when imageUrl is an uploaded image file 
        let { name, desc, price } = req.body;
        let imageFileUrl = path.join('images', req.file.filename);
        ProductModel.addProducts(name, desc, price, imageFileUrl);
        return res.redirect('/');

    }

    // get view of update form 
    getUpdateProductView(req, res) {
        const id = req.params.id;
        const productFound = ProductModel.getById(id);

        if (productFound) {

            return res.render('update-product', { product: productFound, errorMessage: null });
        }
        else {
            return res.status(401).send('Product not found');
        }
    }

    // update product on click 
    updateProduct(req, res) {
        // console.log(req.body);

        ProductModel.updateProduct(req.body);
        const products = ProductModel.get();
        return res.render('products', { products });
    }

    // delete product on click 
    deleteProduct(req, res) {
        const id = req.params.id;
        const productFound = ProductModel.getById(id);

        if (productFound) {
            ProductModel.deleteProduct(id);
            return res.redirect('back');
        }
        else {
            return res.status(401).send('Product not found');
        }
    }
}
