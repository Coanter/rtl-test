import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FeedbackForm } from "../components/FeedbackForm.jsx";
import userEvent from '@testing-library/user-event';

  describe('FeedbackForm Component', () => {
    test("проверка заголовка", () => {
    render(<FeedbackForm />);
    const title = screen.getByText(/Обратная связь/i);
    expect(title).toBeInTheDocument();
    });

    test("ввод имени и сообщения", () => {
    render(<FeedbackForm />);
    
    const nameInput = screen.getByPlaceholderText(/Ваше имя/i);
    const messageInput = screen.getByPlaceholderText(/Ваше сообщение/i);
    
    fireEvent.change(nameInput, { target: { value: "любое имя" } });
    fireEvent.change(messageInput, { target: { value: "Тестовое сообщение" } });

    expect(nameInput.value).toBe("любое имя");
    expect(messageInput.value).toBe("Тестовое сообщение");
    });

    test('Отправка формы с валидными данными', async () => {
      const user = userEvent.setup();
      render(<FeedbackForm />);
      
      const nameInput = screen.getByPlaceholderText('Ваше имя');
      const messageInput = screen.getByPlaceholderText('Ваше сообщение');
      const submitButton = screen.getByText('Отправить');

      await user.type(nameInput, 'John Doe');
      await user.type(messageInput, 'This is a test message');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Спасибо, John Doe!/i)).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    test("не отправляется сообщение при пустом вводе", () => {
    render(<FeedbackForm />);
    
    const nameInput = screen.getByPlaceholderText(/Ваше имя/i);
    const messageInput = screen.getByPlaceholderText(/Ваше сообщение/i);
    const submitButton = screen.getByText(/Отправить/i);
    
    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(messageInput, { target: { value: "" } });
    fireEvent.click(submitButton);
    
    const confirmationMessage = screen.queryByText(/Спасибо,/i);
    expect(confirmationMessage).not.toBeInTheDocument();
    });

    test("кнопка существует и активна", () => {
    render(<FeedbackForm />);
    const submitButton = screen.getByText(/Отправить/i);
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
    });

    test("проверка trim-валидации", async () => {
    render(<FeedbackForm />);
    
    const nameInput = screen.getByPlaceholderText(/Ваше имя/i);
    const messageInput = screen.getByPlaceholderText(/Ваше сообщение/i);
    const submitButton = screen.getByText(/Отправить/i);
    
    fireEvent.change(nameInput, { target: { value: "     " } });
    fireEvent.change(messageInput, { target: { value: "     " } });
    fireEvent.click(submitButton);
    
    const confirmationMessage = screen.queryByText(/Спасибо,/i);
    expect(confirmationMessage).not.toBeInTheDocument();
    });
});