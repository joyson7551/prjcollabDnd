import { useForm } from "react-hook-form";
import { useLoginMutation } from "../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

export default function Login() {
  const [loginUser] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await loginUser(data).unwrap();
      console.log(response,'<-- response will print here')
      dispatch(setCredentials({
        token: response.token,
        user: response.user
      }));
      navigate('/projects')
    } catch (error) {
      console.log(error.message, 'failed to login')
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex pt-20">
      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">Welcome to</h1>
          <h2 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Collab App
          </h2>
          <p className="mt-6 text-gray-300">
            Join thousands of teams collaborating seamlessly on projects.
          </p>
        </div>
      </div>

      <div className="w-1/2 bg-black flex items-center justify-center p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-8">Login in to your account</h2>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition duration-200"
          >
            Login
          </button>

          <p className="mt-6 text-center text-gray-400">
            Not Registered yet?{' '}
            <a href="/register" className="text-white hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
