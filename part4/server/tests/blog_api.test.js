const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const helper = require("./test_helper")

const api = supertest(app)



beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test("check notes return form", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("check that all returned blogs have field 'id'", async () => {
    const res = await api
        .get("/api/blogs")

    res.body.forEach((obj) => {
        expect(Object.keys(obj)).toContain("id")
    })
})


afterAll(() => {
    mongoose.connection.close()
})