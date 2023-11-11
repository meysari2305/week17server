const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ClientModel = require('./models/Client');
const UserModel = require('./models/Users');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/week17revou');

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  ClientModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json('succes');
      } else {
        res.json('the password incorrect');
      }
    } else {
      res.json('akun tidak terdaftar');
    }
  });
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.post('/register', (req, res) => {
  ClientModel.create(req.body)
    .then((client) => res.json(client))
    .catch((err) => res.json(err));
});

app.get('/', (req, res) =>
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err))
);

app.post('/createUser', (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.listen(3005, () => {
  console.log('server is running');
});
