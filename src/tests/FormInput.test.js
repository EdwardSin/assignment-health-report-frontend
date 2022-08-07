import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import FormInput from '../components/FormInput';


describe('FormInput component', () => {
  test('check value call changed', () => {
    const setValueMock = jest.fn();
    const setValueErrorMock = jest.fn();
    const {container} = render(<FormInput
                                label='Name'
                                name='name'
                                isEditMode={true}
                                value={'23'}
                                setValue={setValueMock}
                                setValueError={setValueErrorMock}
                                maxLength={128}
                                errorMessage={''}
                                />);
    const input = container.querySelector(`input[name="name"]`);
    userEvent.type(input, 'Edward Sin');
    expect(setValueMock).toHaveBeenCalledTimes(10);
  });
  test("check to error message when it is not empty", () => {
    const setValueMock = jest.fn();
    const setValueErrorMock = jest.fn();
    const {container} = render(<FormInput
                                label='Name'
                                name='name'
                                isEditMode={true}
                                value={'23'}
                                setValue={setValueMock}
                                setValueError={setValueErrorMock}
                                maxLength={128}
                                errorMessage={'This is an error message!'}
                                />);
    const input = container.querySelector(`input[name="name"]`);
    const errorMessage = screen.getByText('This is an error message!')
    expect(errorMessage).toBeInTheDocument();
  });
});