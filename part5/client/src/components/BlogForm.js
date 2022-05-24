import { useState } from "react"

const BlogForm = ({ handleChange }) => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const clearFields = () => {
        setTitle("")
        setAuthor("")
        setUrl("")
    }
    const createBlog = async (event) => {
        event.preventDefault()
        handleChange({
            title, author, url
        })
        clearFields()
    }
    return (
        <div>
            <form onSubmit={createBlog}>
                <div>
                    title: <input onChange={({ target }) => { setTitle(target.value) }} value={title} />
                </div>
                <div>
                    author: <input onChange={({ target }) => { setAuthor(target.value) }} value={author} />
                </div>
                <div>
                    url: <input onChange={({ target }) => { setUrl(target.value) }} value={url} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm
