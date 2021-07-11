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
    describe("GET /api/v1/clinics", () => {
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
     * Test GET Clinic Route with state Query Param
     */
    describe("GET /api/v1/clinics", () => {
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
     * Test GET Clinic Route with state as state code Query Param
     */
    describe("GET /api/v1/clinics", () => {
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
    describe("GET /api/v1/clinics", () => {
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

        it("It should not GET all the clinics with invalid availability from and availability to query params", (done) => {
            const availabilityFrom = "00:00";
            const availabilityTo = "01:30";
            Chai.request(Server)
                .get(`/api/v1/clinics?availabilityFrom=${availabilityFrom}&availabilityTo=${availabilityTo}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
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
     * Test GET Clinics Route with Multiple Query Params (name and state)
     */
    describe("GET /api/v1/clinics", () => {
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
    describe("GET /api/v1/clinics", () => {
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
    describe("GET /api/v1/clinics", () => {
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
    describe("GET /api/v1/clinics", () => {
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
    describe("GET /api/v1/clinics", () => {
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
    describe("GET /api/v1/clinics", () => {
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
     describe("GET /api/v1/clinics", () => {
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
    describe("GET /api/v1/clinics", () => {
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

        it("It should not GET all the clinics with invalid current pas and page size", (done) => {
            const currentPage = 0;
            const pageSize = 0;
            Chai.request(Server)
                .get(`/api/v1/clinics?currentPage=${currentPage}&pageSize=${pageSize}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').be.eql('Successful');
                    response.body.should.have.property('responseData').be.a('object');
                    response.body.responseData.should.have.property('items').be.a('array');
                    response.body.responseData.items.length.should.be.eql(0);
                    response.body.responseData.should.have.property('currentPage').eql(1);
                    response.body.responseData.should.have.property('pageCount').to.be.a('null');
                    response.body.responseData.should.have.property('pageSize').eql(0);
                    response.body.responseData.should.have.property('count');
                done();
                })
        })
    })
});