import { Express } from "express"
import collectionControler from "../controlers/collectionControler"
import itemControler from "../controlers/itemControler"
import userControlers from "../controlers/userControlers"


export const routes = (app : Express) => {
    //user
    app.get('/api/users', userControlers.getAllUsers)

    app.post('/api/users/registration', userControlers.registration)
    app.post('/api/users/login', userControlers.login)

    app.put('/api/users/block/:id', userControlers.blockUser)
    app.put('/api/users/active/:id', userControlers.activeUser)

    app.put('/api/users/admin/:id', userControlers.makeAdminUser)
    app.put('/api/users/disadmin/:id', userControlers.disadminUser)
    
    //collection
    app.post('/api/collection', collectionControler.createCollection)
    app.get('/api/collection', collectionControler.getCollections)

    //item
    app.post('/api/item', itemControler.createItem)
    app.get('/api/item/:id', itemControler.getItemsOfCollection)

}
