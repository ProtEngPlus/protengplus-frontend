import logoWithText from "../../assets/images/LogoWithText/logoWithText.svg";
import PasswordInput from "../../commons/components/Input/PasswordInput";
import Button from "../../commons/components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

type FormValues = {
  newPassword: string;
  confirmNewPassword: string;
};

export default function ResetPasswordPage() {
  const form = useForm<FormValues>();
  const { handleSubmit, setError, watch } = form;
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const userData = {
      password: data.newPassword,
      role: ["user"],
    };
    try {
      // await resetPassword(userData);
      navigate("/sign-in");
    } catch (error: unknown) {
      console.error(error);
    }
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[28%] min-w-fit h-auto py-6 px-4 m-auto bg-white rounded-xl shadow-dropShadow">
        <img
          src={logoWithText}
          alt="logo-with-text"
          className="mb-10 mx-auto"
        />
        <h1 className="text-center mb-9">Reset Your Password ?</h1>
        <FormProvider {...form}>
          <form
            onSubmit={onSubmit}
            id="reset-password-form"
            className="space-y-5"
            noValidate
          >
            {/* New-Password Field */}
            <PasswordInput
              id="newPassword"
              placeholder="New Password"
              additionalValidation={{
                required: { value: true },
                validate: (value: string) =>
                  value === watch("confirmNewPassword"),
              }}
            />

            {/* Confirm-New-Password Field */}
            <PasswordInput
              id="confirmNewPassword"
              placeholder="Confirm New Password"
              additionalValidation={{
                required: { value: true },
                validate: (value: string) =>
                  value === watch("newPassword") || "Password do not match!",
              }}
            />
            <Button
              id="reset-password"
              type="submit"
              buttonType="submit"
              text="Reset Password"
              className="w-full"
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
