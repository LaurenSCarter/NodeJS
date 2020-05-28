const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// const me = new User({
//     name: '  Mary Kent  ',
//     password: '193938457',
//     email: '   asdlk@aslfj.com  ',
//     age: 18
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error: ' + error)
// })


// const Task = mongoose.model('Task', {
//     Description: {
//         type: String
//     },
//     Completed: {
//         type: Boolean
//     }
// })

// const task = new Task({
//     Description: 'Yoga',
//     Completed:  false
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log('Error: ' + error)
// })

