const validateRequest = (req, res, next) => {
    // validate data 
    let { name, price, imageUrl } = req.body;
    let error = [];
    if (!name || name.trim() == '') {
        error.push('Name is required!');
    }
    if (!price || parseFloat(price) < 1) {
        error.push('Price should be positive number');
    }

    try {
        let url = new URL(imageUrl)
    } catch (err) {
        error.push('URL is invalid!');
    }

    if (error.length > 0) {
        return res.render('new-product', { errorMessage: error[0] });
    }

    next();
}

export default validateRequest;