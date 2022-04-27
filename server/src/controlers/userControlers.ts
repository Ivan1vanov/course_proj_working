import {Request, Response} from 'express'
import { UserInputData, User, UserInterface } from '../models/userModel';
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import config from 'config'

const jwtTokenGenerator = (id: mongoose.ObjectId):string => {
    return jwt.sign({id}, config.get<string>('jwtConfig'), {expiresIn: '24h'})
}

class UserControlers {

    async registration(req: Request, res: Response) {
            const data: UserInputData = req.body

            try {
                if(!data.email || !data.name || !data.password) {
                    res.status(404).send({
                        message: 'No, all fields are ruqiered...'
                    })
                }

                const user: UserInterface | null = await User.findOne({email: data.email})

                if(user) {
                    res.status(404).send({
                        message: 'User already exists'
                    })
                } else {
                        const hashPassword = bcrypt.hashSync(data.password, 6)

                        const newUser = await User.create({
                            name: data.name,
                            email: data.email,
                            password: hashPassword
                        })
                        await newUser.save()

                        const token = jwtTokenGenerator(newUser._id)

                        res.status(201).send({
                            user: newUser,
                            token
                        })
                }

            } catch (error) {
                console.log(error)
            }
    }   

    async login(req: Request, res: Response) {
        const data: UserInputData = req.body

        try {
            const user: UserInterface | null = await User.findOne({email: data.email})

            if(!user) {
                res.status(404).send({
                    message: 'User does not exist'
                })
            } else if (user.isBlocked === true) {
                    res.status(404).send({
                        message: 'User has been blocked...'
                    })
            } else {
                    const isPassword = bcrypt.compareSync(data.password, user.password)

                    if(!isPassword) {
                        res.status(404).send({
                            message: 'Invalid credentials'
                        })
                    } else {
                        user.set({  
                            lastLogin: new Date()
                        })
                        await user.save()

                        const token = jwtTokenGenerator(user._id)
                        res.status(200).send({
                            user,
                            token
                        })
                    } 
            }
        } catch (error) {
            console.log(error)
        }
    }   

    async getAllUsers(req: Request, res: Response) {
        try {
            const users: UserInterface[] = await User.find()
            res.status(200).send({
                users
            })
        } catch (error) {
            console.log(error)
        }
    }


    async blockUser(req: Request, res: Response) {
        const {id} = req.params
        try {
            const user: UserInterface | null = await User.findById(id)
            if(user) {
                user.set({
                    isBlocked: true
                })
                res.status(200).send({
                    user: user
                })
            } else {
                res.status(404).send({
                    message: 'User does not exist'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async activeUser(req: Request, res: Response) {
        const {id} = req.params
        try {
            const user: UserInterface | null = await User.findById(id)
            if(user) {
                user.set({
                    isBlocked: false
                })
                res.status(200).send({
                    user: user
                })
            } else {
                res.status(404).send({
                    message: 'User does not exist'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    async makeAdminUser(req: Request, res: Response) {
        const {id} = req.params
        try {
            const user: UserInterface | null = await User.findById(id)
            if(user) {
                user.set({
                    isAdmin: true
                })
                res.status(200).send({
                    user: user
                })
            } else {
                res.status(404).send({
                    message: 'User does not exist'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async disadminUser(req: Request, res: Response) {
        const {id} = req.params
        try {
            const user: UserInterface | null = await User.findById(id)
            if(user) {
                user.set({
                    isAdmin: false
                })
                res.status(200).send({
                    user: user
                })
            } else {
                res.status(404).send({
                    message: 'User does not exist'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

}

export default new UserControlers()