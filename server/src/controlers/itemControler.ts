import { Request, Response } from "express";
import { Item } from "../models/itemModel";



class ItemControler {
    async createItem(req: Request, res: Response) {
        const {name, tags, collectionId, extraItemFields} = req.body

        try {
      
            const newItem = await Item.create({
                name: name,
                tags: tags, 
                collectionId: collectionId,
            })
         
            for(var key in extraItemFields) {
                newItem.extraItemFields.push({
                        extraItemName: key,
                        extraItemData: extraItemFields[key]
                })
            }

             newItem.save()

            res.status(201).send({
                item: newItem
            })

        } catch (error) {
            console.log(error)
        }
    }


    async getItemsOfCollection (req: Request, res: Response) {
        const {id} = req.params

        try {

            const items = await Item.find({collectionId: id})
            res.status(200).send({
                items
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export default new ItemControler()