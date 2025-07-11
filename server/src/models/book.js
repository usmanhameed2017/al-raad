const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// Schema
const bookSchema = new Schema({
    title:{
        type:String,
        trim:true,
        index:true,
        required:true
    },
    description:{
        type:String,
        trim:true
    },
    pdf:{
        type:String,
        trim:true,
        required:true
    },
    coverImage:{
        type:String,
        trim:true
    },
    uploadedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
}, { timestamps:true });

// Inject pagination plugin
bookSchema.plugin(mongoosePaginate);

// Model
const Book = model("Book", bookSchema);

module.exports = Book;