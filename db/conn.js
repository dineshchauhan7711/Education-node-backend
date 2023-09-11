const mongoose = require("mongoose")
mongoose.connect(db_connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("connected....!!!");
}).catch((e) => { console.log("not connected....!!!"); })

