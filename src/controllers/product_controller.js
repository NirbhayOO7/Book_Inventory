import ProductModel from "../models/product.model.js";


export default class ProductController {

    getProducts(req, res) {
        // console.log(path.resolve());
        // return res.sendFile(path.join(path.resolve(), 'src', 'views', 'products.html'));
        const products = ProductModel.get();
        return res.render('products', { products });
    }

    getAddForm(req, res) {
        return res.render('new-product', { errorMessage: null });
    }

    addNewProduct(req, res) {
        // console.log(req.body);

        ProductModel.addProducts(req.body);
        const products = ProductModel.get();
        return res.redirect('/');
    }

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

    updateProduct(req, res) {
        // console.log(req.body);

        ProductModel.updateProduct(req.body);
        const products = ProductModel.get();
        return res.redirect('/');
    }
}
