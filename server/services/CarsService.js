import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"

class CarsService {
  async deleteCar(carId, userInfo) {

    const car = await this.getCar(carId)
    if (userInfo.id != car.sellerId.toString()) {
      throw new Forbidden("That's not your car!")
    }
    await dbContext.Cars.findByIdAndDelete(car.id)

    return car

  }
  async getCar(carId) {
    const car = await dbContext.Cars.findById(carId)
    if (!car) { throw new BadRequest('Bad Id') }
    return car
  }
  async manufactureCar(formData) {
    const car = await dbContext.Cars.create(formData)
    return car
  }

  async getCars() {
    const cars = await dbContext.Cars.find()

    return cars
  }
  async editCar(carData, userInfo, carId) {
    const car = await this.getCar(carData.id || carId)

    if (userInfo.id != car.sellerId.toString()) {
      throw new Forbidden("That's not your car!")
    }
    car.make = carData.make || car.make
    car.model = carData.model || car.model
    car.year = carData.year || car.year
    car.price = carData.price || car.price
    car.description = carData.description || car.description
    car.make = carData.make || car.make
    car.imgUrl = carData.imgUrl || car.imgUrl

    await car.save()
    return car
  }
}

export const carsService = new CarsService()