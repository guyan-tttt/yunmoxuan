const SourceGroup = require('../../model/SourceGroup');
const SourceModel = require('../../model/SourceModel');

const sourceService = {
    addGroup: async(data) => {
        const group = await SourceGroup.create({
            ...data,
            createTime: new Date(),
            updateTime: new Date(),
            source: []
        });
        return group;
    },
    groupList: async() => {
        const groups = await SourceGroup.find({}).populate('source').exec();
        // 查询对应的分组下的资源
        for(let item of groups) {
            item.source = await SourceModel.find({
                groupId: item._id
            }).exec();
        }
        return groups;
    },
    addSource: async(data) => {
        await SourceModel.create({
            ...data,
            createTime: new Date(),
            updateTime: new Date()
        })
    }
}

module.exports = sourceService;