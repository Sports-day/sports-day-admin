import {TeamTagRepository, teamTagRepository} from "@/src/repositories/TeamTagRepository";

export type TeamTag = {
    id: number,
    name: string,
    sportId: number | null,
    createdAt: string,
    updatedAt: string
}

export const teamTagFactory = (repo?: TeamTagRepository) => {
    const repository = repo ?? teamTagRepository

    return {
        index: async (): Promise<TeamTag[]> => {
            return await repository.getTeamTags()
        },
        show: async (id: number): Promise<TeamTag> => {
            return await repository.getTeamTag(id)
        },
        delete: async (id: number): Promise<void> => {
            return await repository.deleteTeamTag(id)
        },
        create: async (omittedTeamTag: Omit<TeamTag, "id" | "createdAt" | "updatedAt">): Promise<TeamTag> => {
            return await repository.createTeamTag(omittedTeamTag)
        },
        update: async (id: number, omittedTeamTag: Omit<TeamTag, "id" | "createdAt" | "updatedAt">): Promise<TeamTag> => {
            return await repository.updateTeamTag(id, omittedTeamTag)
        }
    }
}