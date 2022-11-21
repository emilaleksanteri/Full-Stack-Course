require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))

// turns request body into a morgan token by making the JS object into a JSON string
morgan.token('posted', function (req) {return JSON.stringify(req.body)})

// log of what backend does, status, etc... If POST used, displayes conent of request
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :posted'))

app.use(express.json())

// Get all persons
app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
        .catch(error => next(error))
})

// info page
app.get('/info', (request, response, next) => {

    Person.find({}).then(person => {
        const lenght = person.length
        const time = new Date()
        response.send(
            `<p>Phonebook has info for ${lenght} people</p>
            <p>${time}</p>`
        )
    })
        .catch(error => next(error))
})

// One person
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
        .catch(error => next(error))
})

// delete person
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// add new person
app.post('/api/persons', (request,response, next) => {
    const body = request.body

    // creates a new person object, with the use of the person schema
    const person = new Person({
        name: body.name,
        number: body.number,
    })

    // save to db
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    // put request data into one variable
    const body = request.body

    // object created from put data
    const person = {
        name: body.name,
        number: body.number,
    }

    // finding existing object in db based on id
    // if found, update number field with new number
    Person.findByIdAndUpdate(request.params.id, person,
        { new: body.number, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

// for error handling
const errorHandler = (error, request, response, next) => {
    // displayes error message on console
    console.error(error.message)

    // error handling event from incorrect id call
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})