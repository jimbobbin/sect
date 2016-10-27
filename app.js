/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), user = require('./routes/user'), http = require('http'), path = require('path'), fs = require('fs');

var app = express();

var db;

var cloudant;

var fileToUpload;

var dbCredentials = {
	dbName : 'my_sample_db'
};

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/style', express.static(path.join(__dirname, '/views/style')));

// development only
if ('development' == app.get('env')) {
	app.use(errorHandler());
}














// JavaScript Document
var server = http.Server(app);
var io = require('socket.io').listen(server);
var mongoose = require('mongoose');
//var cookie_parser = require('cookie-parser');
var express_session = require('express-session');
//var cookie = require("cookie");
var crypto = require("crypto");

var multer  =   require('multer');
var upload = multer({dest: 'public/uploads/'});
var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
			console.log(addresses);
        }
    }
}

// POUR VERSION LOCALE

app.get('/', function(req, res)
{
	res.render('index.ejs');
});
app.post('/', upload.any(), function(req, res, next)
{
	res.render('index.ejs');
});


// POUR VERSION PRODUCTION
/*
app.get('/', function(req, res)
{
	res.render('index.ejs');
});
app.post('/', upload.any(), function(req, res, next)
{
	res.render('index.ejs');
});
*/

app.use('/public', express.static(__dirname + '/public'));


// Définition de l'hôte et du port
var host = process.env.VCAP_APP_HOST || process.env.HOST || 'localhost';
var port = process.env.VCAP_APP_PORT || process.env.PORT || 8080;
/*
app.use(cookie_parser());
msp.use(function(socket, next) {
  var handshakeData = socket.request;	
  // Read cookies from handshake headers
  var cookies = cookie.parse(handshakeData.headers.cookie)
  // We're now able to retrieve session ID
  var sessionID = cookie_parser.signedCookie(cookies["connect.sid"], 'secret')
  // No session? Refuse connection
  if (!sessionID) {
    next(new Error('no session'));
  } else {
    // Store session ID in handshake data, we'll use it later to associate
    // session with open sockets
    handshakeData.sessionID = sessionID;
    // On récupère la session utilisateur, et on en extrait son username
    app.sessionStore.load(sessionID, function (err, session) {

      if (!err && session && session.user_id && session.user_id!='0') {		  
        // On stocke ce username dans les données de l'authentification, pour réutilisation directe plus tard
		handshakeData.username = session.username;
		handshakeData.user_id = session.user_id;	
		session.save();		
		//handshakeData.user_id = session.user_id = "double_connexion_forbidden"; Si le session_username est différent de 0, et que la session est bien définie, c'est que le même utilisateur à ouvert un deuxième onglet : tant que je ne met pas de cookies dans mon site, je dois interdire les connexions multiples dans plusieurs onglets. Il n'y a droit qu'à un seul onglet pour l'instant. 
		 // On stocke la session dans les données de l'authentification, pour réutilisation directe plus tard
		handshakeData.session = session;
		next(); 
        
      } else if (typeof session != "undefined"){
		  
			if (typeof session.user_id == "undefined" || session.user_id == "0" ){
				handshakeData.session = session;
				handshakeData.username = session.username ="0";
				handshakeData.user_id = session.user_id ="0";
				console.log("session.user_id  :"+session.user_id);
				session.save();
				// Session incomplète, ou non trouvée
				next(); 
			}
      }else{ // Cela signifie que la session est undefined : si la session est undefined, c'est qu'il n'y a même pas de session enregistrée, cela signifie en fait que le serveur s'est crashé (déconnecté), et que le client avait toujours sa fenêtre ouverte sur le site... donc quand le serveur s'est reconnecté, il bugue en se retrouvant avec un client qui avait la page de l'ancienne connection du serveur bref il faut lui faire un refresh de sa page !
		next(); 
      }
    });
  }
});
*/




// A UTILISER EN DEVELOPPEMENT
app.sessionStore = new express_session.MemoryStore({ reapInterval: 60000 * 10 });

app.use(express_session({

    secret: 'secret',
	store: app.sessionStore, 
    resave: false,
    saveUninitialized: true,
	//cookie: {}
}));


