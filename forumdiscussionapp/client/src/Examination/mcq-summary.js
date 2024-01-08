import React from "react";
import { List, ListItem, Typography } from "@mui/material";

export const MCQSummary = ({ questions, answers }) => {
  return (
    <div className="mcq-summary-container">
      <Typography variant="h2">Summary of Answers</Typography>
      <List>
        {questions.map((question, index) => (
          <ListItem key={index}>
            <div className="flex">
              <div className="flex">
                <Typography variant="strong">Question {index + 1}:</Typography>
                {question.question}
              </div>
              <div className="flex">
                <Typography variant="strong">Correct Answer:</Typography>
                {question.correctAnswer}
              </div>
              <div className="flex">
                <Typography variant="strong">Your Answer:</Typography>
                {answers[index].selectedOption || "Not answered"}
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
