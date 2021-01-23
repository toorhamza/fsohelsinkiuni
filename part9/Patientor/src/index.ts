import express from 'express';
import apiRoutes from './routes/api';
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());
app.use('/api', apiRoutes);


const PORT = 3001;



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});