const SourceGroup = require('../../model/SourceGroup');

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
        return groups;
    }
}

module.exports = sourceService;