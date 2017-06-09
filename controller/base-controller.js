/**
 * Created by Anil Jangra on 31/5/17
 */
const API_DEF = require('../constants/api-definition');

//======================================= Implementation =========================================

class BaseController {

    constructor(Model) {
        this.Model = Model;
    }

    get find() {
        return {
            definition: API_DEF.COMMON.FIND(this.Model),

            async handler(req, res) {
                const collection = await this.Model.find(req.query).exec();
                res.status(200).json(collection);
            }
        };
    }

/*
    findOne() {
        return {
            definition: API_DEF.USER.FIND_ONE,

            async handler(req, res) {
                const doc = await this.Model.findOne(req.query);
                res.status(200).json(doc);
            }
        };
    }

    findById() {
        return {
            definition: API_DEF.USER.FIND_BY_ID,

            async handler(req, res) {
                const doc = await this.Model.findById(req.params.id);
                if (!doc) { return res.status(404).end(); }
                return res.status(200).json(doc);
            }
        };
    }
*/

    get create() {
        return {
            definition: API_DEF.COMMON.PUT_POST(this.Model),

            async handler(req, res) {
                const doc = await this.Model.create(req.body);
                return res.status(201).json(doc);
            }
        };
    }

    get update() {
        return {
            definition: API_DEF.COMMON.PUT_POST(this.Model),

            async handler(req, res) {
                const conditions = { _id: req.params.id };
                const doc = await this.Model.update(conditions, req.body, { new: true });
                if (!doc) { return res.status(404).end(); }
                return res.status(200).json(doc);
            }
        };
    }

    get remove() {
        return {
            definition: API_DEF.COMMON.REMOVE(this.Model),

            async handler(req, res) {
                const doc = await this.Model.remove(req.params.id);
                if (!doc) { return res.status(404).end(); }
                return res.status(204).end();
            }
        };
    }
}
//======================================= Exports ================================================

module.exports = BaseController;