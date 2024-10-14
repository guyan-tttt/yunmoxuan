const ResumeModel = require("../../model/ResumeModel")

const resumeService = {
    add: async(data) => {
        
        const list = await ResumeModel.find({})
        if(list.length > 0) {
            ResumeModel.updateOne({ _id: list[0]._id }, {
                ...data,
                updateTime: new Date()
            }).catch(err => console.log(err))
        } else {
            ResumeModel.create({
                ...data,
                updateTime: new Date()
            }).catch(err => console.log(err))
        }
        return true
    },
    detail:async() => {
       const list =  await ResumeModel.find({})
       list[0].photo = process.env.SERVER_BASE_URL + list[0].photo
       return list[0]
    }
}

module.exports = resumeService