// A UTILISER EN PRODUCTION (ATTENTION, LE CODE SUIVANT N'EST PAS TESTE ET IL EST SUREMENT INCOMPLET OU FAUX)

//var client = redis.createClient();//CREATE REDIS CLIENT

//var session_store = new redisStore({ host: 'localhost', port: 6379, client: client });


//app.use(express_session({
//    resave: false, //don't store the session if it wasn't modified
//     saveUninitialized: false, //don't create the session if there isn't information to store
//     name : 'connect.sid',
//     secret: 'secret',
 //    store : session_store,
 //    cookie : {maxAge : (60000 * 24 * 30)}
// }));




var array_session = [] // tableau contenant les sessions actives. Normalement on doit pouvoir parcourir le sessionstore et ne pas utiliser un tableau. Mais je n'y arrive pas pour l'instant donc j'utilise la méthode du tableau. 
var login_data_to_get_schema
var login_data_to_get
var login_to_confirm_data_to_get_schema
var login_to_confirm_data_to_get
var subscribe_to_confirm_data_to_add_schema
var subscribe_to_confirm_data_to_add
var change_password_to_confirm_data_to_add_schema
var change_password_to_confirm_data_to_add
var subscribe_data_to_add_schema
var subscribe_data_to_add
var member_data_to_update_schema
var member_data_to_update
var name_data_to_get_schema
var name_data_to_add_schema
var name_data_to_update_schema   
var name_data_to_get 
var name_data_to_add
var name_data_to_update
var ObjectId = mongoose.Schema.Types.ObjectId;


							
									
									// Création du schéma pour l'inscription à confirmer
subscribe_to_confirm_data_to_add_schema = new mongoose.Schema({
createdAt: { type: Date, expires: 21600 },
//createdAt: Date,	
login : String,
pass : String,
email: String,
subs_date : String,
confirmation_pass: String
},{ collection : 'members_to_confirm' });   // collection name;);
									 
									// Création du Model pour l'inscription à confirmer
subscribe_to_confirm_data_to_add = mongoose.model('subscribe_to_confirm_data_to_add', subscribe_to_confirm_data_to_add_schema);


									
									
									
									
									// Création du schéma pour l'inscription confirmée
subscribe_data_to_add_schema = new mongoose.Schema({
login : String,
pass : String,
email: String,
subs_date : String,
id_name_switch_pass : [
	{
	_id: ObjectId,		
	switch_pass : Number,
	forename : String,
	name : String,
	t_forename : String,
	t_name : String
	}
  ]
 },{ collection : 'members' });   // collection name;);
									 
									// Création du Model pour l'inscription confirmée
subscribe_data_to_add = mongoose.model('subscribe_data_to_add', subscribe_data_to_add_schema);


									// Création du schéma pour le login à confirmer
login_to_confirm_data_to_get_schema = new mongoose.Schema({
login : String,
pass : String,
email: String,
subs_date : String,
confirmation_pass: String
},{ collection : 'members_to_confirm' }); 
									 
									// Création du Model pour le login à confirmer
login_to_confirm_data_to_get = mongoose.model('login_to_confirm_data_to_get', login_to_confirm_data_to_get_schema);


									// Création du schéma pour le changement de password à confirmer
change_password_to_confirm_data_to_add_schema = new mongoose.Schema({
createdAt: { type: Date, expires: 21600 },
//createdAt: Date,	
_id_concerned : ObjectId,
new_pass : String,
new_pass_confirmation_pass : String 
},{ collection : 'change_password_to_confirm' }); 
									 
									// Création du Model pour le changement de password à confirmer
change_password_to_confirm_data_to_add = mongoose.model('change_password_to_confirm_data_to_add', change_password_to_confirm_data_to_add_schema);

									// Création du schéma pour le changement de password à confirmer
change_password_to_confirm_data_to_get_schema = new mongoose.Schema({
_id_concerned : ObjectId,
new_pass : String,
new_pass_confirmation_pass : String 
},{ collection : 'change_password_to_confirm' }); 
									 
									// Création du Model pour le changement de password à confirmer
change_password_to_confirm_data_to_get = mongoose.model('change_password_to_confirm_data_to_get', change_password_to_confirm_data_to_get_schema);

									// Création du schéma pour le login confirmé
