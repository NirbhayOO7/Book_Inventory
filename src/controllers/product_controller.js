import path from "path";
import ProductModel from "../models/product.model.js";


export default class ProductController {

    getProducts(req, res) {
        // console.log(path.resolve());
        // return res.sendFile(path.join(path.resolve(), 'src', 'views', 'products.html'));
        const products = ProductModel.get();
        return res.render('products', { products });
    }
}
