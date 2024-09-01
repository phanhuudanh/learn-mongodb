const path = require('path')

const uploadSingleFile = async (fileObject) => {
    console.log(fileObject.name)
    let uploadPath = path.resolve(__dirname, '../public/images/upload');
    const extName = path.extname(fileObject.name)
    console.log('>>>check extName: ',extName);
    let baseName = path.basename(fileObject.name, extName);
    console.log('>>>check basename:', baseName)
    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;

    try {
        await fileObject.mv(finalPath);
        return{
            status: 'success',
            path: finalName,
            error:null
        }
    } catch (err) {
        console.log('>>>Error upload single file!')
        return{
            status: 'failed',
            path: null,
            error: err
        }
    }
}
const uploadMultipleFiles = async (filesArr) => {
    try {
        let uploadPath = path.resolve(__dirname, '../public/images/upload');
        let resultArr = [];
        let countSuccess = 0;
        for(let i=0 ; i<filesArr.length; i++){
            let extName = path.extname(filesArr[i].name);
            let baseName = path.basename(filesArr[i].name, extName);
            let finalName = `${baseName}-${Date.now()}${extName}`;
            let finalPath = `${uploadPath}/${finalName}`;
            try {
                await filesArr[i].mv(finalPath);
                resultArr.push({
                    status:'success',
                    path:finalName,
                    fileName:filesArr[i].name,
                    error:null
                })
                countSuccess++;
            } catch (err) {
                resultArr.push({
                    status:'failed',
                    path:null,
                    fileName: filesArr[i].name,
                    error:err
                })
            }
        }
        return{
            countSuccess: countSuccess,
            detail: resultArr
        }
    } catch (error) {
        console.log('Check error upload multiple files: ',error)
    }
}
module.exports ={
    uploadSingleFile,
    uploadMultipleFiles
}