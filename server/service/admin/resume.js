const ResumeModel = require("../../model/ResumeModel")

const resumeService = {
    add: async(data) => {
        const list = await ResumeModel.find({})
        if(list.length > 0) {
            ResumeModel.updateOne({ _id: list[0]._id }, data).catch(err => console.log(err))
        } else {
            ResumeModel.create(data).catch(err => console.log(err))
        }
        return true
    }   
}

module.exports = resumeService