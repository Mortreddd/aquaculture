import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthProps, useAuth } from "@/providers/AuthProvider";
import DangerAlert from "@/components/common/alerts/DangerAlert";

interface RegisterProps extends AuthProps {
  confirmPassword: string;
}
export default function Register() {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { isSubmitSuccessful, isSubmitting, errors },
  } = useForm<RegisterProps>();
  const password = watch("password");

  const { login, loginWithGoogle } = useAuth();

  const onSubmit: SubmitHandler<RegisterProps> = async (data) => {
    const { email, password } = data;
    login(email, password);
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
            <h1 className="text-2xl font-sans font-semibold">Sign Up</h1>

            {errors.root && (
              <div className="space-y-2">
                <DangerAlert>{errors.root?.message}</DangerAlert>
              </div>
            )}
            <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Enter a valid email",
                    },
                  })}
                  placeholder="Email"
                  className="w-full"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  placeholder="Password"
                  className="w-full"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="w-full"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="md:mt-5 mt-2">
                <Button
                  variant="secondary"
                  type="submit"
                  loading={isSubmitting}
                  className="w-full"
                >
                  Sign Up
                </Button>
              </div>
            </form>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <span className="h-[1px] w-1/4 bg-gray-300"></span>
              <span className="text-sm font-sans font-semibold">Or</span>
              <span className="h-[1px] w-1/4 bg-gray-300"></span>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <Button
                variant="danger"
                onClick={loginWithGoogle}
                className="w-fit"
              >
                Sign Up with Google
              </Button>
            </div>
            <p className="mt-4 text-sm font-sans font-semibold text-center">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-info">
                Sign In
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
