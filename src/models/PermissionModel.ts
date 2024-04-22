import {PermissionRepository, permissionRepository} from "@/src/repositories/PermissionRepository";

export type Permission = {
    name: string,
    description: string
}

export const permissionFactory = (repo?: PermissionRepository) => {
    const repository = repo ?? permissionRepository

    return {
        index: async (): Promise<Permission[]> => {
            return await repository.getPermissions()
        }
    }
}