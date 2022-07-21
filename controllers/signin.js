
const SigningIn=(request,response,pg_db,bcrypt)=>{
	const {email,password}=request.body;
	if (!email||!password) {
		return response.status(400).json("Error in registration submission information!")
	}
	pg_db.select("email", "hash").from("login").where("email","=",email)
	.then(info=>{
		const Valid=bcrypt.compareSync(password, info[0].hash);
		if (Valid) {
			return pg_db.select("*").from("users").where("email","=",email).
			then(user=>{
			response.json(user[0])
			})
			.catch(error=>response.status(400).json("Can't retrieve user"))
		}
		else {
			response.status(400).json("Trouble signing in")
		}
	})
	.catch(error=>response.status(400).json("Trouble signing in"))
}
module.exports={
	SigningIn: SigningIn
}