import ProductModel from "../models/product.model.js";


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
        // console.log(req.body);

        ProductModel.addProducts(req.body);
        const products = ProductModel.get();
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
            console.log('delete product controller called')
            ProductModel.deleteProduct(id);
            const products = ProductModel.get();
            return res.redirect('back');
        }
        else {
            return res.status(401).send('Product not found');
        }
    }
}
