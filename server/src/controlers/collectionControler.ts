import { Request, Response } from "express";
import { Collection } from "../models/collectionModel";



class CollectionController {
    async createCollection(req: Request, res: Response) {
        const {name, description, format, creator, image, extraFileds} = req.body
        try {

        const newCollection = await Collection.create({
            name: name,
            description: description,
            format: format,
            creator: creator,
            image: image,
            
        })
        extraFileds.map((field: any) => {
            newCollection.specifiedFields.push(field)
        })
        await newCollection.save()
        res.status(201).send({
            newCollection
        })

        } catch (error) {
            console.log(error)
        }
    }

    async getCollections(req: Request, res: Response) {
        try {
            const collections = await Collection.find()
            res.status(202).send({
                collections
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default new CollectionController()