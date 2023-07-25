const express=require('express');
const Router=express.Router();
const bmidata=require('../Services/bmiservice');

Router.post('/adddata', bmidata.adddata);
Router.get('/showdata', bmidata.showdata);

module.exports = Router