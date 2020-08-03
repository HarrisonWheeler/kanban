import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class ListService {
    async find(query = {}) {
        let lists = await dbContext.Lists.find(query)
        return lists
    }

    async getById(id, userEmail) {
        let data = await dbContext.Lists.findOne({ _id: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this List")
        }
        return data
    }

    async create(rawData) {
        let data = await dbContext.Lists.create(rawData)
        return data
    }

    async edit(id, userEmail, update) {
        let data = await dbContext.Lists.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this List");
        }
        return data;
    }

    async delete(id, userEmail) {
        let data = await dbContext.Lists.findOneAndRemove({ _id: id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this List");
        }
    }

}


export const listService = new ListService()