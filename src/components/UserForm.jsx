import { useState } from "react"

export const UserForm = () => {
    const [user, setUser] = useState("")
    const [show, setShow] = useState(false)

    const handleChange = (e) => {
        setUser(e.target.value)
    }

    const handleSubmit = () => {
        setShow(true)
    }

    return (
        <div>
            <input placeholder="input your name" value={user} onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
            {show && <p>{user}</p>}
        </div>
    )
}