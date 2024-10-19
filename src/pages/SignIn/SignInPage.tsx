import logoWithText from "../../assets/images/LogoWithText/logoWithText.svg";
import TextInput from "../../commons/components/Input/TextInput";
import PasswordInput from "../../commons/components/Input/PasswordInput";
import Button from "../../commons/components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const form = useForm<FormValues>();
  const { handleSubmit, setError } = form;
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
      role: ["user"],
    };
    try {
      // await login(signInData);
      navigate("/dashboard");
    } catch (error: unknown) {
      console.error(error);

      setError("email", {
        type: "manual",
      });
      setError("password", {
        type: "manual",
        message: "The email or password is incorrect",
      });
    }
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[436px] h-auto py-6 px-4 m-auto bg-white rounded-xl shadow-dropShadow">
        <img src={logoWithText} alt="logo-with-text" className="mb-6 mx-auto" />
        <FormProvider {...form}>
          <form
            onSubmit={onSubmit}
            id="sign-in-form"
            className="space-y-5 mb-9 group"
            noValidate
          >
            <TextInput
              id="email"
              placeholder="Email"
              additionalValidation={{
                required: {
                  value: true,
                },
              }}
            />
            <PasswordInput
              id="password"
              placeholder="Password"
              additionalValidation={{
                required: {
                  value: true,
                },
              }}
            />

            <Button
              buttonType="submit"
              id="submit-button"
              text="Sign In"
              type="submit"
              className="w-full"
            />
          </form>
        </FormProvider>
        <div className="flex flex-col text-center">
          <a
            className="cursor-pointer"
            onClick={() => navigate("/forget-password")}
          >
            Forget Password?
          </a>
          <label className="font-light">
            Not a member yet?{" "}
            <a
              className="text-[#F58634] font-normal cursor-pointer"
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </a>
          </label>
        </div>
      </div>
    </div>
  );
}
