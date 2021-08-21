import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import config from 'config';
import db from './database';
import routes from './routes';

const app = express();
const PORT = config.get('PORT') as number;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static(__dirname + '/public'));
app.use(routes);

const start = async () => {
  try {
    await db();
    app.listen(PORT, () => {
      console.log(`The application is listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
