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

interface VerifyTokenServiceMockProps {
  token: string;
}

export const signInServiceMock = async (data: SignInServiceMockProps) => {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (data.email === "erick1@gmail.com") {
    return {
      data: {
        errorCode: "auth/invalid_credentials",
      },
      status: 400,
    };
  }
  if (data.email === "erick2@gmail.com") {
    return {
      data: {
        errorCode: "auth/blocked_user",
      },
      status: 403,
    };
  }
  if (data.email === "erick3@gmail.com") {
    return {
      data: {
        errorCode: "auth/unknown_error",
      },
      status: 500,
    };
  }

  return {
    data: {
      token: "fake-token",
    },
    status: 200,
  };
};

export const verifyTokenServiceMock = async (data: VerifyTokenServiceMockProps) => {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (data.token === "fake-token") {
    return { status: 200 };
  }

  return {
    data: {
      errorCode: "auth/invalid_token",
    },
    status: 401,
  }
};

export const sendPasswordResetEmailServiceMock = async (
  data: SendPasswordResetEmailServiceMockProps
) => {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (data.email === "erick1@gmail.com") {
    return {
      data: {
        errorCode: "auth/email_not_found",
      },
      status: 400,
    };
  }
  if (data.email === "erick2@gmail.com") {
    return {
      data: {
        errorCode: "auth/blocked_user",
      },
      status: 403,
    };
  }
  if (data.email === "erick3@gmail.com") {
    return {
      data: {
        errorCode: "auth/unknown_error",
      },
      status: 500,
    };
  }

  return { status: 200 };
};

export const confirmValidationCodeServiceMock = async (
  data: ConfirmValidationCodeServiceMockProps
) => {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (data.validationCode === "0000") {
    return {
      data: {
        errorCode: "auth/invalid_validation_code",
      },
      status: 400,
    };
  }

  return { status: 200 };
};
