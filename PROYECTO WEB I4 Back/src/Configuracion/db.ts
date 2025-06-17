import mongoose from "mongoose";

const mongoUri="mongodb://0.0.0.0:27017/proyecto?authSource=admin";
const connectDB=async (): Promise<void> => {
    try {
        await mongoose.connect(mongoUri);
    console.log("Conexion a mongo")
    } catch (error) {
        console.log("Error de conexión: ", error);
    }
}
export default connectDB;