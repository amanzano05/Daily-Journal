//module needed
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//initialize express
const app = express();

//set ejs
app.set('view engine', 'ejs');

//set bodyParser
app.use(bodyParser.urlencoded({extended: true}));
//create shared folder for resources
app.use(express.static("public"));

//array used for all the posts
let posts=[];
//route home
app.get('/', (reqHome, resHome)=>{
  //render homepage with content
  resHome.render('home', {homeContent: homeStartingContent, entries: posts});

});

//route contact
app.get('/contact', (reqAbout, resAbout)=>{
  resAbout.render('contact', {contactContent: contactContent});
});

//route about
app.get('/about', (reqAbout, resAbout)=>{
  resAbout.render('about', {aboutContent: aboutContent});
})

//route Compose
app.get('/compose', (reqCompose, resCompose)=>{
  resCompose.render('compose');
})

//route for compose post
app.post('/compose',(reqCompose, resCompose)=>{
  const post ={
    title: reqCompose.body.entryTitle,
    body: reqCompose.body.entryText
  };
  posts.push(post);
  resCompose.redirect('/');
})


//posts route

app.get('/posts/:title', (req, res)=>{
  const requestedTitle = _.lowerCase(req.params.title);
  posts.forEach(post=>{
    const storeTitle = _.lowerCase(post.title)
    if (storeTitle === requestedTitle){
      res.render('post', {title: post.title, body: post.body});
      console.log(post);
    }
  });
  res.render('post', {title: 'Not Found', body: ''});


});


//initialize express server
const port = 3000;
app.listen(process.env.PORT || port, ()=> {
  console.log("Server started on port "+port);
});
