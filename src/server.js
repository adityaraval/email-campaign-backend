require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const uri = process.env.DB_URL;
const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require('./models')(mongoose);
require('./routes/index')(app);

//register the tasks
const tasks = require('./utils/tasks');
tasks.connect(tasks.agenda);

const main = async () => {
  try {
    await mongoose.connect(uri, {
      keepAlive: 120,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (err) {
    console.log(err);
  }
};

main();