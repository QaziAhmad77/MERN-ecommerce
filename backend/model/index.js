const mongoose = require("mongoose");

module.exports = {
  connectDB: async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Database connection established");
    } catch (e) {
      console.log("Error while connecting to Mongo", e);
    }
  },
};

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("Database connection established");
//   } catch (e) {
//     console.log("Error while connecting to Mongo", e);
//   }
// };

// module.exports = connectDB;

// mongoose
//     .connect(process.env.MONGODB_URL)
//     .then(() => {
//       console.log("Connection to database successfully");
//     })
//     .catch((e) => {
//       console.log("Error while connecting to Mongo");
//     });
