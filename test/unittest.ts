import {APP} from '../index'
import 'mocha';
import {expect} from 'chai';
import supertest from "supertest";
import superagent from "superagent";

describe("Authentication Routes", () => {
    context("Login", () => {
        it("Good Credentials", (done: CallableFunction) => {
            supertest(APP)
                .post('/login')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .send({
                        "mail": "john",
                        "password": "123"
                    }
                )
                .then(res => done())
                .catch(err => done(err));
        });
        it("Bad Credentials", (done: CallableFunction) => {
            supertest(APP)
                .post('/login')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(401)
                .send({
                        "mail": "john",
                        "password": "1234"
                    }
                )
                .then(res => done())
                .catch(err => done(err));
        });
        it("Bad Body Format", (done: CallableFunction) => {
            supertest(APP)
                .post('/login')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(401)
                .send({
                        "email": "john",
                        "password": "123"
                    }
                )
                .then(res => done())
                .catch(err => done(err));
        });
    });
    context("Logout", () => {
        it("Not logged in", (done: CallableFunction) => {
            supertest(APP)
                .post('/logout')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .then(res => done())
                .catch(err => done(err));
        });
        it("Not correctly Logged", (done: CallableFunction) => {
            let agent = supertest.agent(APP);
            agent.post('/login')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(401)
                .send({
                        "mail": "john",
                        "password": "1234"
                    }
                )
                .then(res => {
                    agent.post('/logout')
                        .expect('Content-Type', 'application/json; charset=utf-8')
                        .expect(200)
                        .then(res => done())
                        .catch(err => done(err));
                })
                .catch(err => done(err));
        });
        it("Logged", (done: CallableFunction) => {
            let agent = supertest.agent(APP);
            agent.post('/login')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .send({
                        "mail": "john",
                        "password": "123"
                    }
                )
                .then(res => {
                    agent.post('/logout')
                        .expect('Content-Type', 'application/json; charset=utf-8')
                        .expect(200)
                        .then(res => done())
                        .catch(err => done(err));
                })
                .catch(err => done(err));
        });
    });
    context("Secret Page", () => {
        it("Not Logged", (done: CallableFunction) => {
            supertest(APP)
                .get('/secret')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(401)
                .then(res => done())
                .catch(err => done(err));
        });
        it("Logged", (done: CallableFunction) => {
            let agent = supertest.agent(APP);
            agent.post('/login')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .send({
                        "mail": "john",
                        "password": "123"
                    }
                )
                .then(res => {
                    agent.get('/secret')
                        .expect('Content-Type', 'application/json; charset=utf-8')
                        .expect(200)
                        .then(res => done())
                        .catch(err => done(err));
                })
                .catch(err => done(err));
        });
        it("Bad logged", (done: CallableFunction) => {
            let agent = supertest.agent(APP);
            agent.post('/login')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(401)
                .send({
                        "mail": "john",
                        "password": "1234"
                    }
                )
                .then(res => {
                    agent.get('/secret')
                        .expect('Content-Type', 'application/json; charset=utf-8')
                        .expect(401)
                        .then(res => done())
                        .catch(err => done(err));
                })
                .catch(err => done(err));
        });
        it("Logged out", (done: CallableFunction) => {
            let agent = supertest.agent(APP);
            agent.post('/login')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .send({
                        "mail": "john",
                        "password": "123"
                    }
                )
                .then(res => {
                    agent.post('/logout')
                        .expect('Content-Type', 'application/json; charset=utf-8')
                        .expect(200)
                        .then(res => {
                            agent.get('/secret')
                                .expect('Content-Type', 'application/json; charset=utf-8')
                                .expect(401)
                                .then(res => done())
                                .catch(err => done(err));
                        })
                        .catch(err => done(err));
                })
                .catch(err => done(err));
        });
    });
});