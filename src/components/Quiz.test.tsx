import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Quiz from "./Quiz"; // Adjust the import path as necessary
import { QuestionType } from "../types/questionType"; // Adjust the import if needed

const mockQuestions: QuestionType[] = [
  {
    id: 0,
    parsedArguments: {
      question: "What is the capital of France?",
      options: {
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Rome",
      },
      answer: "c",
    },
  },
  {
    id: 1,
    parsedArguments: {
      question: "What is 2 + 2?",
      options: {
        a: "3",
        b: "4",
        c: "2",
        d: "5",
      },
      answer: "b",
    },
  },
];

describe("Quiz component", () => {
  const mockOnComplete = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers(); // Use real timers after tests
  });

  beforeEach(() => {
    jest.useFakeTimers(); // Use fake timers for tests involving timing
  });

  test("renders quiz with questions and shows initial score", () => {
    render(<Quiz questions={mockQuestions} onComplete={mockOnComplete} />);

    expect(screen.getByText(/Your Score:/i)).toBeInTheDocument();
    expect(screen.getByText(/Chat GPT Quiz/i)).toBeInTheDocument();
    expect(screen.getByText(/What is the capital of France?/i)).toBeInTheDocument();
    expect(screen.getByText(/Time left:/i)).toBeInTheDocument();
  });

  test("increments score only once when the correct answer is selected", async () => {
    render(<Quiz questions={mockQuestions} onComplete={mockOnComplete} />);

    // Answer the first question correctly
    const parisButton = screen.getByText(/Paris/i);
    fireEvent.click(parisButton);

    // Wait for the correct answer UI to show
    await waitFor(() => expect(screen.getByText(/Next Question/i)).toBeInTheDocument());

    // click button again
    fireEvent.click(parisButton);

    // Check the score
    expect(screen.getByText(/1 \/ 2/i)).toBeInTheDocument();
  });

  test("handles time out correctly", async () => {
    render(<Quiz questions={mockQuestions} onComplete={mockOnComplete} />);

    // Fast forward timer to simulate timeout
    jest.advanceTimersByTime(15000); // Fast forward by 15 seconds

    // Wait for time-out to trigger showCorrectAnswer UI
    await waitFor(() => expect(screen.getByText(/Next Question/i)).toBeInTheDocument());

    // Click the next question button
    const nextButton = screen.getByText(/Next Question/i);
    fireEvent.click(nextButton);

    expect(screen.getByText(/What is 2 \+ 2\?/i)).toBeInTheDocument();
    expect(screen.getByText(/0 \/ 2/i)).toBeInTheDocument();
  });

  test("calls onComplete with the final score when all questions are answered", async () => {
    render(<Quiz questions={mockQuestions} onComplete={mockOnComplete} />);

    // Answer first question correctly
    fireEvent.click(screen.getByText(/Paris/i));
    await waitFor(() => screen.getByText(/Next Question/i));
    fireEvent.click(screen.getByText(/Next Question/i));

    // Answer second question correctly
    fireEvent.click(screen.getByText(/4/i));
    await waitFor(() => screen.getByText(/Next Question/i));
    fireEvent.click(screen.getByText(/Next Question/i));

    // Check if onComplete was called with the correct score
    expect(mockOnComplete).toHaveBeenCalledWith(2); // Expecting a score of 2
  });
});