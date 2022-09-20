import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from '@bcwdev/auth0provider';

export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .get('', this.getCars)
      .get('/:carId', this.getCar)
      .use(Auth0Provider.getAuthorizedUserInfo) //MIDDLEWARE - Are you logged in?
      .delete('/:carId', this.deleteCar)
      .post('', this.manufactureCar)
      .put('/:id', this.editCar)
  }
  async getCars(req, res, next) {
    try {
      const cars = await carsService.getCars()
      res.send(cars)
    } catch (error) {
      next(error)
    }
  }
  async manufactureCar(req, res, next) {
    try {
      const formData = req.body
      formData.sellerId = req.userInfo.id
      const car = await carsService.manufactureCar(formData)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }
  async getCar(req, res, next) {
    try {
      const car = await carsService.getCar(req.params.carId)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }
  async deleteCar(req, res, next) {
    try {
      await carsService.deleteCar(req.params.carId, req.userInfo)
      res.send('Car Deleted')
    } catch (error) {
      next(error)
    }
  }
  async editCar(req, res, next) {
    try {
      const car = await carsService.editCar(req.body, req.userInfo, req.params.id)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }
}