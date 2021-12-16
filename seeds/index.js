const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6188bba7fa35d3b8556469ad',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'lorem ipsum',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude,
                              cities[random1000].latitude
                            ]
            },
            images: [
            {
                url: 'https://res.cloudinary.com/dcoivth47/image/upload/v1637034102/YelpCamp/nvzcuu55vra17mikfpiv.jpg',
                filename: 'YelpCamp/e6hdki1fxkoihf7xmlfx' 
            },
            {
                url: 'https://res.cloudinary.com/dcoivth47/image/upload/v1637195146/YelpCamp/cmy9jjedrlfnzdv9ffy5.jpg',
                filename: 'YelpCamp/nvzcuu55vra17mikfpiv' 
            }
            ]
        })
        await camp.save();
    }
}

seedDB();
