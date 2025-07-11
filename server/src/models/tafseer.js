const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// Schema
const tafseerSchema = new Schema({
    ayah:{
        type:String,
        trim:true,
        index:true,
        required:true
    },
    surahName:{
        type:String,
        trim:true,
        index:true,
        required:true
    },
    tafseer:{
        type:String,
        trim:true,
        required:true
    },
    language:{
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
tafseerSchema.plugin(mongoosePaginate);

// Model
const Tafseer = model("Tafseer", tafseerSchema);

module.exports = Tafseer;