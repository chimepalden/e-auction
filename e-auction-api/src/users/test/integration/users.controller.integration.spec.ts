import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { AppModule } from '../../../app.module';
import { DatabaseService } from '../../../database/database.service';
import { userStub } from '../stubs/user.stub';
import * as request from 'supertest';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

describe('UsersController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    dbConnection = module.get<DatabaseService>(DatabaseService).getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('users').deleteMany({});
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      await dbConnection.collection('users').insertOne(userStub());
      const response = await request(httpServer).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([userStub()]);
    }, 3000);
  });

  describe('create', () => {
    it('It should create a user', async () => {
      let createUser: CreateUserDto = {
        userId: userStub().userId,
        firstName: userStub().firstName,
        lastName: userStub().lastName,
        address: userStub().address,
        phone: userStub().phone,
        email: userStub().email,
        password: userStub().password,
      };
      const response = await request(httpServer)
        .post('/users')
        .send(createUser);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        ...response.body,
        address: createUser.address,
      });

      const user = await dbConnection
        .collection('users')
        .findOne({ email: createUser.email });
      expect(user.address).toMatchObject(createUser.address);
    });
  });

  describe('update', () => {
    it('It should update a user', async () => {
      let updateUser: UpdateUserDto = {
        lastName: 'Tashi',
      };
      await dbConnection.collection('users').insertOne(userStub());
      const response = await request(httpServer)
        .patch(`/users/${userStub().userId}`)
        .send(updateUser);

      expect(response.ok);
      expect(response.body.lastName).toEqual('Tashi');
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      await dbConnection.collection('users').insertOne(userStub());
      const response = await request(httpServer)
        .get('/users')
        .query({ id: userStub().userId });

      expect(response.status).toBe(200);
      expect(response.body[0].password).toEqual(userStub().password);
    });
  });

  describe('findByEmail', () => {
    it('should return a user', async () => {
      await dbConnection.collection('users').insertOne(userStub());
      const response = await request(httpServer)
        .get('/users')
        .query({ email: userStub().email });

      expect(response.status).toBe(200);
      expect(response.body[0].userId).toEqual(userStub().userId);
    });
  });

  describe('remove', () => {
    it('should return the user removed', async () => {
      await dbConnection.collection('users').insertOne(userStub());
      const response = await request(httpServer).delete(
        `/users/${userStub().userId}`,
      );

      expect(response.ok);
      expect(response.body).toMatchObject(userStub());
    });
  });
});
