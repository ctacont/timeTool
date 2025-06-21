const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');

async function createUser() {
  await mongoose.connect('mongodb://localhost:27017/timeTool');
  const hash = await bcrypt.hash('test', 10); // Passwort: test
  await User.create({
    username: 'test',
    password: hash,
    vorname: 'Hasan',
    nachname: 'Yüksel'
  });
  console.log('User erstellt!');
  process.exit();
}

createUser();