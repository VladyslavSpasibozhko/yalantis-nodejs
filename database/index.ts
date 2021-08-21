import mongoose from 'mongoose';
import config from 'config';

const password = config.get('DB_PASSWORD');
const username = config.get('DB_USERNAME');

const connect = async () => {
  await mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.sj7tv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  );
};

export default connect;
