
export default class UserModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static addUser(name, email, password) {
        users.push(new UserModel(users.length + 1, name, email, password));
    }

    static isValidUser(email, password) {
        let user = users.find((u) =>
            u.email == email && u.password == password
        );
        return user;
    }
}

let users = [];