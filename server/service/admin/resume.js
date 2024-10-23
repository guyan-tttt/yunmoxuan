const ResumeModel = require("../../model/ResumeModel")
const ProjectModel = require("../../model/ProjectModel")

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
        return list.educationInfo.filter((item) => {
            return item
        }).map(item => {
            return {
                ...item,
                logo: process.env.SERVER_BASE_URL + item.logo
            }
        })
    },
    educationByIndex: async(id,index) => {
        return (await ResumeModel.findOne({_id: id}).select("educationInfo")).educationInfo[parseInt(index) + 1]
    },
    deleteEducation: async(id,data) => {
        return await ResumeModel.findByIdAndUpdate(data.resume_id, {
            $pull: {
                educationInfo: data
            }
        })
    },
    addSkill: async({ id,value}) => {
        return await ResumeModel.findByIdAndUpdate(id, {
            $push: {
                expertise: value
            }
        })
    },
    skill: async(id) => {
        return (await ResumeModel.findOne({_id: id}).select("expertise")).expertise
    },
    deleteSkill: async(id,value) => {
        return await ResumeModel.findByIdAndUpdate(id, {
            $pull: {
                expertise: value
            }
        })
    },
    addProject: async(data) => {
        return await ProjectModel.create(data)
    },
    project: async() => {
       const list =  await ProjectModel.find({})
       list.forEach(item => {
         item.logo  = process.env.SERVER_BASE_URL + item.logo
       })
       return list
    },
    projectById: async(id) => {
        const res =  await ProjectModel.findOne({_id: id})
        res.logo  = process.env.SERVER_BASE_URL + res.logo
        return res

    },
    deleteProject: async(id) => {
        return await ProjectModel.deleteOne({_id: id})
    },
    // 修改项目经验
    updateProject: async(data) => {
        return await ProjectModel.findByIdAndUpdate(data.id, {
            ...data,
            updateTime: new Date()
        })
    }


}

module.exports = resumeService