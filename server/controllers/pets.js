const mongoose = require("mongoose");
const Pet = mongoose.model("Pet");

class Pets {
    getAll(req, res){
        Pet.find({}, (err, pets) => {
            if(err) {console.log(err);}
            res.json({status:200, pets: pets});
        })
    }
    getOne(req, res){
        Pet.findOne({_id: req.params._id}, (err, pet) => {
            if(err) {console.log(err);}
            res.json({status:200, pet: pet});
        })
    }
    create(req, res){
        let p = new Pet(req.body);
        p.save( err => {
            if(err){
                res.json({status: 200, errors: err}); 
            }
            else {
                res.json({status:200});
                }
        });
    }
    
    update(req, res){
        Pet.findOneAndUpdate({_id: req.params._id}, req.body, {runValidators: true}, err => {
            if(err) {
                res.json({status: 200, errors: err});
            } else {
                res.json({status: 200});
            }
        });
    }
    addLike(req, res){
        Pet.findOneAndDelete({_id: req.params._id}, err => {
            if(err) { console.log(err); }
            res.json({status: 200});
        });
    }
    delete(req, res){
        Pet.findOneAndDelete({_id: req.params._id}, err => {
            if(err) { console.log(err); }
            res.json({status: 200});
        });
    }
}
module.exports = new Pets();