import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Contact() {
  const form = useRef();

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Minimum 3 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    subject: Yup.string()
      .required("Subject is required"),

    message: Yup.string()
      .min(10, "Minimum 10 characters")
      .required("Message is required"),
  });

  const sendEmail = (values, { resetForm, setSubmitting }) => {
    emailjs
      .sendForm(
        "service_xwas95h",
        "template_7lpqkni",
        form.current,
        "qIeNwjL4QAFjhMlyj"
      )
      .then(() => {
        alert("Email Sent Successfully!");
        resetForm();
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to send email.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={sendEmail}
      >
        {({ isSubmitting }) => (
          <Form ref={form}>

            <div>
              <label>Name</label>

              <Field
                type="text"
                name="name"
                placeholder="Enter Name"
              />

              <ErrorMessage
                name="name"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div>
              <label>Email</label>

              <Field
                type="email"
                name="email"
                placeholder="Enter Email"
              />

              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div>
              <label>Subject</label>

              <Field
                type="text"
                name="subject"
                placeholder="Subject"
              />

              <ErrorMessage
                name="subject"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div>
              <label>Message</label>

              <Field
                as="textarea"
                name="message"
                rows="5"
                placeholder="Write Message"
              />

              <ErrorMessage
                name="message"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <br />

            <button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Contact;