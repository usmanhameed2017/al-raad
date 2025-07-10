const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const bcrypt = require("bcrypt");

// Schema
const userSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true,
        required:true,       
    },
    username:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true,
        index:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },  
    role:{
        type:String,
        enum:["Admin", "User"],
        default:"User",
        trim:true,
        required:true
    },
    activationCode:{
        type:String
    },
    status:{
        type:String,
        enum:["Pending", "Approved", "Banned"],
        default:"Pending"
    }
}, { timestamps:true });

// Inject pagination plugin
userSchema.plugin(mongoosePaginate);

// Hash password before save
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    try 
    {
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    } 
    catch (error) 
    {
        console.log(error.message);
        return next();
    }
});

// Match password
userSchema.methods.matchPassword = async function(password) {
    if(!password) return false;
    try 
    {
       return await bcrypt.compare(password, this.password); 
    } 
    catch (error) 
    {
        console.log(error.message);
        return false;
    }
}

// Get user by email or username
userSchema.static("getUser", async function(email, username) {
    try 
    {
        const user = await this.findOne({ $or:[{ email }, { username }] });
        if(!user) return null;
        return user;
    } 
    catch (error) 
    {
        console.log(error.message);
        return null;
    }
});

// Model
const User = model("User", userSchema);

module.exports = User;