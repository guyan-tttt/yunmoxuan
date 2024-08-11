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
    },
    updateSource: async(data) => {
        const source = await SourceModel.findOneAndUpdate({
            _id: data._id
        }, {
            ...data,
            updateTime: new Date()
        }).exec();
        return source;
    },
    delSource: async(id) => {
        const source = await SourceModel.deleteOne({
            _id: id
        })
        return source;
    },
    updateGroup: async(data) => {
        await SourceGroup.findOneAndUpdate({
            _id: data._id
        }, {
            ...data,
            updateTime: new Date()
        }).exec();
    },
    findSource: async(groupId) => {
        const source = await SourceModel.find({
            groupId
        }).exec();
        return source;
    },
    delGroup: async(id) => {
        const group = await SourceGroup.deleteOne({
            _id: id
        }).exec();
        return group;
    }
}

module.exports = sourceService;