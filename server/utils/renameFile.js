
const fs = require('fs')
module.exports =  function renameFile(file,type) {
    if(file) {
        // 提取新旧文件路径
        const oldFile = file.destination + file.filename
    const newFile = file.destination + file.filename + "." + type
    const icon  = newFile.replace("public","")
    // 将文件重命名
    fs.renameSync(oldFile, newFile, (err) => {
            if(err) {
                console.log(err)
            } else {
                console.log("文件重命名成功")
            }
    })
    return icon
}
}