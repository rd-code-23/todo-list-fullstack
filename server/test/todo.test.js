import { expect } from 'chai';
import request from 'supertest';
import app from '../index';
import {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    todoOne,
    todoTwo,
    todoThree,
    setupDatabase
} from './fixtures/db';
import Todo from '../models/todos';

beforeEach(setupDatabase);

describe("Testing Todos ", async function () {
    it('Should create todo for a user', async () => {
        const response = await request(app)
            .post('/todos')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({
                "text": "sleep",
                "isComplete": true
            })
            .expect(201);

        const todo = await Todo.findById(response.body._id);
        expect(todo).to.not.be.null;
        expect(todo.isComplete).to.be.true;
    });

    it('Should fetch user todos', async () => {
        const response = await request(app)
            .get('/todos')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200);

        expect(response.body.length).equal(2);
    });

    it('Should not delete other users todos', async () => {
        await request(app)
            .delete(`/todos/${todoOne._id}`)
            .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
            .send()
            .expect(404);

        const todo = await Todo.findById(todoOne._id);
        expect(todo).to.not.be.null;
    });
});
