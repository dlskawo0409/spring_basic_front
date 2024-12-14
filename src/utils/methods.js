import { REGEX_EMAIL, REGEX_PASS } from "./enum";

export const emailRegexCheck = (email) => REGEX_EMAIL.test(email);

export const passwordRegexCheck = (password) => REGEX_PASS.test(password);
