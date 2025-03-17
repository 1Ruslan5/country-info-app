import type { ValidationError } from '@nestjs/common';

interface ErrorObject {
  property: string;
  message: string;
}

export const extractErrorMessages = (
  errors: ValidationError[],
): ErrorObject[] => {
  let messages: ErrorObject[] = [];

  errors.forEach((error) => {
    if (error.constraints) {
      messages.push({
        property: error.property,
        message: error.constraints[Object.keys(error.constraints)[0]],
      });
    }
    if (error.children && error.children.length > 0) {
      messages = [...messages, ...extractErrorMessages(error.children)];
    }
  });

  return messages;
};
