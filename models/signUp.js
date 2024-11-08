const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:"String",
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.virtual("id").get(function(){
    return this._id.toHexaString();
});

userSchema.set("toJSON",{
    virtual : true,
})

module.exports = mongoose.model('User',userSchema);