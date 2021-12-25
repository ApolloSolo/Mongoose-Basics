const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp')
    .then(() => {
        console.log("Connection Open")
    })
    .catch((e) => {
        console.log("Error Dude")
        console.log(e)
    })

const personSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
})

//On the personSchema, define a vertual and give it a name. Then define getter or setter
personSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`
})

//Middleware
personSchema.pre('save', async function () {
    this.firstName = "Yo";
    this.lastName = "Mama";
    console.log('About to Save');
})

personSchema.post('save', async function () {
    console.log('Just Saved');
})

const Person = mongoose.model('Person', personSchema);

const apollo = new Person({ firstName: "Apollo", lastName: "Solo"});
apollo.save(); //will add to mongo

console.log(apollo.fullName);

