/* eslint-disable no-constant-condition */
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to database')

mongoose.connect(url)
    .then(() => {
        console.log('connection established')
    })
    .catch((error) => {
        console.log('error occured while connecting:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: function numFormat(n) {
                if (/\d{2}-/){
                    return /\d{2}-/.test(n)
                }
                else if (/\d{3}-/) {
                    return /\d{3}-/.test(n)
                }
            },
            message: 'Invalid number format, needs xx- or xxx- at start'
        }
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)