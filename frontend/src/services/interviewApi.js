import API from "./api";
export const startInterview = (
  data
) => API.post(
  "/interview/start",
  data
);
export const getQuestion = (
  sessionId
) => API.get(
  `/interview/question/${sessionId}`
);
export const submitAnswer = (
  data
) => API.post(
  "/interview/answer",
  data
);
export const finishInterview = (
  sessionId
) => API.post(
  `/interview/finish/${sessionId}`
);