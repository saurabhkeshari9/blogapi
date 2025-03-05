const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require("morgan");
const connectDB = require('./config/db');
const path = require("path");
const { swaggerUi, specs } = require('./swagger/swagger');

dotenv.config();
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to the Blog API');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/userauth', require('./routes/user/authroutes'));
app.use('/api/userpost', require('./routes/user/postroutes'));
app.use('/api/userfaqs', require('./routes/user/faqsroutes'));
app.use('/api/usercomments', require('./routes/user/commentroutes'));
app.use('/api/userpolicy', require('./routes/user/privacypolicy'));

app.use('/api/adminauth', require('./routes/admin/adminroutes'));
app.use('/api/adminposts', require('./routes/admin/adminpostroutes'));
app.use('/api/admincomments', require('./routes/admin/admincommentroutes'));
app.use('/api/adminfaqs', require('./routes/admin/faqsroutes'));
app.use('/api/adminprivacy', require('./routes/admin/privacypolicyroutes'))

app.listen(process.env.PORT, () => 
  console.log(`Server is running on port ${process.env.PORT}`)
);