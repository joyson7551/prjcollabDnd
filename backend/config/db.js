import mongoose from "mongoose";

const cnntDb = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Db connected"))
    .catch((err) => console.error(err));
};

export default cnntDb;
