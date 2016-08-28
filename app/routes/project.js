//init
const Joi = require('joi');
var ProjectModel = require('../models/project');

module.exports = [
	//GET
	{ 
		method: 'GET', 
		path: '/project', 
		handler: function (request, reply) {
			ProjectModel.find({}, function(err, data){
				if(err){
					reply({
						code: 503,
						message: 'Fail',
						data: err
					});
				}
				else{
					reply({
						code: 200,
						message: 'Success',
						data: data
					});
				}
			});
		} 
	},
	//POST
	{ 
		method: 'POST', 
		path: '/project', 
		config : {
			validate: {
				payload: {
					name: Joi.string().required(),
					description: Joi.string(),
					clientName: Joi.string().required(),
					type: Joi.string().required(),
					clientEmail: Joi.string().required()
				}
			}
		},
		handler: function (request, reply) {
			var task = new ProjectModel(request.payload);
			task.save(function(err){
				if(err){
					reply({
						code: 503, 
						message : err
					});
				}
				else{
					reply({
						code: 201, 
						message : 'Saved'
					});
				}
			});
		} 
	},
	//PUT
	{ 
		method: 'PUT', 
		path: '/project/{id}', 
		config : {
			validate: {
				params: {
					id: Joi.string().required()
				},
				payload: {
					name: Joi.string(),
					description: Joi.string(),
					clientName: Joi.string(),
					type: Joi.string(),
					clientEmail: Joi.string()
				}
			}
		},
		handler: function (request, reply) {
			ProjectModel.findOneAndUpdate(
				{_id: request.params.id}, 
				request.payload, 
				function(err, data){
					if(err){
						reply({
							code: 503,
							message: 'Fail',
							data: err
						});
					}
					else{
						reply({
							code: 200,
							message: 'Updated',
							data: data
						});
					}
				}
			);
		} 
	},
	//DELETE
	{ 
		method: 'DELETE', 
		path: '/project/{id}', 
		config : {
			validate: {
				params: {
					id: Joi.string().required()
				}
			}
		},
		handler: function (request, reply) {
			ProjectModel.findOneAndRemove({
				_id: request.params.id}, 
				function(err, data){
					if(err){
						reply({
							code: 503,
							message: 'Fail',
							data: err
						});
					}
					else{
						reply({
							code: 200,
							message: 'Deleted'
						});
					}
				}
			);
		} 
	}
];