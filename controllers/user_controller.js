const csv = require('csvtojson');
const xlsx = require('xlsx');
const async = require('async');
const db = require('../config/mongoose');

var EMAILS = new Set();

const processCandidate = (candidate, callback)=>{
        const email = candidate.Email;
        if(EMAILS.has(email)){
            console.log(`Skipping candidate ${candidate['Name of the Candidate']} due to duplicate email`);
              return callback();
        }
        EMAILS.add(email);
        
        // db.collection('candidates').findOne({Email: email }, (err, result) => {
        //     if (err) return callback(err);
        //     if (result) {
        //       console.log(`Skipping candidate ${candidate['Name of the Candidate']} due to duplicate email`);
        //       return callback();
        //     }
        // })
        
        db.collection('candidates').insertOne(candidate, (err) => {
            if (err) return callback(err);
             console.log(`Inserted candidate ${candidate['Name of the Candidate']} to the database`);
             return callback();
           })
  };


module.exports.importFile = (req,res) =>{
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    async.eachSeries(data, processCandidate, (err) => {
        if (err){ 
            console.log(err);
            return res.render('status',{
            title: 'failed',
            message: 'Failed to process candidates'
        })
    }
        return res.render('status',{
            title: 'successful',
            message: 'Successfully added to MongoDB'
        })
    });
}
