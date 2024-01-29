import { body, validationResult } from 'express-validator';
import ProductModel from '../models/product.model.js';

var validationErrors;
const validateRequest = async (req, res) => {
    // validate data using self defined methods.
    // let { name, price, imageUrl } = req.body;
    // let error = [];
    // if (!name || name.trim() == '') {
    //     error.push('Name is required!');
    // }
    // if (!price || parseFloat(price) < 1) {
    //     error.push('Price should be positive number');
    // }

    // try {
    //     let url = new URL(imageUrl)
    // } catch (err) {
    //     error.push('URL is invalid!');
    // }

    // if (error.length > 0) {
    //     return res.render('new-product', { errorMessage: error[0] });
    // }

    // next();

    // validate input data using express valdidatore package
    // 1. setup the rules for validations
    const rules = [
        body('name').notEmpty().withMessage('Name is required!'),
        body('price').isFloat({ gt: 0 }).withMessage('Price should be a postive value!'),
        // later we updated the imageUrl from url to file upload for which below validation will fail as imageUrl fieldname contains file 
        // body('imageUrl').isURL().withMessage('Invalid URL!')
        body('imageUrl').custom((value, { req }) => {
            if (!req.file) {
                throw new Error('Image is required!')
            }
            return true;
        }),
    ];

    // 2. Run those rules
    await Promise.all(rules.map(rule => rule.run(req)));

    // 3.check if there are any errors after running the rules
    validationErrors = validationResult(req);
}

const validateNewProductRequest = async (req, res, next) => {
    await validateRequest(req, res);

    // 4.if errors then return the errors msg 
    if (!validationErrors.isEmpty()) {
        return res.render('new-product', { errorMessage: validationErrors.array()[0].msg });
    }

    next();
}

const validateUpdateProductRequest = async (req, res, next) => {
    await validateRequest(req, res);
    // 4.if errors then return the errors msg 
    if (!validationErrors.isEmpty()) {

        const productFound = ProductModel.getById(req.body.id);

        if (productFound) {

            return res.render('update-product', { product: productFound, errorMessage: validationErrors.array()[0].msg });
        } else {
            return res.status(401).send('Product not found');
        }
    }

    next();
}

const validateRequestsMiddleware = {
    validateNewProductRequest,
    validateUpdateProductRequest
}

export default validateRequestsMiddleware;