const bcrypt = require('bcryptjs');
const Admin = require('./models/adminmodel');
const connectDB = require('./config/db'); 
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await connectDB(); 

    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingAdmin) {
      console.log("Admin already exists!");
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const adminUser = new Admin({
      name: 'Super Admin',
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    });

    await adminUser.save();
    console.log(" Admin user created successfully!");

  } catch (error) {
    console.error( "Error seeding admin user:", error);
    process.exit(1);
  }
};

seedAdmin();
