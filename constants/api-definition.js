/**
 * Created by Anil Jangra on 31/5/17
 */

module.exports = {
    COMMON: {

        FIND(model) {
            const modelName = model.collection.collectionName;
            return {
                summary: `Search ${modelName}.`,
                description: '',
                method: 'get',
                path: `/${modelName.toLowerCase()}`,
                tags: [modelName],
                parameters: [],
                responses: {
                    200: {
                        description: 'successful operation',
                        schema: {
                            type: 'array',
                            items: {
                                $ref: `#/definitions/${modelName}`
                            }
                        }
                    },
                    400: {
                        description: 'Invalid status value'
                    }
                },
            };
        },
        PUT_POST(model, method) {
            const modelName = model.collection.collectionName;
            return {
                summary: `Add a new ${modelName}.`,
                description: '',
                method: method || 'post',
                path: `/${modelName.toLowerCase()}`,
                tags: [modelName],
                parameters: [
                    {
                        in: 'body',
                        name: 'body',
                        description: `${modelName} object that needs to be added`,
                        required: true,
                        schema: {
                            $ref: `#/definitions/${modelName}`
                        }
                    }
                ],
            };
        },
        REMOVE(model) {
            const modelName = model.collection.collectionName;
            return {
                tags: [modelName.toLowerCase()],
                summary: `Deletes a ${modelName}`,
                description: `Deletes a ${modelName}`,
                path: `/${modelName.toLowerCase()}/{id}`,
                method: 'delete',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: `${modelName} id to delete`,
                        required: true,
                        type: 'string'
                    }
                ]

            };
        }
    },
    USER: {

    }
};
