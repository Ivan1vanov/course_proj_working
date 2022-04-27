import mongoose from "mongoose";


const collectionSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String}, 
    format: {type: String},
    creator: {type: String},
    image: {type: String},
    specifiedFields: [
        {
            fieldName: {type: String},
        }
    ]
}, {
    timestamps: true
})

export const Collection = mongoose.model('Collection', collectionSchema)

