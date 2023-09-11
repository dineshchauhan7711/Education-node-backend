const contactModel = require("../model/contact.model")
exports.insertContact = async(req,res) => {
    try {
        const contact = new contactModel({
            name:req.body.name,
            email:req.body.email,
            number:req.body.number,
            message:req.body.message
        })
        const data = await contact.save()
        res.status(200).json({
            message:"YOUR MESSAGE SENED SUCCESSFULLY",
            status:200,
            data:data
        })

    } catch (error) {
        res.status(500).json({
            message:"SOMETHING WENT WRONG",
            status:500
        })
    }
}