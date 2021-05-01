const boom = require('boom');
const Car = require('../models/Car');

// Get all cars
exports.getCars = async (req, reply) => {
    try {
        const cars = await Car.find();
        return cars;

    } catch (error) {
        throw boom.boomify(error);
    }
}

//Get a single car by Id
exports.getSingleCar = async (req, reply) => {
    try {
        const id = req.params.id;
        const car = await Car.findById(id);
        return car;
    } catch (error) {
        throw boom.boomify(error);
    }
}

//Add a new car
exports.addCar = async (req, reply) => {
    try {
        const car = new Car(req.body);
        return car.save();
    } catch (error) {
        throw boom.boomify(error);
    }
}

exports.updateCar = async (req, reply) => {
    try {
        const id = req.params.id;
        const car = req.body;
        const{ ...updateData } = car;
        const update = await Car.findByIdAndUpdate(id, updateData, {new: true});
        return update;

    } catch (error) {
        throw boom.boomify(error);
    }
}

exports.deleteCar = async (req, reply) => {
    try {
        const id = req.params.id;
        const car = await Car.findByIdAndRemove(id)
        return car
    } catch (error) {
        throw boom.boomify(error);        
    }
}