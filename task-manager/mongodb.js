//CRUD Operations

const { MongoClient, ObjectID } = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error){
        console.log('unable to connect to database!')
    }

    const db = client.db(databaseName)

    db.collection('users').updateOne({
        _id: new ObjectID("5eb0f808eb16e8292c28529e")
    }, {
        $inc: {
            age: 1
        }
    }).then( (result) => {
        console.log(result)
    }).catch( (error) => {
        console.log(error)
    })
})
