const mongoose = require("mongoose");

// function defining
const bookingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true        
    },
    destination: {
        type: String,
        required: true       
    },
    bookedDate: {
        type: Date  ,
         required: true         
    },
    bookingStatus: {
        type: String,
        required: true,
        enum: ['Confirmed','Not confirmed', 'Completed']
    }
});

const Booking = new mongoose.model("booking", bookingSchema);
module.exports = Booking;