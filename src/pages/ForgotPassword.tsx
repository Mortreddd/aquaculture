import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useAuth } from "@/providers/AuthProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

interface ForgotPasswordProps {
  email: string;
}

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordProps>();

  useEffect(() => {
    if (currentUser !== null) {
      navigate("/", { replace: true });
    }
  }, []);

  const onSubmit: SubmitHandler<ForgotPasswordProps> = async (data) => {
    try {
      await forgotPassword(data.email);
    } catch (error) {
      console.error("Error occured:", error);
    }
  };
  return (
    <main className="w-full h-[100dvh] antialiased">
      <div className="w-full h-full flex">
        <section className="h-full hidden lg:flex w-[35dvw] bg-secondary">
          <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-white text-4xl font-sans font-semibold">
              Welcome Back!
            </h1>
          </div>
        </section>
        <section className="h-full flex w-full lg:w-[65dvw] items-center justify-center">
          <div className="w-full max-w-md p-8 bg-[#202425] rounded-lg shadow-lg">
            <h1 className="text-xl md:text-2xl font-sans font-semibold">
              Forgot Password
            </h1>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  type="email"
                  placeholder={"Enter email"}
                  className="w-full"
                />
              </div>
              <div className="md:mt-5 mt-2">
                <Button
                  variant="secondary"
                  loading={isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
