const express = require("express");
const bodyParser =require("body-parser");
const cors = require("cors");
const userlogin = require("./routes/Login");
const usersignup = require("./routes/Signup");
const authorize = require("./routes/authorization");
const Shop = require('./routes/Shop');
const Saller = require('./routes/Saller');
const createError = require("http-error");
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
require("dotenv").config;



const app = express();
const port = process.env.PORT || 3000 ; 

app.use((err, req, res, next) => {
  console.log(err);
 err.statusCode = err.statusCode || 500;
 err.message = err.message || "Internal Server Error";
 res.status(err.statusCode).json({
   message: err.message,
 });
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/Login',userlogin);
app.use('/Signup',usersignup);
app.use('/Auth',authorize);
app.use('/saller',Saller);
app.use('/shop',Shop);

Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});

User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {
    through: CartItem
});
Product.belongsToMany(Cart, {
    through: CartItem
});

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
    through: OrderItem
});
Product.belongsToMany(Order, {
    through: OrderItem
});

sequelize.sync({force: false });

app.listen(port, ()=> console.log(`server is running on port ${port}`))