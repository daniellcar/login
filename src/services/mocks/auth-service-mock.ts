interface SignInServiceMockProps {
  email: string;
  password: string;
}

interface SendPasswordResetEmailServiceMockProps {
  email: string;
}

interface ConfirmValidationCodeServiceMockProps {
  validationCode: string;
}

export const signInServiceMock = async (data: SignInServiceMockProps) => {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (data.email === "danielleng100@gmail.com") {
    return {
      data: {
        errorCode: "auth/invalid-credentials",
      },
      status: 400,
    };
  }

  return {
    data: {
      token: "fake-token",
    },
    status: 200,
  };
};

export const sendPasswordResetEmailServiceMock = async (
  _data: SendPasswordResetEmailServiceMockProps
) => {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { status: 200 };
};

export const confirmValidationCodeServiceMock = async (
  _data: ConfirmValidationCodeServiceMockProps
) => {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { status: 200 };
};
