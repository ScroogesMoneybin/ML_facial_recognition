const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: `${process.env.CLAR_API_KEY}`,
});

const ClarifaiCall=(request,response)=>{app.models.predict('face-detection', request.body.input)
	.then(info=>{
		response.json(info)
	})
	.catch(error=> response.status(400).json("Error with API."))
}


const submitImage=(request,response,pg_db)=>{
	
	const {id}=request.body;
	pg_db("users").where("id","=",id).increment("entries",1).returning("entries")
	.then(entries=>{
		response.json(entries[0].entries);
	})
	.catch(error=> response.status(400).json("Unable to access number of entries."))
}
module.exports={
	submitImage: submitImage,
	ClarifaiCall: ClarifaiCall
}
