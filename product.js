const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp')
    .then(() => {
        console.log("Connection Open")
    })
    .catch((e) => {
        console.log("Error Dude")
        console.log(e)
    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    onSale: {
        type: Boolean,
        default: false
    },
    catigories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    }
})

const Product = mongoose.model('Product', productSchema);

// const bike = new Product ({
//     name: 'Tire Pump',
//     price: 19.95
// })
// bike.save()
// .then(data => {
//     console.log('It Worked');
//     console.log(data);
// })
// .catch(err => {
//     console.log('Error occured!');
//     console.log(err);
// })


Product.findOneAndUpdate({name: 'Tire Pump'}, {price: 100}, {new: true})
.then(data => {
    console.log('It Worked');
    console.log(data);
})
.catch(err => {
    console.log('Error occured!');
    console.log(err);
})