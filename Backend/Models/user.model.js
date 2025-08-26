import {Schema, model} from "mongoose"

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    }
})

const user = model("user", userSchema)