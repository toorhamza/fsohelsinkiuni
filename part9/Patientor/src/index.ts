import express from 'express';
import apiRoutes from './routes/api';
var cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json());

const PORT = 3001;

app.use('/api', apiRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});