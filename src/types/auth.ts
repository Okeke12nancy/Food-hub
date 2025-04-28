
export type LoginProps = {
  email: string;
  password: string;
};

export type RegisterProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};


export type ApiResponse = {
  status: string;
  message: string;
  error?: {
    [key: string]: string[];
  };
  response: {
    [key: string]: {
      [x: string]: string;
    };
  };
};
