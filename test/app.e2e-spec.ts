import { response, Response } from 'express';
import { PrismaService } from './../src/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const prismaService = moduleFixture.get(PrismaService);
    const responce = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'shubham@incubyte.co',
        password: 'faegdfefeghrhr',
      });
    token = responce.body.accesskey;
    console.log();
  });

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/bookmark')
      .set('authorization', token)
      .send();
    expect(response.statusCode).toBe(200);
  });

  it('/ (Post) SignIn', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/singin')
      .set('authorization', token)
      .send();
    expect(response.statusCode).toBe(200);
  });
});
