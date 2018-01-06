import request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/models';

describe('Testando rotas do usuário', function () {
    test('Cadastro de usuário.', function (done) {

        return sequelize.sync({ force: true })
            .then(() => {

                return request(app)
                    .post('/api/usuarios')
                    .send({
                        "nome": "Douglas Junior",
                        "email": "douglas2@mail.com",
                        "nascimento": "1989-05-17",
                        "senha": "senha123",
                        "cpf": "12345678901"
                    })
                    .expect(201)
                    .then(response => {
                        expect(response.body).toEqual(
                            expect.objectContaining({
                                id: expect.any(Number),
                                nome: expect.any(String),
                            })
                        );
                        done();
                    })

            }).catch(ex => {
                done(ex);
            })

    })
})


