import { message } from "antd";
import { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
    useResetPasswordMutation,
    useUserLoginMutation,
} from "../../redux/api/authApi";
import { decodeToken } from "../../utils/jwt";
import { useMessageEffect } from "../../utils/messageSideEffect";
import SocialSignUp from "./SocialSignUp";

const SignIn = ({ handleResponse }) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [infoError, setInfoError] = useState("");
  const [show, setShow] = useState(true);
  const [forgotEmail, setForgotEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [userLogin, { isLoading }] = useUserLoginMutation();

  const [
    resetPassword,
    {
      isError: resetIsError,
      isSuccess: resetIsSuccess,
      error: resetError,
      isLoading: resetIsLoading,
    },
  ] = useResetPasswordMutation();

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 12000);

    return () => clearTimeout(t);
  }, []);

  const onSubmit = async (formData) => {
    setInfoError("");

    try {
      // 1. Login request
      const result = await userLogin(formData).unwrap();

      // 2. Make sure backend returned a token
      if (!result?.accessToken) {
        throw new Error("Login succeeded but no access token was returned.");
      }

      // 3. Decode token BEFORE showing success
      const payload = decodeToken(result.accessToken);

      if (!payload) {
        throw new Error("Invalid access token.");
      }

      // 4. Only show success after everything above succeeds
      message.success("Successfully Logged in");

      // 5. Redirect according to role
      if (payload.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);

      const msg = err?.data?.message || err?.message || "Login failed";

      message.error(msg);

      setInfoError(typeof msg === "string" ? msg : "Login failed");
    }
  };

  const onHandleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      await resetPassword({
        email: forgotEmail,
      }).unwrap();

      setForgotEmail("");
      setShowForgotPassword(false);
    } catch (err) {
      console.error("Reset password error:", err);
    }
  };

  useMessageEffect(
    resetIsLoading,
    resetIsSuccess,
    resetIsError,
    resetError,
    "Successfully Reset Password, Please check your Email!!",
  );

  const handleShowForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  return (
    <>
      {showForgotPassword ? (
        <form className="sign-in-form" onSubmit={onHandleForgotPassword}>
          <h2 className="title">Forgot Password</h2>

          <div>To Forgot Your Password Please Enter your email</div>

          <div className="input-field">
            <span className="fIcon">
              <FaEnvelope />
            </span>

            <input
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter Your Email"
              type="email"
              required
            />
          </div>

          <div
            onClick={handleShowForgotPassword}
            className="text-bold"
            style={{
              cursor: "pointer",
              color: "#4C25F5",
            }}
          >
            Still Remember Password?
          </div>

          <button className="iBtn" type="submit">
            {resetIsLoading ? (
              <Spinner animation="border" variant="info" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      ) : (
        <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
          <Toast
            show={show}
            onClose={() => setShow(false)}
            className="signInToast"
          >
            <Toast.Header>
              <strong className="mr-auto">Fair use &amp; demo access</strong>
            </Toast.Header>

            <Toast.Body>
              <p className="mb-2 small">
                Please do not misuse this app. Do not create extra accounts
                unless you need them for testing. Respect others&apos; data and
                availability.
              </p>

              <hr />

              <div className="small mb-2">
                <strong>Patient</strong> — sign in with your registered email
                and password.
              </div>

              <div className="bg-dark text-white p-2 px-3 rounded small mb-2">
                <strong>Doctor</strong>
                <br />
                email: doctor@gmail.com
                <br />
                password: 123456
              </div>

              <div className="bg-secondary text-white p-2 px-3 rounded small mb-2">
                <strong>Admin</strong>
                <br />
                Use an Auth row with role = admin.
              </div>

              <div className="bg-primary p-2 rounded text-white small">
                Replace demo emails/passwords with your own seeded users as
                needed.
              </div>
            </Toast.Body>
          </Toast>

          <h2 className="title">Sign in</h2>

          {/* Email */}
          <div className="input-field">
            <span className="fIcon">
              <FaEnvelope />
            </span>

            <input
              {...register("email", {
                required: true,
              })}
              placeholder="Enter Your Email"
              type="email"
            />
          </div>

          {errors.email && (
            <span className="text-danger">This field is required</span>
          )}

          {/* Password */}
          <div className="input-field">
            <span className="fIcon">
              <FaLock />
            </span>

            <input
              {...register("password", {
                required: true,
              })}
              type="password"
              placeholder="Enter Your Password"
            />
          </div>

          {errors.password && (
            <span className="text-danger">This field is required</span>
          )}

          {/* Login error */}
          {infoError && <p className="text-danger">{infoError}</p>}

          {/* Forgot password */}
          <div
            onClick={handleShowForgotPassword}
            className="text-bold"
            style={{
              cursor: "pointer",
              color: "#4C25F5",
            }}
          >
            Forgot Password?
          </div>

          {/* Login button */}
          <button className="iBtn" type="submit">
            {isLoading ? (
              <Spinner animation="border" variant="info" />
            ) : (
              "Sign In"
            )}
          </button>

          <p className="social-text">Or Sign in with social platforms</p>

          <SocialSignUp handleResponse={handleResponse} />
        </form>
      )}
    </>
  );
};

export default SignIn;
