import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("Test blog rendering", () => {
    let container

    beforeEach(() => {
        const blog = {
            title: "this is title",
            author: "minä",
            url: "www.fi",
            likes: 3,
        }

        container = render(

            <Blog post={blog} />
        ).container
    })

    test("check rendered blog", async () => {

        const title = screen.getByText("this is title")
        expect(title).toBeVisible()

        const author = screen.queryByText("minä")
        expect(author).not.toBeVisible()

        const url = screen.queryByText("www.fi")
        expect(url).not.toBeVisible()

        const likes = screen.getByText(
            "likes",
            { exact: false }
        )
        expect(likes).not.toBeVisible()
    })

    test("check that components turn visible when button is clicked", async () => {
        const user = userEvent.setup()
        const button = screen.getByText("view")

        await user.click(button)

        const div = container.querySelector("#content")
        expect(div).not.toHaveStyle("display: none")

        const author = screen.queryByText("minä")
        expect(author).toBeVisible()

        const url = screen.queryByText("www.fi")
        expect(url).toBeVisible()

        const likes = screen.getByText(
            "likes",
            { exact: false }
        )
        expect(likes).toBeVisible()
    })
})
