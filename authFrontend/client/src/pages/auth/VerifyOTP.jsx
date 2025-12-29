import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "./../../hooks/auth";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { verifyOtp } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { otp: ["", "", "", "", "", ""] },
  });

  const inputsRef = useRef([]);
  const otpValues = watch("otp");

  const onSubmit = async () => {
    // Convert otp object/array to string safely
    const values = getValues("otp"); // ensures we get current values
    const otpArray = Array.isArray(values)
      ? values
      : Object.values(values || {});
    const otp = otpArray.join("");
    const email = sessionStorage.getItem("email");

    if (!email) return navigate("/register");

    try {
      await verifyOtp({ email, otp }); // send string
      setValue("otp", ["", "", "", "", "", ""]);
      inputsRef.current[0]?.focus();
      sessionStorage.removeItem("email");
      navigate("/login");
    } catch (error) {
      setValue("otp", ["", "", "", "", "", ""]);
      inputsRef.current[0]?.focus();
    }
  };

  const handleInputChange = (index, value) => {
    const newValue = value.slice(-1);
    if (/^\d*$/.test(newValue)) {
      const current = getValues("otp");
      const otpArray = Array.isArray(current)
        ? [...current]
        : Object.values(current || {});
      otpArray[index] = newValue;
      setValue("otp", otpArray);

      if (newValue && index < 5) inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const otpArray = pastedData
        .split("")
        .concat(Array(6).fill(""))
        .slice(0, 6);
      setValue("otp", otpArray);
      const nextIndex = Math.min(pastedData.length, 5);
      inputsRef.current[nextIndex]?.focus();
    }
  };

  const isDisabled = otpValues.some((digit) => digit === "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-outfit mb-6 text-gray-800 font-semibold">
          OTP Verification
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between mb-6 gap-2">
            {otpValues.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                inputMode="numeric"
                {...register(`otp.${index}`)}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-14 h-14 text-center border-2 border-gray-300 rounded-lg text-xl focus:border-blue-500 focus:ring focus:ring-blue-200 transition outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              isDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
