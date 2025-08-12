const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// Schema
const audioSchema = new Schema({
    surahName:{
        type:String,
        trim:true,
        index:true,
        required:true
    },
    ayah:{
        type:String,
        trim:true,
        index:true,
        required:true
    },
    url:{
        type:String,
        trim:true,
        required:true
    },
    uploadedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
}, { timestamps:true });

// Inject pagination plugin
audioSchema.plugin(mongoosePaginate);

// Model
const Audio = model("Audio", audioSchema);

module.exports = Audio;