login_data_to_get_schema = new mongoose.Schema({
login : String,
pass : String,
email: String,
id_name_switch_pass : [
	{
	_id: ObjectId,		
	switch_pass : Number,
	forename : String,
	name : String,
	t_forename : String,
	t_name : String
	}
  ]
 },{ collection : 'members' });   // collection name;);
									 
									// Création du Model pour le login confirmé
login_data_to_get = mongoose.model('login_data_to_get', login_data_to_get_schema);


									// Création du schéma pour le member_update
member_data_to_update_schema = new mongoose.Schema({
login : String,
pass : String,
id_name_switch_pass : [
	{
	_id: ObjectId,		
	switch_pass : Number,
	forename : String,
	name : String,
	t_forename : String,
	t_name : String
	}
  ]
 },{ collection : 'members' });   // collection name;);
									 
									// Création du Model pour le member update
member_data_to_update = mongoose.model('member_data_to_update', member_data_to_update_schema);
									
									
									// Création du schéma pour les noms a recevoir
name_data_to_get_schema = new mongoose.Schema({
forename : String,
name : String,
t_forename : String,
t_name : String,
validation_taxe_date: Array
},{ collection : 'names' });   // collection name;);
									 
									// Création du Model pour les noms à recevoir
name_data_to_get = mongoose.model('name_data_to_get', name_data_to_get_schema);
									 

							
									// Création du schéma pour les noms à inscrire
name_data_to_add_schema = new mongoose.Schema({
  forename : String,
  name : String,
  t_forename : String,
  t_name : String,
  font : Array,
  date : Array,
  up_rank: Number,
  down_rank: Number,
  id_autor: [ObjectId],
  validation_taxe_date: Array
  }, { collection : 'names' });   // collection name;);
									 
									// Création du Model pour les noms à inscrire
name_data_to_add = mongoose.model('name_data_to_add', name_data_to_add_schema);

									// Création du schéma pour les noms à mettre à jour
name_data_to_update_schema = new mongoose.Schema({
  forename : String,
  name : String,
  t_forename : String,
  t_name : String,
  font : Array,
  date : Array,
  up_rank: Number,
  down_rank: Number,
  id_autor: [ObjectId],
  validation_taxe_date: Array
  }, { collection : 'names' });   // collection name;);
									 
									// Création du Model pour les noms à mettre à jour
name_data_to_update = mongoose.model('name_data_to_update', name_data_to_update_schema);
							

							
							
							
// MONGOOSE POUR VERSION LOCALE
/*								
mongoose.connect('mongodb://localhost/nodb', function(err) {
										  if (err) { throw err; }
//MONGOOSE POUR VERSION PRODUCTION	*/									
				
