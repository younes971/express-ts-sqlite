type MessageResponse = {
  message: string;
};

type ErrorResponse = MessageResponse & {
  stack?: string;
};

type Article = {
  id: number;
  title: string;
  description: string;
  author_id: number;
};

export type {MessageResponse, ErrorResponse, Article};

export type Author = {
  id: number;
  name: string;
  email: string;
};

