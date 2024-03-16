
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const shopRoutes = require('./routes/shop.routes')
const productRoutes = require('./routes/product.routes')
const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));




mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.get('/', (req, res) => {
  res.json({
    message: 'MileOne API Running'
 
  })
});

app.use('/auth', authRoutes);
app.use("/shop",shopRoutes)
app.use('/products',productRoutes)
app.use((req, res, next) => {
    console.log("\x1b[31mRequest Date:", new Date());
    console.log("\x1b[34mRequest Origin:", req.headers.origin);
    console.log("\x1b[32mRequest IP:", req.ip);
    console.log("\x1b[33mRequest Method:", req.method);
    console.log("\x1b[35mRequest URL:", req.url);
    console.log("\x1b[36mBody Length:", req.body ? req.body.length : 0);
    console.log("\x1b[0m");
    console.log('\n')
    next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
