const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
    res.send("hello world")
});

router.post("/", (req, res) => {
    console.log(req.body)
    res.send("hello world")
});

router.patch("/:id", (req, res) => {
    console.log(req.params)
    res.send("hello world")
});

router.delete("/:id", (req, res) => {
    console.log(req.params)
    res.send("hello world")
});

module.exports = router;
