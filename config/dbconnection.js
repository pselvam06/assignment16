// config/dbconnection.js
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://pselvam1993:selvam93@ticketbooking.hoggvqw.mongodb.net/?retryWrites=true&w=majority&appName=TicketBooking";

const client = new MongoClient(uri, {
  ssl: true,
  tlsAllowInvalidCertificates: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected successfully");
    return client.db("flightBookingDB"); // your DB name
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
}

module.exports = connectDB;
