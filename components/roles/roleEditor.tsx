'use client'
import {Role, roleFactory} from "@/src/models/RoleModel";
import {Permission} from "@/src/models/PermissionModel";
import {useEffect, useRef, useState} from "react";
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Stack,
    TextField,
    TextFieldProps,
    Typography
} from "@mui/material";
import {useRouter} from "next/navigation";

export type RoleEditorProps = {
    role: Role
    permissions: Permission[]
}

type PermissionCheckState = {
    permission: Permission
    checked: boolean
}

export default function RoleEditor(props: RoleEditorProps) {
    const router = useRouter()
    const [checkedPermissions, setCheckedPermissions] = useState<PermissionCheckState[]>([])
    const nameRef = useRef<TextFieldProps>(null)
    const descriptionRef = useRef<TextFieldProps>(null)
    const [defaultRole, setDefaultRole] = useState(props.role.default)

    useEffect(() => {
        const permissions: PermissionCheckState[] = props.permissions.map((permission) => {
            return {
                permission: permission,
                checked: props.role.permissions.some((rolePermission) => rolePermission.name === permission.name)
            }
        })

        setCheckedPermissions(permissions)
    }, [props.permissions, props.role.permissions])

    const handleSubmit = async () => {
        const name = nameRef.current?.value as string
        const description = descriptionRef.current?.value as string

        await roleFactory().update(props.role.id, {
            name: name,
            description: description,
            default: defaultRole,
        })

        //  get added permissions compare props permissions
        const addedPermissions = checkedPermissions.filter((permission) => {
            return permission.checked && !props.role.permissions.some((rolePermission) => rolePermission.name === permission.permission.name)
        })

        //  get removed permissions compare props permissions
        const removedPermissions = props.role.permissions.filter((rolePermission) => {
            return !checkedPermissions.find((permission) => permission.permission.name === rolePermission.name)?.checked
        })

        //  add permission
        for (const permission of addedPermissions) {
            await roleFactory().addPermission(props.role.id, permission.permission.name)
        }

        //  delete permission
        for (const permission of removedPermissions) {
            await roleFactory().deletePermission(props.role.id, permission.name)
        }

        //  reload
        router.push("/roles")
    }

    return (
        <Stack spacing={1}>
            <TextField
                label={"ロール名"}
                name={"name"}
                defaultValue={props.role.name}
                inputRef={nameRef}
                sx={{
                    width: "50%"
                }}
            />

            <TextField
                label={"備考"}
                name={"description"}
                defaultValue={props.role.description}
                inputRef={descriptionRef}
                multiline
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={defaultRole}
                        onChange={(e) => {
                            setDefaultRole(e.target.checked)
                        }}
                    />
                }
                label={"初期ロール"}
            />

            <Typography>
                権限
            </Typography>
            <FormGroup>
                {checkedPermissions.map((permission, index) => {
                    return (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    checked={permission.checked}
                                    onChange={(e) => {
                                        const checked = e.target.checked
                                        setCheckedPermissions((prev) => {
                                            return prev.map((prevPermission) => {
                                                if (prevPermission.permission.name === permission.permission.name) {
                                                    return {
                                                        permission: prevPermission.permission,
                                                        checked: checked
                                                    }
                                                }
                                                return prevPermission
                                            })
                                        })
                                    }}
                                />
                            }
                            label={permission.permission.name}
                        />
                    )
                })}
            </FormGroup>

            <Button
                variant={"contained"}
                onClick={handleSubmit}
            >
                保存
            </Button>
        </Stack>
    )
}