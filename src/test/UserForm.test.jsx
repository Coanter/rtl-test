import { UserForm } from "../components/UserForm"
import { render } from "@testing-library/react"

test("text should be visible after input and pressing on submit button", async () => {
    render(<UserForm/>)
    const input = screen.getByPlaceholderText("Input your name")
    const button = screen.getByText("Submit")

    await userEvent.type(input, "John")
    await userEvent.click(button)
    const text = screen.getByText("John")
    expect(text).toBeInTheDocument()
})