mongoose.connect('mongodb://jimbobbin:lolmongo4.@ds061188.mongolab.com:61188/lproject', function(err) {
										  if (err) { throw err; }
														
						
							
var sectredirection_socket_id
 
io.on('connection', function (socket)
{	
	socket.on('sectredirection_signal', function() 
	{
		sectredirection_socket_id = socket.id;
		console.log("so sectredirection_socket_id is : "+sectredirection_socket_id);
	});
	
	// Fonctions d'update des données
	socket.on('alertclick', function() 
	{
		socket.emit("alertclick");
	});
	
	function Get_login_data(login, pass, id, get_or_refresh, socket){
		
		console.log("login !");
		var query  
		if(get_or_refresh == "get_login_data")
		{
			query = { login: login, pass: pass};
		}
		else if(get_or_refresh == "refresh_login_data")
		{
			query = { _id: id};
		}
		login_data_to_get.find(query).lean().exec(function(err, docs)
		{
			if (err) return console.error(err);
			if(docs.length>0)
			{
				if(get_or_refresh=='get_login_data')
				{
					socket.broadcast.emit('login_id_for_disconnection_if_already_connected', docs[0]._id); 
					socket.emit(get_or_refresh, docs); 
				}
			}	
			else
			{
				var reason = "unknown_login";
				socket.emit("fail_to_login", reason);								  
			}
		}); 	
		
	}
		
		
	function Refresh_data(data_type_login, data_type_name, id_login, id_name, socket){
									 
		if(data_type_login=="login")
		{
			login_data_to_get.find({ _id: id_login}).lean().exec(function(err, docs)
			{
				if(err)
				{
					return console.error(err);
				}				
				socket.emit('refresh_data',"login",docs);
				socket.broadcast.emit('refresh_data',"login",docs);

				if(data_type_name=="name")
				{ // ensuite s'il faut aussi rafrachir le nom
					name_data_to_get.find({ _id: id_name}).lean().exec(function(err, docs) 
					{
						if(err)
						{
							return console.error(err);
						}	
						if(docs[0]['down_rank'] == 0)
						{
							docs[0]['down_rank'] = 1;
						}
						var count_rank = (docs[0]['up_rank']) / (docs[0]['down_rank']);
						socket.emit('refresh_data',"name",docs, count_rank);
						socket.broadcast.emit('refresh_data',"name",docs, count_rank); // On l'envoie aussi à tout le monde 											 									
					});
													
				}								 
			});
		}																
	}	

		
		

	//function Check_if_array_contains(array, item){
		
		//var array_length = array.length;
		//var i
		//for(i=0; i<array_length; i++){
			
			//if(array[i]==item){
				//return true;
		//	}
			
		//}
		//return false;
		
	//}

	//function Remove_from_array(array, item){
		
		//var i = array.indexOf(item);
		//if(i != -1) {
			//array.splice(i,1);
	//	}
		
	//}


// Connexion pour le visiteur, seules l'inscription et l'identification y sont autorisés


	socket.emit('client_connection');
	console.log("client connected");
	
	socket.on('subscribe_to_confirm_data', function(subscribe_to_confirm_data) 
	{
		
		var login = subscribe_to_confirm_data.login;
		var pass = crypto 
			.createHash("md5")
			.update(subscribe_to_confirm_data.pass)
			.digest('hex'); // On hash le mot de passe
		var email = subscribe_to_confirm_data.email; 
		var date = subscribe_to_confirm_data.date;
		var url = subscribe_to_confirm_data.url;
		var confirmation_pass = subscribe_to_confirm_data.confirmation_pass;	
			
		var confirmation_message = "Hello "+login+" ! Pour valider ton inscription, clique <a href='"+url+"?key="+confirmation_pass+"' >ici</a>"; 
		
	
		console.log("go subscribe");
		login_data_to_get.find({ login : login}).lean().exec(function(err, docs) 
		{
			if(err)
			{
				return console.error(err);
			}			
								
			if(docs.length)
			{	console.log("login_already_exists");
				socket.emit('login_already_exists');		 
												
			}
			else
			{	
				login_data_to_get.find({ email : email}).lean().exec(function(err, docs) 
				{
					if(err)
					{
						return console.error(err);
					}	
					if(docs.length)
					{console.log("email_already_exists");
						socket.emit('email_already_exists');	
					}
					else
					{console.log("almost");
						var new_member_to_confirm = new subscribe_to_confirm_data_to_add({createdAt: Date(), login: login, pass: pass, email: email, subs_date: date, confirmation_pass: confirmation_pass });
						new_member_to_confirm.save(function(err) 
						{
						/*//On l'enregistre ici directement dans les members car cette version est pour les tests en local, donc pour ne pas se prendre la tete avec le mail de confirmation et tout, on l'inscrit directement
							var new_member = new subscribe_data_to_add({ login: login, pass: pass, email: email, subs_date: date, id_name_switch_pass: [], new_pass:"", new_pass_confirmation_pass:"" });
							new_member.save(function(err) 
							{
								// we've saved the new member into the db here
								if(err)
								{
									return console.error(err);
								}																																			
								socket.emit('confirmation_done_ok_redirect', login);
								console.log("done");			*/
								// On se déconnecte de MongoDB maintenant
									 
						//});	
										
							// we've saved the new member into the db here
							if (err) return console.error(err);
							//Send_confirm_mail("imjimbobbin@gmail.com", email, "", confirmation_message);
							io.to(sectredirection_socket_id).emit('mail_to_send', email, confirmation_message);
							var message_go_check_mail = "Bonjour "+login+" ! Un mail de confirmation a \351t\351 envoy\351 \340 l'adresse que tu as donn\351e !";
							socket.emit('subscribe_data_to_confirm', message_go_check_mail); 
																		 
						});
								
					}
				});
												
											
			}
												
 											 
		});
		
									  	
	});
	
	socket.on('subscribe_data', function(key) 
	{
		var query = {confirmation_pass: key};
		login_to_confirm_data_to_get.find(query).lean().exec(function(err, docs) 
		{
			if(docs.length)
			{
				var login = docs[0].login;
				var pass = docs[0].pass;
				var email = docs[0].email;
				var date = docs[0].subs_date;		
				login_data_to_get.find({ login : login}).lean().exec(function(err, docs) 
				{
					if(err)
					{
						return console.error(err);
					}	
							
					if(docs.length)
					{
						socket.emit('login_already_exists_just_before_confirmation');		 						
					}
					else
					{	
						login_data_to_get.find({ email : email}).lean().exec(function(err, docs) 
						{
							if(err)
							{
								return console.error(err);
							}	
							if(docs.length)
							{
								socket.emit('email_already_exists_just_before_confirmation');	
							}
							else
							{						
								var new_member = new subscribe_data_to_add({ login: login, pass: pass, email: email, subs_date: date, id_name_switch_pass: [] });
								new_member.save(function(err) 
								{
									// we've saved the new member into the db here
									if (err) return console.error(err);
									
									var query_2 = {login: login};	//on supprime tous les éventuels members_to_confirm ou le login est le login validé, comme ca, si l'utilisateur a fait plusieurs demandes et qu'il a donc recu plusieurs key pour le meme login, alors toutes ces key deviendront inutilisables car tous les members_to_confirm de ce login auront été supprimés
									login_to_confirm_data_to_get.remove(query_2, function() 
									{
										io.to(sectredirection_socket_id).emit('signal_staff_new_member', 'New member : '+login+', email : '+email+''); //on envoit le mail au staff pour indiquer qu'il y a une nouvelle inscription avec le nom du nouvel inscrit
										//On supprime a présent le login_to_confirm car il ne sert plus à rien, le login est enregistré
										socket.emit('confirmation_done_ok_redirect');
									});		
										// On se déconnecte de MongoDB maintenant								 
								});
							}
						});															
					}																		 
				});	
			}				
		});					  	
	});
	
	

	
	
	
	socket.on('login_data', function(login_data) 
	{	
		console.log("login 0");
		var login = login_data.login;
		var pass = crypto 
			.createHash("md5")
			.update(login_data.pass)
			.digest('hex'); // On hash le mot de passe;
			
			//if(Check_if_array_contains(array_session, login))
			//{
				//console.log("Compte utilisé en ce moment !");
				//var reason = "login_already_used";
				//socket.emit("fail_to_login", reason);
			//}
			//else
			//{
				Get_login_data(login, pass, "", 'get_login_data',socket);
			//}		
	});
	
	
	
	
	
	socket.on('forgot_pass_data', function(forgot_pass_data) 
	{
		var email = forgot_pass_data.email;
		var new_pass = crypto 
			.createHash("md5")
			.update(forgot_pass_data.new_pass)
			.digest('hex'); // On hash le mot de passe;
		var new_pass_confirmation_pass = forgot_pass_data.new_pass_confirmation_pass;
		var url = forgot_pass_data.url;
		var query = {email:email};
		login_data_to_get.find(query).lean().exec(function(err, docs) 
		{
			if (err) return console.error(err);

			if(!docs.length)
			{

				var reason = 'unknown_email_forgot_pass';
				socket.emit("fail_to_login", reason);

			}
			else
			{	
				var password_change = new change_password_to_confirm_data_to_add({createdAt: Date(), _id_concerned : docs[0]['_id'], new_pass : new_pass, new_pass_confirmation_pass : new_pass_confirmation_pass});
				password_change.save(function(err) 
				{
					if(err){
						console.log(err);
					}
					else
					{
						var confirmation_message = "Hello "+docs[0]['login']+" ! Ton mot de passe a \351t\351 modifi\351. Pour valider ce changement, clique <a href='"+url+"?key="+new_pass_confirmation_pass+"' >ici</a>"; 
						io.to(sectredirection_socket_id).emit('mail_to_send', email, confirmation_message);
						var new_pass_confirm = "to_confirm";
						socket.emit("new_pass_send", new_pass_confirm);
					}	
				});
																																		 										
											
			}
 											 
		});
		
	});
	
	
	
	socket.on('password_change', function(key) 
	{
	
		var query = {new_pass_confirmation_pass: key};

		change_password_to_confirm_data_to_get.find(query).lean().exec(function(err, docs) 
		{
			if (err) return console.error(err);
			if(!docs.length)
			{
				return false;
			}
			else
			{	
				var query_2 = {_id: docs[0]["_id_concerned"]};	
				var new_pass = docs[0]["new_pass"] // le mot de passe a déjà été hashé dans le socket forgot_pass_data (voir plus haut)
				var member_update = member_data_to_update.update(query_2, {pass:new_pass}, function(err)
				{ // on remplace l'ancien pass par le nouveau pass et on remet le new_pass_confirmation_pass à "" pour que le lien envoyé au membre ne fonctionne pas plus d'une fois
					if(err)
					{
						console.log(err);
					}
					else
					{
						change_password_to_confirm_data_to_get.remove(query, function() 
						{
							//On supprime a présent le login_to_confirm car il ne sert plus à rien, le login est enregistré
							var new_pass_confirm = "confirmed";
							socket.emit("new_pass_send", new_pass_confirm);	
						});																			
																																					
																						
					}	
											
				});			
			
			}			  	
		});		
		
	});	
	
	


					
											
			
	//if(typeof socket.request.session != "undefined")
	//{	 C'est nécessaire, au cas ou la personne n'a pas de session et que l'on veut rafrachir sa page de force
		//if(socket.request.session.user_id=='double_connexion_forbidden')
		//{	
		//	socket.emit('error_page');
		//}
	//}  	
	
		
	
	socket.on('deconnection_data', function() 
	{
		socket.emit('get_deconnection_data');
	});
	
	socket.on('disconnect', function() 
	{
		socket.emit('get_deconnection_data');
	});

	
	socket.on('name_data', function(name_data) 
	{

		var id = name_data.id;
		var forename = name_data.forename;
		var name = name_data.name;
		var t_forename = name_data.t_forename;
		var t_name = name_data.t_name;
		var font = name_data.font;
		var date = name_data.date;
		var id_autor = name_data.id_autor;
		var id_name = name_data.id_name;
		var up_rank = name_data.up_rank;
		var down_rank = name_data.down_rank;
		var switch_pass = name_data.switch_pass;
		var refresh_data_type_login="";
		var refresh_data_type_name="";
		var refresh_id_login="";
		var refresh_id_name="";
		var member_knows_name = name_data.member_knows_name;
		
		var query = { _id : id};
		var do_this;
		var query_update_member_simple = { _id : id_autor}; // On rajoute trois autres variables semblables pour updater la collection member
		var query_update_member = { _id : id_autor, "id_name_switch_pass._id" : id }; // On rajoute deux autres variables semblables pour updater la collection member
		var do_this_collection_member =0;
									
		if(id!="")
		{ // S'il s'agit bien d'un update (donc si id est bien connu) : donc d'un rank positif ou négatif													
									
			var id_object = mongoose.Types.ObjectId(id); // on change le type de l'id, il passe de string à ObjectId (on utilisera cette variable pour updater la collection member)
												
			if(member_knows_name)
			{	
				do_this_collection_member = {"$set": {"id_name_switch_pass.$.switch_pass":switch_pass}};
			}
			else
			{
				query_update_member = query_update_member_simple; //  Pour cette requete, l'update member est égal à l'update member simple		
				do_this_collection_member = {$push: {id_name_switch_pass : {_id: id, switch_pass:switch_pass, forename: forename, name: name, t_forename: t_forename, t_name: t_name}}};		
			}
			refresh_data_type_login="login"; // On attribue aussi les variables de refresh
			refresh_data_type_name="name";
			refresh_id_login=id_autor;
			refresh_id_name=id;
												
			if(up_rank == 1)
			{ // s'il s'agit d'un up_rank
				do_this = {$push: {font: font, date: date, id_autor: id_autor}, $inc:{up_rank: up_rank, down_rank: down_rank}};
											
			}
			else if(down_rank == 1)
			{ // s'il s'agit d'un down_rank											
				do_this = {$inc:{up_rank: up_rank, down_rank: down_rank}};											
			} 
					
			var name_update = name_data_to_update.update(query, do_this, function(err)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					if(do_this_collection_member != 0)
					{ // si cette variable est differente de 0 on update la collection member
						var member_update = member_data_to_update.update(query_update_member, do_this_collection_member, function(err)
						{ // on enregistre l'id du nom ajouté dans les données de l'utilisateur à l'intérieur de la collection member
							if(err)
							{
								console.log(err);
							}
							else
							{
								Refresh_data(refresh_data_type_login, refresh_data_type_name, refresh_id_login, refresh_id_name, socket);																	
							}	
											
						});		
					}
				}	
										
			});	
		}
		else
		{	
			var new_name = new name_data_to_add({ forename: forename, name: name, t_forename: t_forename, t_name: t_name, font: [font], date: [date], up_rank:1, down_rank:0, id_autor: [id_autor], validation_taxe_date: []});
			// On le sauvegarde dans MongoDB !
			new_name.save(function (err) 
			{
				if (err) 
				{ 
					throw err;
				}
				console.log("NNEWWWW "+forename+" "+name+" "+t_forename+" "+t_name);
				do_this_collection_member = {$push: {id_name_switch_pass : {_id: new_name._id, switch_pass:switch_pass, forename: forename, name: name, t_forename: t_forename, t_name: t_name}}};
				refresh_data_type_login="login";
				refresh_data_type_name="name";
				refresh_id_login=id_autor; 
				refresh_id_name=new_name._id;
				var member_update = member_data_to_update.update(query_update_member_simple, do_this_collection_member, function(err)
				{ // on enregistre l'id du nom ajouté dans les données de l'utilisateur à l'intérieur de la collection member
					if(err)
					{
						console.log(err);
					}
					else
					{
						Refresh_data(refresh_data_type_login, refresh_data_type_name, refresh_id_login, refresh_id_name, socket);
						// On se déconnecte de MongoDB maintenant
					}	
										
				});		
									  
									  
				socket.emit('message', forename + ' ' + name + ' ajouté avec succès !');
									  
									  
									  
									  
			});		

		}
				
				
			
	});
				
				
				
	socket.on('get_name_data', function(get_name_data) 
	{

		var forename = get_name_data.forename;
		var name = get_name_data.name;
		var t_forename = get_name_data.t_forename;
		var t_name = get_name_data.t_name;
	  
		console.log("lets get name !")					  
								
		name_data_to_get.find({ forename: forename, name: name, t_forename: t_forename, t_name: t_name}).lean().exec(function(err, docs) 
		{	  				
			// On se déconnecte de MongoDB maintenant
			if (err) return console.error(err);
			var first_name_insert = false;	
										
			if(!docs.length)
			{
				docs = [{'forename': forename, 'name':name, 't_forename': t_forename, 't_name':t_name, 'validation_taxe_date':[]}];
				first_name_insert = true;
				socket.emit('get_name_data', docs, first_name_insert); 
			}
			else
			{
				if(docs[0]['down_rank'] == 0)
				{
					docs[0]['down_rank'] = 1;
				}
				var count_rank = (docs[0]['up_rank']) / (docs[0]['down_rank']);

				socket.emit('get_name_data', docs, first_name_insert, count_rank); 
			}							
		});
		  
	});		


	//ENVOI DE THESE
	
	socket.on("signal_staff_new_these",  function(login) {
		console.log("signal these will to sectredirection");
		io.to(sectredirection_socket_id).emit('signal_staff_new_these', "New these from "+login+".");
		console.log("signal these send to sectredirection");
	});
	

	socket.on('position_and_enemies_position', function(my_login, my_lat_and_lng, my_enemies_positions, unite_name, id_target) {
		socket.broadcast.emit('get_position_and_enemies_position', my_login, my_lat_and_lng, my_enemies_positions, unite_name, id_target);

	});		

	socket.on('my_position', function(my_login, my_lat_and_lng, unite_name, id_target) {
		console.log("okay so 0");
		socket.broadcast.emit('get_position_ally', my_login, my_lat_and_lng, unite_name, id_target);
		console.log("okay so 1");

	});		
	
	socket.on('polylines_from_ally', function(ally_name, polylines_coordinates_from_ally, unite_name, id_target) {
		console.log("polyline nice !");
		socket.broadcast.emit('polylines_from_ally', ally_name, polylines_coordinates_from_ally, unite_name, id_target);
 
	});				
	/*		
	socket.on('send_my_unite_name', function(unite_name, login) {
		var this_unite_name = unite_name;
		var this_login = login;
		socket.broadcast.emit('get_my_unite_name', this_unite_name, this_login);
 
	});				
	*/
							   
	socket.on('change_name_enemy', function(ancien_name, new_name, unite_name, id_target) {
		socket.broadcast.emit('get_change_name_enemy', ancien_name, new_name, unite_name, id_target);
	});														  
									  
	socket.on('disconnection_ally', function(name_ally, unite_name, id_target) {
		socket.broadcast.emit('get_disconnection_ally', name_ally, unite_name, id_target);
	});	

	socket.on('validation_taxe', function(validation_taxe, ally_name, unite_name, id_target) {
		socket.broadcast.emit('validation_taxe', validation_taxe, ally_name, unite_name, id_target);
	});		

	
	socket.on('store_validation_in_database', function(id_target, date, id_autor) {
		
		
		console.log("lets search validation_taxe 0");	
		var query = { _id : id_target};
		var do_this = {$push: {validation_taxe_date : date}};	
	  
		console.log("lets get name !")					  
								
		name_data_to_get.find({ _id: id_target}).lean().exec(function(err, docs) 
		{	 
			console.log("GOT name !")		
			var array_validation_taxe_date = docs[0].validation_taxe_date;
			var array_validation_taxe_date_length = array_validation_taxe_date.length;
			var i
			console.log("array_validation_taxe_date_length : "+array_validation_taxe_date_length);
			if(array_validation_taxe_date_length>0)
			{
				for(i=0; i<array_validation_taxe_date_length; i++)
				{
					console.log("array_validation_taxe_date[i] :"+ array_validation_taxe_date[i].substring(0,10)); //pourquoi des substring ? on enlève les heures min et secondes car on ne veut comparer que les jours 
					console.log("date :"+date.substring(0,10));
					if(array_validation_taxe_date[i].substring(0,10) == date.substring(0,10))
					{
						console.log("found so no validation!");
					}
					else if(i==array_validation_taxe_date_length-1)
					{
						console.log("not found so validation");
						name_data_to_update.update(query, do_this, function(err) {
					
							console.log("lets search validation_taxe 1");
						
							var refresh_data_type_login="login";
							var refresh_data_type_name="name";
							var refresh_id_login=id_autor; 
							var refresh_id_name=id_target;
							socket.broadcast.emit("validation_taxe_done");
							Refresh_data(refresh_data_type_login, refresh_data_type_name, refresh_id_login, refresh_id_name, socket);
							
						});						
						
						
						
					}console.log("end of each loop!");
				}
			}
			else
			{
				name_data_to_update.update(query, do_this, function(err) {
					
					console.log("lets search validation_taxe 1");
								
					var refresh_data_type_login="login";
					var refresh_data_type_name="name";
					var refresh_id_login=id_autor; 
					var refresh_id_name=id_target;
					socket.broadcast.emit("validation_taxe_done");
					Refresh_data(refresh_data_type_login, refresh_data_type_name, refresh_id_login, refresh_id_name, socket);
				});						
			}
				
		});
	});
});


});


























// POUR LA VERSION OFFICIELLE DONNEE PAR BLUEMIX
/*

http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
	console.log('Express server listening on port ' + app.get('port'));
});
*/


//POUR VERSION LOCALE
/*
server.listen(3000, function () {

  console.log('Connected');

});
*/
// POUR VERSION PRODUCTION

server.listen(port, host);

