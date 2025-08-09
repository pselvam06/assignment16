const express = require("express");
const { ObjectId } = require("mongodb");
const connectDB = require("./config/dbconnection");

const app = express();
app.use(express.json());

const port = 8081;
let db;

// Connect to MongoDB and start server
connectDB()
  .then((database) => {
    db = database;

    // CREATE - Insert multiple bookings
    app.post("/insertBookings", async (req, res) => {
      try {
        const result = await db.collection("bookings").insertMany(req.body);
        res.status(201).json({
          message: "Bookings created successfully",
          insertedCount: result.insertedCount,
        });
      } catch (err) {
        res.status(400).json({ error: "Insert failed", details: err.message });
      }
    });

    //  READ - Get all bookings
    app.get("/allBookings", async (req, res) => {
      try {
        const bookings = await db.collection("bookings").find().toArray();
        res.status(200).json(bookings);
      } catch (err) {
        res.status(500).json({ error: "Fetch failed", details: err.message });
      }
    });

    //  READ - Get bookings with status "Not confirmed"
    app.get("/pendingBookings", async (req, res) => {
      try {
        const bookings = await db
          .collection("bookings")
          .find({ bookingStatus: "Not confirmed" })
          .toArray();
        res.status(200).json(bookings);
      } catch (err) {
        res.status(500).json({ error: "Fetch failed", details: err.message });
      }
    });

    //  UPDATE - Update all fields of a booking by ID
    app.put("/updateBooking/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updatedData = req.body;

        const result = await db
          .collection("bookings")
          .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({
          message: "Booking updated successfully",
          matchedCount: result.matchedCount,
          modifiedCount: result.modifiedCount,
        });
      } catch (err) {
        res.status(500).json({ error: "Update failed", details: err.message });
      }
    });

    //  DELETE - Delete all bookings with status "Completed"
    app.delete("/deleteCompleted", async (req, res) => {
      try {
        const result = await db
          .collection("bookings")
          .deleteMany({ bookingStatus: "Completed" });

        res.status(200).json({
          message: "Completed bookings deleted",
          deletedCount: result.deletedCount,
        });
      } catch (err) {
        res.status(500).json({ error: "Delete failed", details: err.message });
      }
    });

    //  Start server
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => console.error("❌ Failed to start server:", err.message));
