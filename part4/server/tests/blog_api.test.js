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

test("check that new blogs can be added", async () => {
    const blogCountBegin = (await helper.contentInDb()).length

    const newBlog = {
        "author": "kimi räikkönen",
        "title": "jääukko",
        "url": "www.rimikäikkönen.fi",
        "likes": 10032
    }
    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)

    const blogCountEnd = (await helper.contentInDb()).length

    expect(blogCountEnd).toBe(blogCountBegin + 1)
})



afterAll(() => {
    mongoose.connection.close()
})