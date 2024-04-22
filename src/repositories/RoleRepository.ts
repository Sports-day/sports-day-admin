import {ApiClient} from "@/src/lib/ApiClient";
import {Role} from "@/src/models/RoleModel";
import {Permission} from "@/src/models/PermissionModel";

const getRoles = async (): Promise<Role[]> => {
    const data = await ApiClient().get(`/roles`)
    return data.data
}

const getRole = async (id: number): Promise<Role> => {
    const data = await ApiClient().get(`/roles/${id}`)
    return data.data
}

const deleteRole = async (id: number): Promise<void> => {
    await ApiClient().delete(`/roles/${id}`)
}

const updateRole = async (id: number, omittedRole: Omit<Role, "id" | "permissions" | "createdAt" | "updatedAt">): Promise<Role> => {
    const data = await ApiClient().put(`/roles/${id}`, omittedRole)
    return data.data
}

const createRole = async (omittedRole: Omit<Role, "id" | "permissions" | "createdAt" | "updatedAt">): Promise<Role> => {
    const data = await ApiClient().post(`/roles`, omittedRole)
    return data.data
}

const getRolePermissions = async (id: number): Promise<Permission[]> => {
    const data = await ApiClient().get(`/roles/${id}/permissions`)
    return data.data
}

const addRolePermission = async (id: number, permissionName: string): Promise<Role> => {
    const data = await ApiClient().post(`/roles/${id}/permissions`, {
        permission: permissionName
    })
    return data.data
}

const deleteRolePermission = async (id: number, permissionName: string): Promise<Role> => {
    const data = await ApiClient().delete(`/roles/${id}/permissions/${permissionName}`)
    return data.data
}

export type RoleRepository = {
    getRoles: () => Promise<Role[]>,
    getRole: (id: number) => Promise<Role>,
    deleteRole: (id: number) => Promise<void>,
    updateRole: (id: number, omittedRole: Omit<Role, "id" | "permissions" | "createdAt" | "updatedAt">) => Promise<Role>,
    createRole: (omittedRole: Omit<Role, "id" | "permissions" | "createdAt" | "updatedAt">) => Promise<Role>,
    getRolePermissions: (id: number) => Promise<Permission[]>,
    addRolePermission: (id: number, permissionName: string) => Promise<Role>,
    deleteRolePermission: (id: number, permissionName: string) => Promise<Role>,
}

export const roleRepository: RoleRepository = {
    getRoles,
    getRole,
    deleteRole,
    updateRole,
    createRole,
    getRolePermissions,
    addRolePermission,
    deleteRolePermission,
}
