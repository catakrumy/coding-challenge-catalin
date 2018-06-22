import { environment } from '../../environments/environment';

export const API_CONSTS = {
  LESSONS_API_URL: environment.lessonsApi
};

export const MESSAGES = {
  INSTRUCTION_MESSAGE_MATCH: "Please match the corresponding items:",
  INSTRUCTION_MESSAGE_GREAT_JOB: "You did a great job !",
  INSTRUCTION_MESSAGE_TRY_AGAIN: "You didn't match the items correctly. Try to change the order."
};
