// Import Swagger Options
const swagger = require('./config/swagger')

// Register Swagger

const fastify = require('fastify')({
    logger: true
});
const mongoose = require('mongoose');

var uri = "mongodb://gusanchedev:P3mbroke11#@clusterjs-shard-00-00.bo47k.mongodb.net:27017,clusterjs-shard-00-01.bo47k.mongodb.net:27017,clusterjs-shard-00-02.bo47k.mongodb.net:27017/fastify-api?ssl=true&replicaSet=atlas-wpz0mp-shard-0&authSource=admin&retryWrites=true&w=majority";
const routes = require('./routes');

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