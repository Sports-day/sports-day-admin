import {TeamTag} from "@/src/models/TeamTagModel";
import {ApiClient} from "@/src/lib/ApiClient";

const getTeamTags = async (): Promise<TeamTag[]> => {
    const data = await ApiClient().get(`/team_tags`)
    return data.data
}

const getTeamTag = async (id: number): Promise<TeamTag> => {
    const data = await ApiClient().get(`/team_tags/${id}`)
    return data.data
}

const deleteTeamTag = async (id: number): Promise<void> => {
    await ApiClient().delete(`/team_tags/${id}`)
}

const createTeamTag = async (omittedTeamTag: Omit<TeamTag, "id" | "createdAt" | "updatedAt">): Promise<TeamTag> => {
    const data = await ApiClient().post(`/team_tags`, omittedTeamTag)
    return data.data
}

const updateTeamTag = async (id: number, omittedTeamTag: Omit<TeamTag, "id" | "createdAt" | "updatedAt">): Promise<TeamTag> => {
    const data = await ApiClient().put(`/team_tags/${id}`, omittedTeamTag)
    return data.data
}

export type TeamTagRepository = {
    getTeamTags: () => Promise<TeamTag[]>,
    getTeamTag: (id: number) => Promise<TeamTag>,
    deleteTeamTag: (id: number) => Promise<void>,
    createTeamTag: (omittedTeamTag: Omit<TeamTag, "id" | "createdAt" | "updatedAt">) => Promise<TeamTag>,
    updateTeamTag: (id: number, omittedTeamTag: Omit<TeamTag, "id" | "createdAt" | "updatedAt">) => Promise<TeamTag>,
}

export const teamTagRepository: TeamTagRepository = {
    getTeamTags,
    getTeamTag,
    deleteTeamTag,
    createTeamTag,
    updateTeamTag,
}