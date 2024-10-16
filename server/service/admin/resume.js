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
       if(list.length > 0) {
            list[0].photo = process.env.SERVER_BASE_URL + list[0].photo
            list[0].educationInfo = []
            list[0].race = []
            list[0].expertise = []
            list[0].project = []
            return list[0]
       } 
       return {}
    },
    addEducation: async(data) => {
        await ResumeModel.updateOne({
            _id: data.resume_id
        }, {
            $push: {
                educationInfo: data
            }
        })
    },
    education: async(id) => {
        const list = await ResumeModel.findOne({ _id: id }).select("educationInfo")
        return list.educationInfo.map((item) => {
            return {
                ...item,
                logo: process.env.SERVER_BASE_URL + item.logo
            }
        })
    }

}

module.exports = resumeService