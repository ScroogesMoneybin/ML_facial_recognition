const getProfile=(request,response,pg_db)=>{
		const {id}=request.params;
		pg_db.select("*").from("users").where({
			id: id
		}).then(user=>{
			if (user.length) {
		response.json(user[0]);
		} else	{
			response.status(400).json("User not found");
		}
		}).catch(error=>response.status(400).json("Error finding user!"));
		
}
module.exports={
	getProfile: getProfile
}