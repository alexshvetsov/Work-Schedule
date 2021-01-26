import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import submittedShiftsRoutes from './routes/submittedShiftsRoutes.js';
import dateDaysRoutes from './routes/dateDaysRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();    

connectDB();

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/submittedshifts', submittedShiftsRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/datedays', dateDaysRoutes);

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/fronted/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname), 'fronted', 'build', 'index.html'))
} else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}


app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('Server running in ' + process.env.NODE_ENV + ' mode on port ' + PORT))  