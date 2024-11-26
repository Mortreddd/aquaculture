import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { AuthProps, useAuth } from "@/providers/AuthProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

export default function Login() {
  const { loginWithGoogle, login } = useAuth();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<AuthProps>();

  useEffect(() => {
    if (currentUser !== null) {
      navigate("/", { replace: true });
    }
  }, [currentUser]);

  const onSubmit: SubmitHandler<AuthProps> = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to login. Check your credentials.");
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
              Sign In
            </h1>
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
              <div className="flex items-center justify-end">
                <Link
                  to="/auth/forgot-password"
                  target="_blank"
                  className="md:text-sm text-xs  font-sans font-semibold text-info transition-colors duration-200 ease-in-out hover:text-info/80"
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
