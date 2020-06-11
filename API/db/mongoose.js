// This file is responsible for connection with mongoDB database

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var ConnectionString = 'mongodb+srv://' + process.env.MongoDB_USER + ':'
 + process.env.MongoDB_PW + '@node-rest-shop-n6p9q.mongodb.net/task-manager-db?retryWrites=true&w=majority';

mongoose.connect(ConnectionString,{
    useUnifiedTopology : true,
    useNewUrlParser : true,
    useCreateIndex: true,
    useFindAndModify : false   
})
.then(()=>console.log('MongoDB Connected'))
.catch(err =>{
    console.log(err.message);
});

module.exports = {
    mongoose
}
