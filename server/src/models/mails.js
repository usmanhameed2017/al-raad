const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// Schema
const mailSchema = new Schema({
    name:{
        type:String,
        trim:true,
        index:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:true    
    },
    subject:{
        type:String,
        trim:true,
        required:true
    },
    message:{
        type:String,
        trim:true,
        required:true
    },
    mailedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
}, { timestamps:true });

// Inject pagination plugin
mailSchema.plugin(mongoosePaginate);

// Model
const Mail = model("Mail", mailSchema);

module.exports = Mail;