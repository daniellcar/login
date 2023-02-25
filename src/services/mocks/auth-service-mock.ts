interface SignInServiceMockProps {
  email: string;
  password: string;
}

export const signInServiceMock = async (_data: SignInServiceMockProps) => {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 500));

  return "fake-token";
};

interface SendPasswordResetEmailServiceMockProps {
  email: string;
}

export const sendPasswordResetEmailServiceMock = async (
  _data: SendPasswordResetEmailServiceMockProps
) => {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 500));
};

export const confirmValidationCodeServiceMock = async (
  _data: SendPasswordResetEmailServiceMockProps
) => {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 500));
};
