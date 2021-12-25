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

// Dedining our own Instance Methods
//Define a .greet method
productSchema.methods.greet = function (p) {
    console.log(`Hi there from ${p.name}`); 
    //.this.name points to the instance name we run .greet on. { name: } is a schema parameter 
}

//A method to toggle sale items
productSchema.methods.toggleOnSale = function (){
    this.onSale = !this.onSale; //toggles the sale true/false
    return this.save(); //.save is then-able (async) so we use await on foundProd
}

//A method that adds category
productSchema.methods.addCategory = function (newCat) {
    this.catigories.push(newCat);
    this.save();
}

//pass in name of product as prod arrgument
const makeSale = async (prod) => {
    const foundProd = await Product.findOne({ name: `${prod}` });
    console.log(foundProd);
    await foundProd.toggleOnSale(); //we await for this.save() to resolve because it is an async
    console.log(foundProd);
}

// Static Methods

productSchema.statics.fireSale = function () {
    return this.updateMany({}, {onSale: true, price: 1.99});
}

//Product Model
const Product = mongoose.model('Product', productSchema);


//pass in product name as prod arrgument
const findProduct = async (prod) => {
    const foundProd = await Product.findOne({ name: `${prod}` });
    foundProd.greet(prod);
    //.this from .greet points to foundProduct const, which holds results of await
    console.log(foundProd); //-before toggleOnSale
    await foundProd.toggleOnSale();
    await foundProd.addCategory("Outdoors");
    console.log(foundProd);
}

Product.fireSale().then(res => console.log(res));
//findProduct('Bike Helmet');
//makeSale('Bike Helmet');


/*
 const bike = new Product ({
     name: 'Tire Pump',
     price: 19.95
 })
 bike.save()
 .then(data => {
     console.log('It Worked');
     console.log(data);
 })
 .catch(err => {
     console.log('Error occured!');
     console.log(err);
 })


 Product.findOneAndUpdate({name: 'Tire Pump'}, {price: 100}, {new: true})
 .then(data => {
     console.log('It Worked');
     console.log(data);
 })
 .catch(err => {
     console.log('Error occured!');
     console.log(err);
 })
*/