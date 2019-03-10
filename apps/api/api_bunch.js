const express = require('express');
const router=express.Router();
const path=require('path');
const crypto=require('crypto');
const mongoose=require('mongoose');
const multer=require('multer');
const GridFsStorage=require('multer-gridfs-storage');
const Grid=require('gridfs-stream');
const methodOverride=require('method-override');

//Mongo URI
const mongoURI='mongodb://localhost/Test1';

//Create mongo connection
const conn=mongoose.createConnection(mongoURI);

//Init gfs (girdfs stream part)
let gfs;
conn.once('open',()=>{
	// Init Stream
	console.log("Connected MongoDB ");
	gfs=Grid(conn.db,mongoose.mongo);
	gfs.collection('temp');
	//gfs.collection('uploads');
	//gfs.collection('video');
	//gfs.collection('thumbnail');
	
	console.log("Stream Service Start")
});

// Create storage engine crypto version

// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });


//Create Storage engine simple version
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'||file.mimetype==='image/jpg'){
    	console.log('image file '+file.originalname+' upload');
    	return{
    		filename:file.originalname,
    		bucketName:'temp'
    	};
    }else if(file.mimetype==='video/mp4'||file.mimetype==='video/avi'){
    	console.log('video file '+file.originalname+' upload');
    	return{
    		filename:file.originalname,
    		bucketName:'temp'
    	};
    }else{
    	console.log('No support file '+file.originalname+'');
    	return null;
    }
	}	
});

const upload = multer({ storage });

//@route GET/
//@desc Loads form

router.get('/',(req,res)=>{
	gfs.files.find().toArray((err,files)=>{
		//Checkt if files 
		if(!files||files.length==0){
			//err:'No files exist'
			res.render('index',{files:false});
		}else{
			files.map(file=>{
				if(file.contentType==='image/jpeg'||file.contentType==='image/png'){
					file.isImage=true;
				}else{
					file.isImage=false;
				}
			});
			res.render('index',{files:files});
		}

		
	});
});

//@route POST /upload
//@desc Uploads file to DB
router.post('/upload',upload.single('file'),(req,res)=>{
	console.log("upload file "+req.params);
	res.redirect('/HealthCare_API');
	//res.json({file:req.file});
})

//@route GET /files
//#desc Display all files in JSON
router.get('/files',(req,res)=>{
	gfs.files.find().toArray((err,files)=>{
		console.log('Call DataBase info API');
		//Checkt if files 
		if(!files||files.length==0){
			return res.status(404).json({
				err:'No files exist'
			});
		}

		//Files exist
		return res.json(files);
	});
});

//@route GET /files/"filename"
//#desc Display single file object
router.get('/files/:filename',(req,res)=>{
	gfs.files.findOne({filename:req.params.filename},(err,file)=>{
		//Checkt if file 
		if(!file||file.length==0){
			return res.status(404).json({
				err:'No files exist'
			});
		}
		//File exists
		return res.json(file);
	});
});

//@route GET /image/"filename"
//#desc Display single file object
router.get('/image/:filename',(req,res)=>{
	gfs.files.findOne({filename:req.params.filename},(err,file)=>{
		//Checkt if file 
		if(!file||file.length==0){
			return res.status(404).json({
				err:'No files exist'
			});
		}
		//Check if image
		if(file.contentType=='image/jpeg'||file.contentType=='image/png'){
			//Read output to browser
			console.log('call image stream API');
			const readstream=gfs.createReadStream(file.filename);
			readstream.pipe(res);

		}else{
			res.status(404).json({
				err:'Not an image'
			})
		}
		
	});
});



//@route GET /video/"filename"
//#desc Display single file object
router.get('/video/:filename',(req,res)=>{
	gfs.files.findOne({filename:req.params.filename},(err,file)=>{
		
		//Checkt if file 
		if(!file||file.length==0){
			return res.status(404).json({
				err:'No files exist'
			});
		}
		//Check if video
		if(file.contentType=='video/mp4'||file.contentType=='video/avi'){
			//Read output to browser
			console.log('call video stream API');
			const readstream=gfs.createReadStream(file.filename);
			readstream.pipe(res);
			//res.render('player',{movie:res});

		}else{
			res.status(404).json({
				err:'Not an video'
			})
		}
		
	});
});

//@route DELETE /files/:id
//@desc Delete file
router.delete('/files/:id',(req,res)=>{
	console.log('file delete '+req.params.id);
	gfs.remove({_id:req.params.id,root:'temp'},(err,girdStore)=>{
		if(err){
			return res.status(404).json({err:err});
		}

		res.redirect('/HealthCare_API');
	});
});

module.exports=router;