/**
 * Created by ryandick on 7/28/16.
 */

var express = require('express');
var router = express.Router();
var auth = require('basic-auth');



router.post('/mirthResultsAuth', function(req, res, next) {
    return res.status(200).send();
});

router.post('/J2Auth', function(req, res, next) {  //this doesnt work because it overloads the ports
    var user = auth(req);
    var db = req.app.get('db');
    db.collection('users', function (err, collection) {
        if (!err) {
            collection.find({
                'username': user.name.toUpperCase(),
                'password': user.pass
            }).toArray(function (err, docs) {
                return res.status(200).send();
            })
        }
        else{
            return res.status(500).send(err)
        }
    })
});

router.post('/spoofAuth', function(req, res, next) {  //this doesnt work because it overloads the ports
    var user = auth(req);
    if (!user && !user.name && !user.pass) {
        return res.status(401).send();
    }
    return res.status(200).send();
});

router.post('/spoofPvenkman', function(req, res, next) {  //this doesnt work because it overloads the ports
    var user = auth(req);
    if(user && (
            user.name.toUpperCase()=='PVENKMAN'
            || user.name.toUpperCase()=='GDRAGOTTA'
            || user.name.toUpperCase()=='CNELSEN'
            || user.name.toUpperCase()=='BNELSEN'
            || user.name.toUpperCase()=='RDICK'
        ) && user.pass=='Password1'){
        return res.status(200).send();
    }
    else{
        logger.error('routes.authenticate unauthorized')
        return res.status(401).send();
    }
});


module.exports = router;
