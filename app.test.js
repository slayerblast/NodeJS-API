const request = require("supertest");
const db = require("./db");
const app = require("./app");
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mapToObj = (m) => {
  return Array.from(m).reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
};

const schema = Joi.object({
    id: Joi.objectId(),
    description: Joi.string().max(100),
    faite: Joi.boolean()
  })




describe("Mon API CRUD", () => {

  beforeEach(()=>{
    // reset ta base avant chaque test
    db['memoryDb'] = new Map();
    db['id'] = 0;
    db['memoryDb'].set(db['id']++, { description: "faire un truc", faite: false })
    db['memoryDb'].set(db['id']++, { description: "faire un deuxieme truc", faite: false })
    db['memoryDb'].set(db['id']++, { description: "faire un troisième truc", faite: false }) 
  })

  it("GET / retourne JSON de la database", async () => {
    const res = await request(app)
      .get("/")
      .expect(200)
      .expect("content-type", /json/);
    expect(JSON.parse(res.text)).toMatchObject(mapToObj(db.memoryDb));
  });

  it("POST / doit créer un nouvel objet en BDD et le retourner", async () => {
    let insertion = { description: "faire un énième truc", faite: false };
    let id = db.id;
    const res = await request(app)
      .post("/")
      .send(insertion)
      .expect(201)
      .expect("content-type", /json/);

    expect(db.memoryDb.get(id)).toMatchObject(insertion);
  });

  test("GET / retourne bien les éléments de la db", async () => {
    // test
    const response = await request(app)
      .get("/")
      .expect(200)
      .expect("Content-Type", /json/ );
    expect(response.body).toMatchObject({
      0: { description: "faire un truc", faite: false },
      1: { description: "faire un deuxieme truc", faite: false },
      2: { description: "faire un troisième truc", faite: false},
    });
  });

  it("GET /id/:id retourne le JSON de l'objet correspondant en DB", async () => {
    const res = await request(app)
      .get("/id/1")
      .expect(200)
      .expect("content-type", /json/);
    expect(JSON.parse(res.text)).toMatchObject(db.memoryDb.get(1));
  });
});
