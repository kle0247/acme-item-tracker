const { conn, User, Thing } = require('./db');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use('/dist', express.static('dist'));
app.use('/public', express.static('assets'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));


app.post('/api/things', async(req, res, next)=> {
  try {
    res.status(201).send(await Thing.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/things', async(req, res, next)=> {
  try {
    res.send(await Thing.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/things/:id', async(req,res,next)=> {
  try{
    const thing = await Thing.findByPk(req.params.id);
    thing.update(req.body);
    res.send(thing);
  }
  catch(ex){
    next(ex)
  }
})

app.delete('/api/things/:id', async(req, res, next) => {
  try{
    const thing = await Thing.findByPk(req.params.id);
    thing.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex)
  }
})

app.post('/api/users', async(req, res, next) => {
  try{
    const user = await User.create(req.body);
    res.status(201).send(user);
  }
  catch(ex){
    next(ex)
  }
})

app.get('/api/users', async(req, res, next)=> {
  try {
    res.send(await User.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/users/:id', async(req, res, next) => {
  try{
    const user = await User.findByPk(req.params.id);
    user.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex)
  }
})


const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));

const init = async()=> {
  try {
    await conn.sync({ force: true });
    const [moe, larry, lucy, ethyl] = await Promise.all(
      ['moe', 'larry', 'lucy', 'ethyl'].map( name => User.create({ name }))
    );

    Thing.create({name: 'foo', userId: moe.id});
    Thing.create({name: 'bar', userId: larry.id});
    Thing.create({name: 'bazz', userId: lucy.id});
    Thing.create({name: 'quq', userId: moe.id});
    Thing.create({name: 'fizz'});
    
  }
  catch(ex){
    console.log(ex);
  }
};

init();
