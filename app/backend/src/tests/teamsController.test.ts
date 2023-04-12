import { expect } from 'chai';
import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore import chaiHttp = require('chai-http');
import chaiHttp = require('chai-http')
import { Model } from 'sequelize';
import { app } from '../app';
import { teams } from './mocks/mocks';

chai.use(chaiHttp);

describe('A rota /teams funciona corretamente', () => {
  
  afterEach(sinon.restore)

  it('A rota get /teams funciona corretamente', async () => {
    sinon.stub(Model, 'findAll').resolves(teams as any);
    const { body, status } = await chai.request(app).get('/teams').send();
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teams);
  });

  it('A rota get /teams/1 funciona corretamente', async () => {
    sinon.stub(Model, 'findByPk').resolves(teams[0] as any);
    const { body, status } = await chai.request(app).get('/teams/1').send();

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teams[0]);
  });
});