const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.0:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const me = new User({
    name: 'Sarah',
    age: 33
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error: ' + error)
})