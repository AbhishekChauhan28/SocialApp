const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const VerificationTokenSchema = new mongoose.Schema({
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default:Date.now()
    },
})

VerificationTokenSchema.pre("save", async function(next){
    const salt = await bycrypt.genSalt(10);
    if(this.isModified("token")){
        const hash = await bycrypt.hash(this.token, salt);
        this.token = hash
    }
    next();
})

module.exports = mongoose.model("verificationToken", VerificationTokenSchema);
