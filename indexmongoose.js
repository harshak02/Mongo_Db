const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('strictQuery', true);
const url=`mongodb+srv://tweetBot:tweetBot@cluster0.kuyrg.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(url).then((result) => {
	console.log("Connected to DB");
}).catch((err) => {
	console.log("Error connecting to DB",err);
	
});;