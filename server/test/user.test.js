import chai from 'chai';
import { expect, assert } from 'chai';
import chaiSubset from 'chai-subset';
import request from 'supertest';
import app from '../index';
import { userOneId, userOne, setupDatabase } from './fixtures/db';
import User from '../models/user';

beforeEach(setupDatabase);

chai.use(chaiSubset);
describe("Testing User ", async function () {

    it('Should signup a new user', async () => {
        const response = await request(app).post('/user/signup').send({
            "name": "testUser",
            "email": "test@test.com",
            "password": "test123"
        }).expect(201);


        const user = await User.findById(response.body.user._id);
        expect(user).to.not.be.null;
        expect(user.password).not.equal('test123');

        // https://stackoverflow.com/questions/29532981/match-partial-objects-in-chai-assertions
        expect(response.body).to.containSubset({
            user: {
                name: 'testUser',
                email: 'test@test.com'
            },
            token: user.tokens[0].token
        });
    });

    it('Should login existing user', async () => {
        await request(app).post('/user/login').send({
            email: userOne.email,
            password: userOne.password
        }).expect(200);
    });

    it('Should not login non existing user', async () => {
        await request(app).post('/user/login').send({
            email: 'serOne@example.com',
            password: userOne.password
        }).expect(400);
    });

    it('Should signout logged in user', async () => {
        await request(app)
            .post('/user/logout')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send(
                userOne.tokens[0].token
            ).expect(200);

        await request(app)
            .post('/user/logout')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send(
                userOne.tokens[0].token
            ).expect(401);
    });
});

