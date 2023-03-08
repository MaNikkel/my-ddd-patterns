import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })


  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const response = await request(app).post("/customer").send({
      name: 'John Doe',
      address: {
        street: 'street',
        number: 123,
        zip: '123',
        city: 'city',
      }
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('John Doe')
    expect(response.body.address.city).toBe('city')
    expect(response.body.address.number).toBe(123)
    expect(response.body.address.street).toBe('street')
    expect(response.body.address.zip).toBe('123')
  })

  it('should not create a customer', async () => {
    const response = await request(app).post("/customer").send({
      name: 'John Doe',
    })

    expect(response.status).toBe(500)
  })
})