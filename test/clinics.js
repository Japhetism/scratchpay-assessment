const Chai = require('chai');
const ChaiHttp = require('chai-http');
const Server = require('../server');

//Assertion Style
Chai.should();

Chai.use(ChaiHttp);

describe('Clinics API', () => {
    /**
     * Test GET Clinic Route Without Query Params
     */
    describe("GET /api/v1/clinics", () => {
        it("It should GET all the clinics", (done) => {
            Chai.request(Server)
                .get("/api/v1/clinics")
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                })
        })
    })

    /**
     * Test GET Clinic Route with name Query Params
     */


    /**
     * Test GET Clinic Route with state Query Params
     */

    /**
     * Test GET Clinic Route with state as state code Query Params
     */

    /**
     * Test GET Clinic Route with availability Query Params
     */
});