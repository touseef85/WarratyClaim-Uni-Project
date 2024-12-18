import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";  // Import ToastContainer
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";  // Import toast CSS

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  // Submit handler
  const onSubmit = (data, e) => {
    console.log(data);
    toast.success("Sign Up Successful");
    e.target.reset();
  };

  // Toast notifications for individual field validation errors
  const showToastForFieldError = (fieldName, errorMessage) => {
    if (errorMessage) {
      toast.error(errorMessage);  // Show toast for the specific validation error
    }
  };

  // Trigger toast notifications when form has errors
  const onError = () => {
    // This is kept in case we want to handle global form errors later
  };

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  return (
    <div className="text-[#7A6960] min-h-screen flex flex-col justify-center items-center">
      <h1 data-aos="fade-right" className="text-3xl font-semibold text-center">
        Sign Up
      </h1>
      <div className="flex justify-center items-center mt-2">
        <div className="bg-orange-600 h-1 w-16 rounded"></div>
      </div>
      <p className="text-gray-700 text-center mt-7 mb-10 text-lg">
        Create an account to get started
      </p>

      <div className="flex justify-center items-center w-full">
        {/* SignUp Form Section */}
        <div
          data-aos="fade-up"
          data-aos-duration="1600"
          className="lg:w-[60%] px-10 py-5 shadow-xl border-t-[3px] border-b-[3px] border-orange-600"
        >
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {/* Username Field */}
            <div>
              <label htmlFor="username">Username</label>
              <input
                {...register("username", { 
                  required: "Username is required",
                })}
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full h-10 px-3 my-3 rounded border border-zinc-300 focus:border focus:border-orange-600 outline-none"
                onBlur={(e) => showToastForFieldError("username", e.target.validationMessage)}  // Trigger toast onBlur
              />
              {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email">Email</label>
              <input
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  }
                })}
                type="email"
                id="email"
                placeholder="johndoe@gmail.com"
                className="w-full h-10 px-3 my-3 rounded border border-zinc-300 focus:border focus:border-orange-600 outline-none"
                onBlur={(e) => showToastForFieldError("email", e.target.validationMessage)}  // Trigger toast onBlur
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password">Password</label>
              <input
                {...register("password", { 
                  required: "Password is required", 
                  minLength: { 
                    value: 6, 
                    message: "Password must be at least 6 characters long" 
                  } 
                })}
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full h-10 px-3 my-3 rounded border border-zinc-300 focus:border focus:border-orange-600 outline-none"
                onBlur={(e) => showToastForFieldError("password", e.target.validationMessage)}  // Trigger toast onBlur
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: (value) => value === watch('password') || "Passwords don't match",
                })}
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                className="w-full h-10 px-3 my-3 rounded border border-zinc-300 focus:border focus:border-orange-600 outline-none"
                onBlur={(e) => showToastForFieldError("confirmPassword", e.target.validationMessage)}  // Trigger toast onBlur
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
            </div>

            <div className="flex justify-center m-6">
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition-all"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default SignUp;
