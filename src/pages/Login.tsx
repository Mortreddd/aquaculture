import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Checkbox from "../components/common/Checkbox";
import { AuthProps, useAuth } from "@/providers/AuthProvider";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Login() {
  const { loginWithGoogle, login } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<AuthProps>();

  const onSubmit: SubmitHandler<AuthProps> = async (data) => {
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
            <h1 className="text-2xl font-sans font-semibold">Sign In</h1>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Input
                  {...register("email")}
                  type="email"
                  placeholder={"Enter email"}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Input
                  {...register("password")}
                  type="password"
                  placeholder={"Enter password"}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-sans font-semibold"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-sans font-semibold text-info transition-colors duration-200 ease-in-out hover:text-info/80"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="md:mt-5 mt-2">
                <Button
                  variant="secondary"
                  loading={isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  Sign In
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
                variant={"danger"}
                onClick={loginWithGoogle}
                className="w-fit"
              >
                Sign In with Google
              </Button>
            </div>
            <p className="mt-4 text-sm font-sans font-semibold text-center">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-info">
                Sign Up
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
