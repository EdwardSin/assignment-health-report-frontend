import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeclarationForm from "../pages/DeclarationForm";
import { rest } from "msw";
import { setupServer } from "msw/node";

describe("DeclarationForm component", () => {
  const server = setupServer(
    rest.post("/api/form/submit", (req, res, ctx) => {
      return res(
        ctx.json({
          result: true,
          message: "Success",
        })
      );
    })
  );
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Submit with empty input", () => {
    render(<DeclarationForm />);
    const nextButton = screen.getByRole("button", {
      name: "Next",
    });
    fireEvent.click(nextButton);
    expect(screen.getByText("Name is required!")).toBeInTheDocument();
    expect(screen.getByText("Temperature is required!")).toBeInTheDocument();
    expect(screen.getAllByText("Please select an option!").length).toBe(2);
  });

  test("Submit successfully", async () => {
    const { container } = render(<DeclarationForm />);
    const nameInput = container.querySelector('input[name="name"]');
    const temperatureInput = container.querySelector(
      'input[name="temperature"]'
    );
    const hasSymptomsYesRadioButton =
      container.querySelector("#hasSymptomsYes");
    const hasContactInLast14DaysNoRadioButton = container.querySelector(
      "#hasContactInLast14DaysNo"
    );
    const nextButton = screen.getByRole("button", {
      name: "Next",
    });

    // Input page
    userEvent.type(nameInput, "Edward Sin");
    userEvent.type(temperatureInput, "35");
    fireEvent.click(hasSymptomsYesRadioButton);
    fireEvent.click(hasContactInLast14DaysNoRadioButton);
    fireEvent.click(nextButton);

    expect(screen.queryByText("Name is required!")).toBeNull();
    expect(screen.queryByText("Temperature is required!")).toBeNull();
    expect(screen.queryAllByText("Please select an option!").length).toBe(0);

    // Confirmation page
    const noAnyInput = container.querySelector("input");
    expect(noAnyInput).toBeNull();
    expect(screen.queryByText("Edward Sin")).toBeInTheDocument();
    expect(screen.queryByText("35")).toBeInTheDocument();
    expect(screen.queryByText("Yes")).toBeInTheDocument();
    expect(screen.queryByText("No")).toBeInTheDocument();

    // Submitted Page
    const nextButton2ndPage = screen.getByRole("button", {
      name: "Submit",
    });
    fireEvent.click(nextButton2ndPage);
    const confirmationMessage = await screen.findByText(
      "Form has been submitted successfully!"
    );
    expect(confirmationMessage).toBeInTheDocument();
  });
});
