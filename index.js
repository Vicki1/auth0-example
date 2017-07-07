const express= require('express')
const session=require('express-session')
const passport=require('passport');
const Auth0Strategy=require('passport-auth0');

let app=express();
//session
app.use(session({secret: 'some-random-string'}))
//passport initialize
app.use(passport.initialize())
//passport session
app.use(passport.session());


// this next step is super case-sensitive
//extraParams is to gather user info
//done works the same as next() in middleware;
passport.use(new Auth0Strategy({
  domain: 'victoriayorgesen.auth0.com',
  clientID: 'IjPIAoyu7vAtIfkz65vIVbi6xRq2Rgab',
  clientSecret: '-NgjgK7ecIX_raEwUKc4GYkSlcVQMJvCbf2p4HacZfObMGCSSiWExFXOCz7VkGp1',
  callbackURL: 'http://localhost:3000/auth/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    console.log(profile);
  return done(null, profile);
}));

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback',
passport.authenticate('auth0', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.get('/', function(req, res) {
  res.send('YAY!')
})

passport.serializeUser(function(user,done){
  done(null,user);
});

//deserializer decides what goes on req.user
passport.deserializeUser(function(obj,done){
  done(null,obj);
});

app.get('/me',function(req,res){
  res.send(req.user)
})

app.listen(3000)

