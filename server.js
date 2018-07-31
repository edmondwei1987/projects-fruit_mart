var express=require('express');
var app=express();
var passwordHash = require('password-hash');
var bodyParser=require('body-parser');
var path=require('path');
var session=require('express-session');
var fileUpload = require('express-fileupload');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/public/dist')));
app.use(session({secret:'fruitfan'}));
app.use(fileUpload());
//mongoose-start
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codingdojo');
var Schema=mongoose.Schema;
var UserSchema=new mongoose.Schema({
    fruits:[{type:Schema.Types.ObjectId,ref:'Fruit'}],
    username:{type:String,minLength:4,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:Number},   
}, {timestamps: true });
var FruitSchema=new mongoose.Schema({
    _user:{type:Schema.Types.ObjectId,ref:'User'},
    name:{type:String,minLength:3,required:true},
    description:{type:String,required:true},
    picture:{type:String,required:true},
    price:{type:Number,required:true},
    unit:{type:String,required:true},
    pickTimeFrom:{type:String,required:true},
    pickTimeTo:{type:String,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    zipcode:{type:String,required:true},
    pickupUserId:{type:String},
}, {timestamps: true });
mongoose.model('User',UserSchema);
mongoose.model('Fruit',FruitSchema);
var User=mongoose.model('User');
var Fruit=mongoose.model('Fruit');

//mongoose-end
app.post('/api/users',(req,res)=>{
    let user=new User();
    user.email=req.body.email;
    user.username=req.body.username;
    user.password=passwordHash.generate(req.body.password);
    user.save(err=>{
        // console.log('saving user')
        if(err){
            var errors=[];
            for(var key in user.errors){
               errors.push(user.errors[key].message)
            }
            res.json({'errors':errors});
        }else{
            // console.log('saving user succeed')
            res.json(user);
        }
    });
})
app.post('/api/login',(req,res)=>{
    User.findOne({username:req.body.username},(err,user)=>{
        console.log(user);
        if(err){
            res.json(err);
        }else if(user){
            if(passwordHash.verify(req.body.password,user.password)){
                req.session.userid=user.id;
                res.json(user);
            }else{
                res.json({msg:"wrong password"});
            }
        }else{
            res.json({msg:"wrong username"});
        }
    })
})
app.get('/api/fruitlist',(req,res)=>{
    User.findById(req.session.userid,(err,user)=>{
        if(user){
            Fruit.find({_user:{$ne:user.id}},(err,fruits)=>{
                res.json(fruits);
            })
        }else{
            res.json({error:'unauthorized user'});
        }
    })
})
app.get('/api/logout',(req,res)=>{
    req.session.destroy(function(err) {
        // cannot access session here
        res.json({logout:true});
    })
})
app.get('/api/user',(req,res)=>{
    User.findById(req.session.userid,(err,user)=>{
        // console.log(user)
        if(user){
            res.json(user);
        }else{
            res.json({error:'unauthorized user'});
        }
    })
})
app.patch('/api/user/:id',(req,res)=>{
    // console.log(req.params.id)
    // console.log(req.body)
    User.findById(req.params.id,(err,user)=>{
        if(user){
            user.username=req.body.username;
            user.email=req.body.email;
            user.phone=req.body.phone;
            user.save(function(err){
                // console.log(user);
                res.json(user);
            })
        }else{
            res.json({error:'unauthorized user'});            
        }
    })
})
app.post('/api/fruits',(req,res)=>{
    User.findById(req.session.userid,(err,user)=>{
        if(user){
            // console.log('saving fruit');
            var fruit=new Fruit(req.body);
            fruit.picture='assets/img/avocado.jpg';
            fruit._user=user._id;
            user.fruits.push(fruit);
            // console.log(fruit);
            fruit.save((err)=>{
                // console.log(err);
                if(err){
                    var errors=[];
                    for(var key in fruit.errors){
                        errors.push(fruit.errors[key].message)
                    }
                    res.json({error:errors});
                }else{
                    user.save();
                    res.json(fruit);
                }
            })
        }else{
            res.json({error:'unauthorized user'});
        }
    })
})
app.post('/upload/:id',(req,res)=>{
    var picture=req.files.picture;
    var pictureName=picture.name;
    var suffix=pictureName.slice(pictureName.lastIndexOf("."),pictureName.length);
    picture.mv('./public/src/assets/upload/'+req.params.id+suffix,err=>{
        picture.mv('./public/dist/assets/upload/'+req.params.id+suffix,err=>{
            if(err){
                res.json({error:'upload failed'});
            }else{
                Fruit.findById(req.params.id,(err,fruit)=>{
                    fruit.picture='assets/upload/'+req.params.id+suffix;
                    fruit.save();
                })
                res.json('upload success');
            }
        })
    })
})
app.get('/api/myfruits',(req,res)=>{
    Fruit.find({_user:req.session.userid},(err,fruits)=>{
        console.log(fruits);
        res.json(fruits);
    })
    // User.findOne({_id:req.session.userid}).populate('fruit').exec((err,user)=>{
    //     // console.log(user);
    //     var fruits=[]
    //     for(var i=0;i<user.fruits.length;i++){
    //         Fruit.findById(user.fruits[i],(err,fruit)=>{
    //             fruits.push(fruit);
    //         })
    //     }
    //     console.log(user.fruits);
    //     res.json(user.fruits);
    // })
    // User.findById(req.session.userid,(err,user)=>{
    //     if(err){
    //         res.json({error:'unauthorized user'})
    //     }else{
    //         User.find({}).populate('fruit')
    //         Message.find({}).populate('comments').exec(function(err,messages){
    //             // console.log(posts[0].comments[0].name);
    //             return res.render('messageBoard',{messages:messages});
    //           });
    //         Fruit.find({user:user},(err,fruits)=>{
    //             console.log(fruits);
    //             res.json(fruits);
    //         });
    //     }
    // })

})

app.get('/api/fruitlist/:zipcode',(req,res)=>{
    User.findById(req.session.userid,(err,user)=>{
        if(user){
            Fruit.find({_user:{$ne:user.id},zipcode:req.params.zipcode},(err,fruits)=>{
                res.json(fruits);
            })
        }else{
            res.json({error:'unauthorized user'});
        }
    })
})
app.patch('/api/fruits',(req,res)=>{
    // Fruit.find({_id:req.body._id},(err,fruit)=>{
    //     console.log('reqbody------------');
    //     console.log(req.body);
    //     console.log('reqfruit------------');
    //     console.log(fruit);

    //     fruit.name=req.body.name;
    //     fruit.price=req.body.price;
    //     fruit.unit=req.body.unit;
    //     fruit.description=req.body.description;
    //     fruit.save((err,updateFruit)=>{
    //     });
    // })
    Fruit.update({_id:req.body._id},{$set:{name:req.body.name,price:req.body.price,unit:req.body.unit,description:req.body.description}},(err,fruit)=>{
        if(err){
            res.json({errors:fruit.errors});
        }else{
            res.json('save fruit success');
        }
    })
})
app.delete("/api/fruits/:id",(req,res)=>{
    Fruit.remove({_id:req.params.id},(err)=>{
        if(err){
            res.json("failed");
        }else{
            res.json("success"); 
        }
    })
})
app.post("/api/confirmpickup",(req,res)=>{
    Fruit.findById(req.body.fruit_id,(err,fruit)=>{
        fruit.pickupUserId=req.session.userid;
        fruit.save(err=>{
            if(err){
                res.json({error:fruit.errors});
            }else{
                res.json('save success');
            }
        });
    })
})
app.get("/api/pickupfruits",(req,res)=>{
    Fruit.find({pickupUserId:req.session.userid},(err,fruits)=>{
        if(err){
            res.json({error:fruits.error});
        }else{
            res.json(fruits);
        }
    });
})


app.all('*',(req,res,next)=>{
    res.sendFile(path.resolve('./public/dist/index.html'));
});
app.listen(8000,()=>{
    console.log('listen on port 8000');
});