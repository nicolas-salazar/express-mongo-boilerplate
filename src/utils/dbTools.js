const mongodb = require('mongodb');

const getDbInstance = () => new Promise((resolve, reject) => {
  mongodb.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        reject(err);
        return;
      }

      const dbInstance = client.db();
      const closeConnection = () => client.close();

      resolve({
        dbInstance,
        closeConnection,
      });
    }
  );
});

module.exports = {
  getDbInstance,
};
