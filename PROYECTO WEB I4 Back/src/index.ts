import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.route';
import productRoutes from './routes/product.route';
import orderRoutes from './routes/order.route';
import rolRoutes from './routes/rol.route';
import connectDB from './Configuracion/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // ✅ Aquí debe ir products
app.use('/api/orders', orderRoutes);     // ✅ Aquí van las órdenes
app.use('/api/roles', rolRoutes);        // ✅ Aquí van los roles


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
