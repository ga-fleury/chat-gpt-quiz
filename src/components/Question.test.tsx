import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Question from "./Question"; // Adjust the import path as needed
import { QuestionType } from "../types/questionType"; // Adjust the import as needed

describe("Question component", () => {
  const mockHandleAnswer = jest.fn();

  const question: QuestionType = {
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
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the question and options", () => {
    render(
      <Question
        question={question}
        showCorrectAnswer={false}
        handleAnswer={mockHandleAnswer}
      />
    );

    expect(screen.getByText(/What is the capital of France?/i)).toBeInTheDocument();
    expect(screen.getByText(/Berlin/i)).toBeInTheDocument();
    expect(screen.getByText(/Madrid/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/Rome/i)).toBeInTheDocument();
  });

  test("calls handleAnswer with selected option", () => {
    render(
      <Question
        question={question}
        showCorrectAnswer={false}
        handleAnswer={mockHandleAnswer}
      />
    );

    const parisButton = screen.getByText(/Paris/i);
    fireEvent.click(parisButton);

    expect(mockHandleAnswer).toHaveBeenCalledTimes(1);
    expect(mockHandleAnswer).toHaveBeenCalledWith("c"); // Assuming that "c" is the selected key for Paris.
  });

  test("disables incorrect buttons when showCorrectAnswer is true", () => {
    render(
      <Question
        question={question}
        showCorrectAnswer={true}
        handleAnswer={mockHandleAnswer}
      />
    );

    const berlinButton = screen.getByText(/Berlin/i);
    const madridButton = screen.getByText(/Madrid/i);
    const parisButton = screen.getByText(/Paris/i);
    const romeButton = screen.getByText(/Rome/i);

    expect(berlinButton).toBeDisabled();
    expect(madridButton).toBeDisabled();
    expect(parisButton).toHaveClass("btn btn-success");
    expect(romeButton).toBeDisabled();
  });

  test("buttons have correct classes based on showCorrectAnswer", () => {
    render(
      <Question
        question={question}
        showCorrectAnswer={true}
        handleAnswer={mockHandleAnswer}
      />
    );

    const correctButton = screen.getByText(/Paris/i);
    const incorrectButton = screen.getByText(/Berlin/i);

    expect(correctButton).toHaveClass("btn btn-success");
    expect(incorrectButton).toHaveClass("btn btn-error");
  });
});