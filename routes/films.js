const express = require('express');
const router = express.Router();
const axios = require('axios');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


router.post("/", catchAsync(async (req, res, next) => {

    const { searchQuery } = req.body;
    if (!searchQuery) {
        return next(new AppError('Please specify a search keyword', 400));
    }
    const config = { params: { q: searchQuery } };
    const films = await axios.get(`http://api.tvmaze.com/search/shows`, config)
    res.status(200).send(films.data)

}));

module.exports = router;