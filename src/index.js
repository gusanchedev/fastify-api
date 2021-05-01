require('dotenv').config();

// Import Swagger Options
const swagger = require('./config/swagger')


const fastify = require('fastify')({
    logger: true
});
const mongoose = require('mongoose');

console.log(`URI: ${process.env.MONGODB_URI}`);

var uri = process.env.MONGODB_URI;

const routes = require('./routes');

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() => console.log('MongoDb connected'))
    .catch(error => console.log(error));


routes.forEach((route, index) => {
    fastify.route(route);
});

fastify.get('/', async (request, reply) => {
    return {hello: "world"};
})

const start = async () => {
    try {
        await fastify.listen(3000, '0.0.0.0');
        fastify.swagger()
        fastify.log.info(`Server listening on ${fastify.server.address().port}`)

    } catch (error) {
        fastify.log.error(err);
        process.exit(1);
    }
}



start();