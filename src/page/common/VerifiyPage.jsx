import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

// Simple OTP verification component (6 digits)
// Props:
//  - redirectTo (string) default '/dashboard'
//  - onVerify (async function) optional - receives the otp string and should return true/false
// If onVerify is not provided, component simulates a successful verification with a short delay.

export default function OTPVerification({ redirectTo = "/", onVerify = null }) {
  const navigate = useNavigate?.() ?? ((to) => (window.location.href = to));
  const DIGITS = 6;
  const [values, setValues] = useState(Array(DIGITS).fill("") );
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {setUser, setToken} = useAuth();

  // Focus first input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus?.();
  }, []);

  // When all digits set, auto-submit
  useEffect(() => {
    if (values.every((v) => v !== "")) {
      submitOTP(values.join(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.join("")]);
  useEffect(()=> {
    alert(error)
  }, [error]);

  const handleChange = (e, idx) => {
    const char = e.target.value;
    if (!char) {
      updateValue("", idx);
      return;
    }

    // Accept only the first numeric character
    const matched = char.match(/\d/);
    if (!matched) return;
    const digit = matched[0];

    updateValue(digit, idx);
    // move focus to next
    const next = idx + 1;
    if (next < DIGITS) inputsRef.current[next]?.focus?.();
  };

  const updateValue = (val, idx) => {
    setValues((prev) => {
      const copy = [...prev];
      copy[idx] = val;
      return copy;
    });
  };

  const handleKeyDown = (e, idx) => {
    const key = e.key;
    if (key === "Backspace") {
      if (values[idx] === "") {
        const prev = idx - 1;
        if (prev >= 0) {
          updateValue("", prev);
          inputsRef.current[prev]?.focus?.();
        }
      } else {
        updateValue("", idx);
      }
      e.preventDefault();
    }

    if (key === "ArrowLeft") {
      const prev = idx - 1;
      if (prev >= 0) inputsRef.current[prev]?.focus?.();
      e.preventDefault();
    }
    if (key === "ArrowRight") {
      const next = idx + 1;
      if (next < DIGITS) inputsRef.current[next]?.focus?.();
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    const digits = paste.replace(/\D/g, "").slice(0, DIGITS).split("");
    if (digits.length === 0) return;
    setValues((prev) => {
      const copy = [...prev];
      for (let i = 0; i < DIGITS; i++) {
        copy[i] = digits[i] ?? "";
      }
      return copy;
    });
  };

  const submitOTP = async (otp) => {
    setError("");
    setLoading(true);
    try {
      let ok = true;
    //   if (onVerify) {
    //     ok = await onVerify(otp);
    //   } else {
    //     // simulate server verification delay
    //     await new Promise((r) => setTimeout(r, 900));
    //     ok = true;
    //   }

      if (ok) {
        // redirect
        const data = await axios.get('http://localhost:8080/auth/getToken');
        const {accountSample, accessTokenPayload} = data.data;
        setUser(accountSample);
        setToken(accessTokenPayload);
        navigate(redirectTo);
      } else {
        setError("Mã OTP không đúng. Vui lòng thử lại.");
        setValues(Array(DIGITS).fill(""));
        inputsRef.current[0]?.focus?.();
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-2">Xác thực email</h2>
        <p className="text-sm text-gray-500 mb-6">Nhập mã 6 chữ số đã gửi vào email của bạn.</p>

        <div className="flex items-center justify-between gap-2 mb-4">
          {values.map((val, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              value={val}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={idx === 0 ? handlePaste : undefined}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              className="w-full h-14 text-center text-xl font-medium border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1"
              aria-label={`OTP digit ${idx + 1}`}
              disabled={loading}
            />
          ))}
        </div>

        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        <button
          onClick={() => submitOTP(values.join(""))}
          disabled={loading || values.some((v) => v === "")}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium disabled:opacity-50"
        >
          {loading ? "Đang xác thực..." : "Xác thực"}
        </button>

        <div className="mt-4 text-center text-sm text-gray-500">
          <button
            className="underline"
            onClick={() => {
              // simple resend simulation
              setValues(Array(DIGITS).fill(""));
              setError("");
              inputsRef.current[0]?.focus?.();
            }}
          >
            Gửi lại mã
          </button>
        </div>
      </div>
    </div>
  );
}
