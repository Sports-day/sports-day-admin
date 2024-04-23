import {Permission} from "@/src/models/PermissionModel";
import {ApiClient} from "@/src/lib/ApiClient";

const getPermissions = async (): Promise<Permission[]> => {
    const data = await ApiClient().get(`/permissions`)
    return data.data
}

export type PermissionRepository = {
    getPermissions: () => Promise<Permission[]>,
}

export const permissionRepository: PermissionRepository = {
    getPermissions,
}
