const {Schema, model} = require("mongoose")
const postSchema = new Scehma({
    title: {type:String, required: true},
    category: {type:String, enum:["Agricultre", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"],
     message: "{VALUE is not supported"},
    description: {type:String, required: true},
    creator: {type:Schema.Types.ObjectId, ref: "User"},
    title: {type:String, required: true},
},{timestamps:true})


module.exports = model("Post",postSchema)