
const road = require("../models/Road");


const saveData = (req,res)=>{
   
    try {
        const {latitude,longitude,distanceLeft,distanceRight} = req.body;
        const roadData = new road({
            latitude,
            longitude,
            distanceLeft,
            distanceRight,
        });
        roadData.save();
        res.status(200).json({status:"success",msg:"data saved successfully"});
        
    } catch (err) {
        console.log("err", err);
    }
}
module.exports = { saveData };