const Registration=(request,response,pg_db,bcrypt)=>{
	const {email,name,password}=request.body;
	//Use transaction to commit to both login and user tables and avoid not matching entries
	if (!email||!name||!password) {
		return response.status(400).json("Error in registration submission information!")
	}
	let hash=bcrypt.hashSync(password);
		pg_db.transaction(trx=>{
			trx.insert({
				hash:hash,
				email:email
			})
			.into("login").returning("email").then(loginEmail=> {
				return trx("users").insert({
					name: name,
					email: loginEmail[0].email,
					joined: new Date()
				}).returning("*").then(user=>{response.json(user[0]);
				})
			})
			.then(trx.commit).catch(trx.rollback)
		})
		.catch(err=>response.status(400).json('Error, unable to register...'))
}

module.exports={
	Registration: Registration
}