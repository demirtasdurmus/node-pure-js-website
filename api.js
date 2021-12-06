const api = require("express").Router();
const usersRouter = require('./routes/users');
const filmsRouter = require('./routes/films');


api.use('/users', usersRouter);
api.use('/films', filmsRouter);


module.exports = api;