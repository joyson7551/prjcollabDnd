import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../features/auth/authApi";
import { setCredentials } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [registerUser] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await registerUser(data).unwrap();
      // console.log(response, '<=== the response print here..')
      dispatch(setCredentials({ token: response.token, user: response.user }));
      navigate('/projects', {replace:true})
    } catch (error) {
      console.error("Registration Failed..", error.message);
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
          <h2 className="text-2xl font-bold mb-8">Create your account</h2>

          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Name is required..",
                maxLength: {
                  value: 20,
                  message: "Name cannot exceed 20 charectors",
                },
                pattern: {
                  value: /^[A-Z][a-z]*\s[A-Z][a-z]*$/
,
                  message: "First letter must be uppercase..",
                },
              })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Firstname Lastname"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

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
            Register
          </button>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-white hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
