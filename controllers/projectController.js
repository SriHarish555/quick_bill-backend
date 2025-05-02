
const road = require("../models/Road");
const Config = require("../models/Config");


const saveData = async (req,res)=>{
   
    try {
        if(await Config.findOne({key:"addData"})){
        
            const {latitude,longitude,distanceLeft,distanceRight} = req.body;
            const roadData = new road({
                ip:req.ip,
                latitude,
                longitude,
                distanceLeft,
                distanceRight,
            });
            roadData.save();
            console.log("data saved in db ");
            res.status(200).json({status:"success",msg:"data saved successfully"});
        }
        else{
            console.log("data not saved in db ");
            res.status(200).json({status:"failed",msg:"data not saved successfully"});
        }
    } catch (err) {
        console.log("err", err);
    }
}
module.exports = { saveData };