const imageModel = require('../../model/ImageModel');

const imageService = {
    upload: async(data) => {
        data.forEach(item => {
            imageModel.create(item)
        })
    }
}

module.exports = imageService;