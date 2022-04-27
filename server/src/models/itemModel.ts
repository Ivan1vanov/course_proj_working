import mongoose from "mongoose";


const itemSchema = new mongoose.Schema({
    name: {type: String},
    tags: {type: String}, 
    collectionId: {type: String},
    extraItemFields: [
        {
            extraItemName: {type: String},
            extraItemData: {type: String}
        }
    ],
    likes: [
        {type: String}
    ],
    comments: [
        {
            commentCreator: {type: String},
            comment: {type: String},
            createdAt: {type: Date}
        }
    ]
}, {
    timestamps: true
})


export const Item = mongoose.model('Item', itemSchema)

