import { render, screen, fireEvent } from "@testing-library/react";
import ScoreScreen from "./ScoreScreen"; // Adjust the import path as needed

describe("ScoreScreen", () => {
  const mockOnBack = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders congratulations message when score is greater than 0", () => {
    render(<ScoreScreen onBack={mockOnBack} score={10} />);
    
    expect(screen.getByText(/congratulations!/i)).toBeInTheDocument();
    expect(screen.getByText(/you scored a total of 10 points!/i)).toBeInTheDocument();
  });

  test("renders better luck next time message when score is 0", () => {
    render(<ScoreScreen onBack={mockOnBack} score={0} />);
    
    expect(screen.getByText(/better luck next time!/i)).toBeInTheDocument();
    expect(screen.getByText(/you scored 0 points/i)).toBeInTheDocument();
  });

  test("calls onBack when Back to Start button is clicked", () => {
    render(<ScoreScreen onBack={mockOnBack} score={10} />);
    
    const backButton = screen.getByText(/back to start/i);
    fireEvent.click(backButton);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});