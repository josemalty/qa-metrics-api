import { response } from "express";
import { getConnection } from "typeorm";
import { UserEntity } from "../database/entities/user.entity";
import { UserRepository } from "./../repository/user.repository";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = getConnection("postgres").getCustomRepository(UserRepository);
    }

    public index = async () => {
        const users = await this.userRepository.find();
        return users;
    };

    public create = async (user: UserEntity) => {
        const newUser = await this.userRepository.save(user);
        return newUser;
    };

    public update = async (user: UserEntity, id: number) => {
        user.id = id;
        const updatedUser = await this.userRepository.save(user);
        return updatedUser;
    };

    public delete = async (id: number) => {
        const deletedUser = await this.userRepository.delete(id);
        return deletedUser;
    };

    public findById = async (id: number) => {
        const foundUser = await this.userRepository.findOne(id);
        return foundUser;
    };
}
