import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import * as Yup from 'yup';

import userView from '../views/users_view';

export default{
    
    async show(request: Request, response: Response){
        const { email, password } = request.body;

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOneOrFail({where: { email: `${email}`, password: `${password}` }});

        return response.json(userView.render(user));
    },

    async create(request: Request, response: Response){
        const {
            name,
            email,
            password,
        } = request.body;
    
        const usersRepository = getRepository(User);

        const data = {
            name,
            email,
            password
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });
    
        const user = usersRepository.create(data);
    
        await usersRepository.save(user);
    
        return response.status(200).json(user);
    } 
}