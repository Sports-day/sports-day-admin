import {User} from "../models/UserModel";
import {ApiClient} from "../lib/ApiClient";
import {Team} from "../models/TeamModel";
import {Role} from "@/src/models/RoleModel";

const getUsers = async (): Promise<User[]> => {
    const data = await ApiClient().get("/users")
    return data.data
}

const getUser = async (id: number): Promise<User> => {
    const data = await ApiClient().get(`/users/${id}`)
    return data.data
}

const deleteUser = async (id: number): Promise<void> => {
    await ApiClient().delete(`/users/${id}`)
}

const createUser = async (omittedUser: Omit<User, "id" | "teamIds" | "createdAt" | "updatedAt">): Promise<User> => {
    const data = await ApiClient().post(`/users`, omittedUser)
    return data.data
}

const updateUser = async (id: number, omittedUser: Omit<User, "id" | "teamIds" | "createdAt" | "updatedAt">): Promise<User> => {
    const data = await ApiClient().put(`/users/${id}`, omittedUser)
    return data.data
}

const getTeams = async (id: number): Promise<Team[]> => {
    const data = await ApiClient().get(`/users/${id}/teams`)
    return data.data
}

const getRole = async (id: number): Promise<Role> => {
    const data = await ApiClient().get(`/users/${id}/role`)
    return data.data
}

const setRole = async (id: number, roleId: number): Promise<void> => {
    await ApiClient().post(`/users/${id}/role`, {
        id: roleId
    })
}

export type UserRepository = {
    getUsers: () => Promise<User[]>,
    getUser: (id: number) => Promise<User>,
    deleteUser: (id: number) => Promise<void>,
    createUser: (omittedUser: Omit<User, "id" | "teamIds" | "createdAt" | "updatedAt">) => Promise<User>,
    updateUser: (id: number, omittedUser: Omit<User, "id" | "teamIds" | "createdAt" | "updatedAt">) => Promise<User>,
    getTeams: (id: number) => Promise<Team[]>,
    getRole: (id: number) => Promise<Role>,
    setRole: (id: number, roleId: number) => Promise<void>,
}

export const userRepository: UserRepository = {
    getUsers,
    getUser,
    deleteUser,
    createUser,
    updateUser,
    getTeams,
    getRole,
    setRole,
}