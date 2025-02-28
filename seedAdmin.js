const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/adminmodel');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingAdmin) {
      console.log("Admin user already exists!");
      return;
    }

   
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

   
    const adminUser = new Admin({
      name: 'Super Admin',
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword, 
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();