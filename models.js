var Schemas={};
//just schema ver
//use app.js const mongo=require('moongoose')
Schemas.createCategorySchema=function(mongo){
	//mongodb part
	var CategorySchema = mongo.Schema({
	category: String,
    category_desc: String
	});
	
	console.log('On CategorySchema');

	return CategorySchema;
};

Schemas.createExerciseSchema=function(mongo){
	//mongodb part
	var ExerciseSchema = mongo.Schema({
	category: String,
    exercise: String,
    exercise_desc: String,
    image_title: String,
    movie_title: String,
    body_title:String,
    rgb_title:String
	});
	
	console.log('On ExerciseSchema');

	return ExerciseSchema;
};

module.exports=Schemas;
