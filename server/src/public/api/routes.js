const express = require('express');
const router = express.Router();
const db = require('../../cosmos');

router.get('/tasks', (req, res) => {
    db.getTasks(req, res);
});

router.post('/task', (req, res) => {
    db.postTask(req, res);
});

router.put('/task/:uid', (req, res) => {
    db.putTask(req, res);
});

router.delete('/task/:uid', (req, res) => {
    db.deleteTask(req, res);
});

module.exports=router;