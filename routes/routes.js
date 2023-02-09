const { json } = require('express');
const express = require('express');
const fs = require('fs')


const router = express.Router()

//Post Method
router.post('/add-user', async (req, res) => {
    console.log(req.body);
    var reqData = req.body;
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    reqData.id = uniqid;
    const userJsonString = JSON.stringify([reqData])
    fs.readFile('./userlist.json', 'utf8', (err, jsonString) => {
        if (err) {
            if(err.code == 'ENOENT') {
                fs.writeFile('./userlist.json', JSON.stringify(userJsonString), (err) => {
                    if (err) console.log('Error writing file:', err)
                })
                res.send({status: true});
            }
            return;
        } else {
            console.log('readed data********************', jsonString);
            var parseUserJSON = JSON.parse(jsonString);
            var parsedUserJSON = JSON.parse(parseUserJSON);
            console.log('parseUserJSON********************', parseUserJSON);
            console.log('parsedUserJSON********************', parsedUserJSON[0]);
            console.log('parsedUserJSONName********************', parsedUserJSON[0].name);
            parsedUserJSON.push(reqData);
            fs.writeFile('./userlist.json', JSON.stringify(JSON.stringify(parsedUserJSON)), (err) => {
                    if (err) console.log('Error writing file:', err)
                })
                res.send({status: true}); 
            }
        })
})
router.get('/user-list', async (req, res) => {
        fs.readFile('./userlist.json', 'utf8', (err, reqData) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        // console.log('File data:', JSON.parse(JSON.parse(reqData))) 
        res.send({response: JSON.parse(JSON.parse(reqData))})
    })
    
})

router.get('/user-details/:id', async (req, res) => {
    var reqData = req.params;
    fs.readFile('./userlist.json', 'utf8', (err, response) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    // console.log('File data:', JSON.parse(JSON.parse(reqData))) 
    var userList = JSON.parse(JSON.parse(response));
    const filteredUser = userList.filter((item) => item.id == reqData.id);
    res.send({response: filteredUser})
})

})

router.post('/update-user', async (req, res) => {
    var reqData = req.body;
    fs.readFile('./userlist.json', 'utf8', (err, jsonString) => {
        if (err) {
            if(err.code == 'ENOENT') {
                res.send({status: false});
            }
            return;
        } else {
            console.log('readed data********************', jsonString);
            var parseUserJSON = JSON.parse(jsonString);
            var parsedUserJSON = JSON.parse(parseUserJSON);
            console.log('parseUserJSON********************', parseUserJSON);
            console.log('parsedUserJSON********************', parsedUserJSON[0]);
            console.log('parsedUserJSONName********************', parsedUserJSON[0].name);
            var filteredUser = parsedUserJSON.filter((item) => item.id !== reqData.id);
            filteredUser.push(reqData);
            fs.writeFile('./userlist.json', JSON.stringify(JSON.stringify(filteredUser)), (err) => {
                    if (err) console.log('Error writing file:', err)
                })
                res.send({status: true}); 
            }
        })
    
})
router.post('/delete-user', async (req, res) => {
    var reqData = req.body;
    fs.readFile('./userlist.json', 'utf8', (err, jsonString) => {
        if (err) {
            if(err.code == 'ENOENT') {
                res.send({status: false});
            }
            return;
        } else {
            console.log('readed data********************', jsonString);
            var parseUserJSON = JSON.parse(jsonString);
            var parsedUserJSON = JSON.parse(parseUserJSON);
            console.log('parseUserJSON********************', parseUserJSON);
            console.log('parsedUserJSON********************', parsedUserJSON[0]);
            console.log('parsedUserJSONName********************', parsedUserJSON[0].name);
            const filteredUser = parsedUserJSON.filter((item) => item.id !== reqData.id);
            fs.writeFile('./userlist.json', JSON.stringify(JSON.stringify(filteredUser)), (err) => {
                    if (err) console.log('Error writing file:', err)
                })
                res.send({status: true}); 
            }
        })
    
})

module.exports = router;