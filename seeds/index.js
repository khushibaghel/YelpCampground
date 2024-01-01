const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//Method to pick random element form array
const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0;i<200;i++)
    {
        const random1000 = Math.floor(Math.random()* 1000);
        const price = Math.floor(Math.random()* 20) +10;
        const camp = new Campground({
            author: '657c0cccd6e6d63461e04b82',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, eaque. Nobis, atque. Voluptate impedit aut ipsa veritatis unde non debitis harum rerum eligendi dignissimos nesciunt, in, natus reiciendis architecto tempora.',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
            },
            images: [
                // {
                //   url: 'https://res.cloudinary.com/dva2pg18p/image/upload/v1703179465/YelpCamp/mcesre4u6sliczafs7kn.jpg',
                //   filename: 'YelpCamp/mcesre4u6sliczafs7kn',
    
                // },
                {
                  url: 'https://res.cloudinary.com/dva2pg18p/image/upload/v1703179466/YelpCamp/zzdx66xz2ax6x1t13ak3.jpg',
                  filename: 'YelpCamp/zzdx66xz2ax6x1t13ak3',
    
                },
                {
                  url: 'https://res.cloudinary.com/dva2pg18p/image/upload/v1703179469/YelpCamp/cwtwad9tjublggubrhnb.jpg',
                  filename: 'YelpCamp/cwtwad9tjublggubrhnb',
                }
              ]
            
            
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
