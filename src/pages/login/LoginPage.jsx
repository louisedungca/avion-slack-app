import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useFetchAuth } from "../../hooks";
import { loginUrl } from "../../utils";
import * as c from "../../components";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();
  const { handleRequest, error } = useFetchAuth();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        userPassword: "",
      });
    }
  }, [isSubmitSuccessful]);

  async function onSubmit(formData) {
    const { userEmail, userPassword } = formData;

    try { 
      await handleRequest(loginUrl, {
        method: "POST",
        body: {
          email: userEmail,
          password: userPassword,
        },
      });

    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <section className="login-page">
      <c.WelcomeNavbar />
      <div className="page-leftbox">
        <h1>Say hello to your people now.</h1>

        <div className="form-wrapper">
          <form onSubmit={handleSubmit(onSubmit)} className="form-content">
            {c.loginInput.map((input) =>
              c.inputFieldTemplate(input, register, errors)
            )}

            <button type="submit" className="btn-main">
              Login
            </button>
          </form>
        </div>

        <small className="error-text">{error}</small>

        <Link to={"/signup"} className="afterform-text">
          <p>No account yet? Sign up here.</p>
        </Link>
      </div>
      <div className="page-rightbox"></div>
    </section>
  );
}

export default LoginPage;
