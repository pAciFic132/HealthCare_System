var Schemas={};
//just schema ver
//use app.js const mongo=require('moongoose')
Schemas.createCategorySchema=function(mongo){
	//mongodb part
	var CategorySchema = mongo.Schema({
	cateogry: String,
    cate_desc: String
	});
	
	console.log('On CategorySchema');

	return CategorySchema;
};

Schemas.createExerciseSchema=function(mongo){
	//mongodb part
	var ExerciseSchema = mongo.Schema({
	cateogry: String,
    exercise_name: String,
    exer_desc: String,
    image_title: String,
    movie_title: String
	});
	
	console.log('On ExerciseSchema');

	return ExerciseSchema;
};

module.exports=Schemas;
