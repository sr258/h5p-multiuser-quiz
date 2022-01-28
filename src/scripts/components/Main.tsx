import React from "react";

/**
 * A simple React functional component displaying the voting user interface
 */
export default function ({
  clear,
  isTeacher,
  voteDown,
  votesDown,
  votesUp,
  voteUp,
}: {
  clear: () => void;
  isTeacher: boolean;
  voteDown: () => void;
  votesDown: number;
  votesUp: number;
  voteUp: () => void;
}) {
  return (
    <div>
      <h1>Voting machine</h1>
      <p>
        Click the buttons to like or dislike. You can only vote once. Further
        votes will be ignored by the server. Editors can reset all votes.
      </p>
      <div>Likes: {votesUp}</div>
      <button
        onClick={() => {
          voteUp();
        }}
      >
        👍
      </button>
      <div>Dislike: {votesDown}</div>
      <button
        onClick={() => {
          voteDown();
        }}
      >
        👎
      </button>
      {isTeacher && <button onClick={clear}>Clear</button>}
    </div>
  );
}
