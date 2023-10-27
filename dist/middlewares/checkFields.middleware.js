"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFieldsUser = exports.checkFieldsMovie = void 0;
const checkFieldsMovie = (req, res, next) => {
    const { title } = req.body;
    if (title.length < 4) {
        res.status(400).send({ msg: 'Name must be at least 4 characters long' });
        return;
    }
    next();
};
exports.checkFieldsMovie = checkFieldsMovie;
const checkFieldsUser = (req, res, next) => {
    const { name } = req.body;
    if (name.length < 4) {
        res.status(400).send({ msg: 'Name must be at least 4 characters long' });
        return;
    }
    next();
};
exports.checkFieldsUser = checkFieldsUser;
