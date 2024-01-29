

export default class UserController {

    getRegisterForm(req, res) {
        return res.render('register', { errorMessage: null });
    }
}