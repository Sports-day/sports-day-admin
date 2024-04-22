import {Permission} from "@/src/models/PermissionModel";
import {roleRepository, RoleRepository} from "@/src/repositories/RoleRepository";

export type Role = {
    id: number,
    name: string,
    description: string,
    default: boolean,
    permissions: Permission[],
    createdAt: string,
    updatedAt: string
}

export const roleFactory = (repo?: RoleRepository) => {
    const repository = repo ?? roleRepository

    return {
        index: async (): Promise<Role[]> => {
            return await repository.getRoles()
        },
        show: async (id: number): Promise<Role> => {
            return await repository.getRole(id)
        },
        delete: async (id: number): Promise<void> => {
            return await repository.deleteRole(id)
        },
        create: async (omittedRole: Omit<Role, "id" | "permissions" | "createdAt" | "updatedAt">): Promise<Role> => {
            return await repository.createRole(omittedRole)
        },
        update: async (id: number, omittedRole: Omit<Role, "id" | "permissions" | "createdAt" | "updatedAt">): Promise<Role> => {
            return await repository.updateRole(id, omittedRole)
        },
        addPermission: async (id: number, permissionName: string): Promise<Role> => {
            return await repository.addRolePermission(id, permissionName)
        },
        deletePermission: async (id: number, permissionName: string): Promise<Role> => {
            return await repository.deleteRolePermission(id, permissionName)
        }
    }
}