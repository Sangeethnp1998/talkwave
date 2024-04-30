const express = require('express');
require('colors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { chats } = require('./common/data/data');
const connectDB = require('./common/config/db');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { errorHandler, ResourceNotFound } = require('./middlewares/errorHandler');
const cors = require('cors')

dotenv.config();
connectDB()
const app = express();
const PORT =  process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("API Running!");
// });

// Allow requests from all origins
app.use(cors());

app.use(express.json())

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)

// app.use(errorHandler);
app.use(ResourceNotFound);

app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}`.yellow.bold)
  );