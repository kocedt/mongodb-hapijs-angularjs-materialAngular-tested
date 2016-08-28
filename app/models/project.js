//init
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ProjectSchema = new Schema({
	name: String,
	description: String,
	clientName: String,
	type: String,
	clientEmail: String
});
module.exports = mongoose.model('Project', ProjectSchema, 'Project');