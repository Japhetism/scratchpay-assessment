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
        it("It should GET all the clinics without query params", (done) => {
            Chai.request(Server)
                .get("/api/v1/clinics")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount');
                    response.body.responseData.should.have.property('pageSize').eql(10);
                    response.body.responseData.should.have.property('count');
                done();
                })
        })

        it("It should not GET all the clinics", (done) => {
            Chai.request(Server)
                .get("/api/v1/clinic")
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Route does not exist');
                    response.body.should.have.property('status').be.eql('error');
                done();
                })
        })
    })

    /**
     * Test GET Clinic Route with name Query Param
     */
    describe("GET /api/v1/clinics?name={name}", () => {
        it("It should GET all the clinics with specified name query param", (done) => {
            const name = "good health home";
            Chai.request(Server)
                .get(`/api/v1/clinics?name=${name}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount');
                    response.body.responseData.should.have.property('pageSize').eql(2);
                    response.body.responseData.should.have.property('count');
                done();
                })
        })

        it("It should not GET all the clinics with invalid name query param", (done) => {
            const name = "test clinic";
            Chai.request(Server)
                .get(`/api/v1/clinics?name=${name}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.items.length.should.be.eql(0);
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount').eql(0);
                    response.body.responseData.should.have.property('pageSize').eql(0);
                    response.body.responseData.should.have.property('count').eql(0);
                done();
                })
        })

        it("It should not GET all the clinics with name query params less than two character length", (done) => {
            const name = "a";
            Chai.request(Server)
                .get(`/api/v1/clinics?name=${name}`)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('\"name\" length must be at least 2 characters long'),
                    response.body.should.have.property('responseCode').be.eql('99'),
                    response.body.should.have.property('responseData').be.a('null')
                done();
                })
        })
    })


    /**
     * Test GET Clinic Route with state Query Param
     */
    describe("GET /api/v1/clinics?state={state}", () => {
        it("It should GET all the clinics with specified state query param", (done) => {
            const state = "california";
            Chai.request(Server)
                .get(`/api/v1/clinics?state=${state}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount');
                    response.body.responseData.should.have.property('pageSize').eql(4);
                    response.body.responseData.should.have.property('count');
                done();
                })
        })

        it("It should not GET all the clinics with invalid state query param", (done) => {
            const state = "lagos";
            Chai.request(Server)
                .get(`/api/v1/clinics?state=${state}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.items.length.should.be.eql(0);
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount').eql(0);
                    response.body.responseData.should.have.property('pageSize').eql(0);
                    response.body.responseData.should.have.property('count').eql(0);
                done();
                })
        })

        it("It should not GET all the clinics with state query params less than two character length", (done) => {
            const state = "a";
            Chai.request(Server)
                .get(`/api/v1/clinics?state=${state}`)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('\"state\" length must be at least 2 characters long'),
                    response.body.should.have.property('responseCode').be.eql('99'),
                    response.body.should.have.property('responseData').be.a('null')
                done();
                })
        })
    })

    /**
     * Test GET Clinic Route with state as state code Query Param
     */
    describe("GET /api/v1/clinics?state={stateCode}", () => {
        it("It should GET all the clinics with specified state query param as state code", (done) => {
            const state = "ca";
            Chai.request(Server)
                .get(`/api/v1/clinics?state=${state}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount');
                    response.body.responseData.should.have.property('pageSize').eql(4);
                    response.body.responseData.should.have.property('count');
                done();
                })
        })

        it("It should not GET all the clinics with invalid state query param as state code", (done) => {
            const state = "la";
            Chai.request(Server)
                .get(`/api/v1/clinics?state=${state}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.items.length.should.be.eql(0);
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount').eql(0);
                    response.body.responseData.should.have.property('pageSize').eql(0);
                    response.body.responseData.should.have.property('count').eql(0);
                done();
                })
        })
    })

    /**
     * Test GET Clinic Route with availability Query Params
     */
    describe("GET /api/v1/clinics?availabilityFrom={availabilityFrom}&availabilityTo={availabilityTo}", () => {
        it("It should GET all the clinics with specified availability from and availability to query params", (done) => {
            const availabilityFrom = "09:00";
            const availabilityTo = "19:30";
            Chai.request(Server)
                .get(`/api/v1/clinics?availabilityFrom=${availabilityFrom}&availabilityTo=${availabilityTo}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount');
                    response.body.responseData.should.have.property('pageSize').eql(1);
                    response.body.responseData.should.have.property('count');
                done();
                })
        })

        it("It should GET all the clinics with specified availability from query param only", (done) => {
            const availabilityFrom = "09:00";
            Chai.request(Server)
                .get(`/api/v1/clinics?availabilityFrom=${availabilityFrom}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount');
                    response.body.responseData.should.have.property('pageSize').eql(9);
                    response.body.responseData.should.have.property('count');
                done();
                })
        })

        it("It should not GET all the clinics with invalid availability from and availability to query params", (done) => {
            const availabilityFrom = "00:00";
            const availabilityTo = "01:30";
            Chai.request(Server)
                .get(`/api/v1/clinics?availabilityFrom=${availabilityFrom}&availabilityTo=${availabilityTo}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.items.length.should.be.eql(0);
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount').eql(0);
                    response.body.responseData.should.have.property('pageSize').eql(0);
                    response.body.responseData.should.have.property('count').eql(0);
                done();
                })
        })
        

        it("It should not GET all the clinics with availability to query param only", (done) => {
            const availabilityTo = "01:30";
            Chai.request(Server)
                .get(`/api/v1/clinics?availabilityTo=${availabilityTo}`)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('\"availabilityTo\" missing required peer \"availabilityFrom\"'),
                    response.body.should.have.property('responseCode').be.eql('99'),
                    response.body.should.have.property('responseData').be.a('null')
                done();
                })
        })

        it("It should not GET all the clinics with availability not in the right regex format", (done) => {
            const availabilityFrom = "09";
            Chai.request(Server)
                .get(`/api/v1/clinics?availabilityFrom=${availabilityFrom}`)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('\"availabilityFrom\" with value \"09\" fails to match the required pattern: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/'),
                    response.body.should.have.property('responseCode').be.eql('99'),
                    response.body.should.have.property('responseData').be.a('null')
                done();
                })
        })

        
    })

    /**
     * Test GET Clinics Route with Multiple Query Params (name and state)
     */
    describe("GET /api/v1/clinics?name={name}&state={state}", () => {
        it("It should GET all the clinics with specified name and state query params", (done) => {
            const name = "Good Health Home";
            const state = "Alaska";
            Chai.request(Server)
                .get(`/api/v1/clinics?name=${name}&state=${state}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount');
                    response.body.responseData.should.have.property('pageSize').eql(1);
                    response.body.responseData.should.have.property('count');
                done();
                })
        })

        it("It should not GET all the clinics with name and state query params", (done) => {
            const name = "Test Clinic";
            const state = "lagos";
            Chai.request(Server)
                .get(`/api/v1/clinics?name=${name}&state=${state}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.items.length.should.be.eql(0);
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount').eql(0);
                    response.body.responseData.should.have.property('pageSize').eql(0);
                    response.body.responseData.should.have.property('count').eql(0);
                done();
                })
        })
    })
    

    /**
     * Test GET Clinics Route with Multiple Query Params (name and availability)
     */
    describe("GET /api/v1/clinics?name={name}&availabilityFrom={availabilityFrom}&availabilityTo={availabilityTo}", () => {
        it("It should GET all the clinics with specified name and availability from and availability to", (done) => {
            const name = "Good Health Home";
            const availabilityFrom = "09:00";
            const availabilityTo = "19:30";
            Chai.request(Server)
                .get(`/api/v1/clinics?name=${name}&availabilityFrom=${availabilityFrom}&availabilityTo=${availabilityTo}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount');
                    response.body.responseData.should.have.property('pageSize').eql(1);
                    response.body.responseData.should.have.property('count');
                done();
                })
        })

        it("It should not GET all the clinics with invalid name and availability from and availability to", (done) => {
            const name = "test clinic";
            const availabilityFrom = "00:00";
            const availabilityTo = "01:30";
            Chai.request(Server)
                .get(`/api/v1/clinics?name=${name}&availabilityFrom=${availabilityFrom}&availabilityTo=${availabilityTo}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.items.length.should.be.eql(0);
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount').eql(0);
                    response.body.responseData.should.have.property('pageSize').eql(0);
                    response.body.responseData.should.have.property('count').eql(0);
                done();
                })
        })
    })

    /**
     * Test GET clinics Route with Multiple Params (state and availability)
     */
    describe("GET /api/v1/clinics?state={state}&availabilityFrom={availabilityFrom}&availabilityTo={availabilityTo}", () => {
        it("It should GET all the clinics with specified state and availability from and availability to", (done) => {
            const state = "Alaska";
            const availabilityFrom = "09:00";
            const availabilityTo = "19:30";
            Chai.request(Server)
                .get(`/api/v1/clinics?state=${state}&availabilityFrom=${availabilityFrom}&availabilityTo=${availabilityTo}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount');
                    response.body.responseData.should.have.property('pageSize').eql(1);
                    response.body.responseData.should.have.property('count');
                done();
                })
        })

        it("It should not GET all the clinics with invalid state and availability from and availability to", (done) => {
            const state = "lagos";
            const availabilityFrom = "00:00";
            const availabilityTo = "01:30";
            Chai.request(Server)
                .get(`/api/v1/clinics?state=${state}&availabilityFrom=${availabilityFrom}&availabilityTo=${availabilityTo}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.items.length.should.be.eql(0);
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount').eql(0);
                    response.body.responseData.should.have.property('pageSize').eql(0);
                    response.body.responseData.should.have.property('count').eql(0);
                done();
                })
        })
    })

    /**
     * Test GET Clinics Route with Multiple Query Params (name and state as state code)
     */
    describe("GET /api/v1/clinics?name={name}&state={stateCode}", () => {
        it("It should GET all the clinics with specified name and state as state code", (done) => {
            const state = "ak";
            const name = "Good Health Home";
            Chai.request(Server)
                .get(`/api/v1/clinics?state=${state}&name=${name}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount');
                    response.body.responseData.should.have.property('pageSize').eql(1);
                    response.body.responseData.should.have.property('count');
                done();
                })
        })

        it("It should not GET all the clinics with invalid name and state as state code", (done) => {
            const state = "la";
            const name = "test clinic";
            Chai.request(Server)
                .get(`/api/v1/clinics?state=${state}&name=${name}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.items.length.should.be.eql(0);
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount').eql(0);
                    response.body.responseData.should.have.property('pageSize').eql(0);
                    response.body.responseData.should.have.property('count').eql(0);
                done();
                })
        })
    })

    /**
     * Test GET Clinics Route with Multiple Query Params (availability and state as state code)
     */
    describe("GET /api/v1/clinics?state={stateCode}&availabilityFrom={availabilityFrom}&availabilityTo={availabilityTo}", () => {
        it("It should GET all the clinics with specified state as state code and availability from and availability to", (done) => {
            const state = "ak";
            const availabilityFrom = "09:00";
            const availabilityTo = "19:30";
            Chai.request(Server)
                .get(`/api/v1/clinics?state=${state}&availabilityFrom=${availabilityFrom}&availabilityTo=${availabilityTo}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount');
                    response.body.responseData.should.have.property('pageSize').eql(1);
                    response.body.responseData.should.have.property('count');
                done();
                })
        })

        it("It should not GET all the clinics with invalid state as state code and availability from and availability to", (done) => {
            const state = "la";
            const availabilityFrom = "00:00";
            const availabilityTo = "01:30";
            Chai.request(Server)
                .get(`/api/v1/clinics?state=${state}&availabilityFrom=${availabilityFrom}&availabilityTo=${availabilityTo}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.items.length.should.be.eql(0);
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount').eql(0);
                    response.body.responseData.should.have.property('pageSize').eql(0);
                    response.body.responseData.should.have.property('count').eql(0);
                done();
                })
        })
    })

    /**
     * Test GET Clinics Route with Multiple Query Params (name, state and availability)
     */
    describe("GET /api/v1/clinics?name={name}&state={state}&availabilityFrom={availabilityFrom}&availabilityTo={availabilityTo}", () => {
        it("It should GET all the clinics with specified name, state and availability from and availability to", (done) => {
            const name = "Good Health Home";
            const state = "Alaska";
            const availabilityFrom = "09:00";
            const availabilityTo = "19:30";
            Chai.request(Server)
                .get(`/api/v1/clinics?name=${name}&state=${state}&availabilityFrom=${availabilityFrom}&availabilityTo=${availabilityTo}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount');
                    response.body.responseData.should.have.property('pageSize').eql(1);
                    response.body.responseData.should.have.property('count');
                done();
                })
        })

        it("It should not GET all the clinics with invalid name, state and availability from and availability to", (done) => {
            const name = "Test Clinic";
            const state = "lagos";
            const availabilityFrom = "00:00";
            const availabilityTo = "01:30";
            Chai.request(Server)
                .get(`/api/v1/clinics?name=${name}&state=${state}&availabilityFrom=${availabilityFrom}&availabilityTo=${availabilityTo}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.items.length.should.be.eql(0);
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount').eql(0);
                    response.body.responseData.should.have.property('pageSize').eql(0);
                    response.body.responseData.should.have.property('count').eql(0);
                done();
                })
        })
    })

    /**
     * Test GET Clinics Route with Multiple Query Params (name, state as state code and availability)
     */
     describe("GET /api/v1/clinics?name={name}&state={stateCode}&availabilityFrom={availabilityFrom}&availabilityTo={availabilityTo}", () => {
        it("It should GET all the clinics with specified name, state as state code and availability from and availability to", (done) => {
            const name = "Good Health Home";
            const state = "ak";
            const availabilityFrom = "09:00";
            const availabilityTo = "19:30";
            Chai.request(Server)
                .get(`/api/v1/clinics?name=${name}&state=${state}&availabilityFrom=${availabilityFrom}&availabilityTo=${availabilityTo}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount');
                    response.body.responseData.should.have.property('pageSize').eql(1);
                    response.body.responseData.should.have.property('count');
                done();
                })
        })

        it("It should not GET all the clinics with invalid name, state as state code and availability from and availability to", (done) => {
            const name = "Test Clinic";
            const state = "la";
            const availabilityFrom = "00:00";
            const availabilityTo = "01:30";
            Chai.request(Server)
                .get(`/api/v1/clinics?name=${name}&state=${state}&availabilityFrom=${availabilityFrom}&availabilityTo=${availabilityTo}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.items.length.should.be.eql(0);
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount').eql(0);
                    response.body.responseData.should.have.property('pageSize').eql(0);
                    response.body.responseData.should.have.property('count').eql(0);
                done();
                })
        })
    })

    /**
     * Test GET Clinics Route with current page and page size as Query Params
     */
    describe("GET /api/v1/clinics?currentPage={currentPage}&pageSize={pageSize}", () => {
        it("It should GET all the clinics with specified current page and page size", (done) => {
            const currrentPage = 1;
            const pageSize = 5;
            Chai.request(Server)
                .get(`/api/v1/clinics?currentPage=${currrentPage}&pageSize=${pageSize}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.should.have.property('currentPage').eql(currrentPage);
                    response.body.responseData.should.have.property('pageCount');
                    response.body.responseData.should.have.property('pageSize').eql(pageSize);
                    response.body.responseData.should.have.property('count');
                done();
                })
        })

        it("It should not GET all the clinics with current page and page size as zero", (done) => {
            const currentPage = 0;
            const pageSize = 0;
            Chai.request(Server)
                .get(`/api/v1/clinics?currentPage=${currentPage}&pageSize=${pageSize}`)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('\"currentPage\" must be greater than or equal to 1'),
                    response.body.should.have.property('responseCode').be.eql('99'),
                    response.body.should.have.property('responseData').be.a('null')
                done();
                })
        })

        it("It should not GET all the clinics with invalid current pa and page size", (done) => {
            const currentPage = 'a';
            const pageSize = '-';
            Chai.request(Server)
                .get(`/api/v1/clinics?currentPage=${currentPage}&pageSize=${pageSize}`)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('\"currentPage\" must be a number'),
                    response.body.should.have.property('responseCode').be.eql('99'),
                    response.body.should.have.property('responseData').be.a('null')
                done();
                })
        })
    })
});