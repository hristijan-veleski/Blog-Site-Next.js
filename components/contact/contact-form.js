import { useEffect, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendData({ email, name, message }) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify({
      email,
      name,
      message,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.message || "Something went wrong");
  }
}

function ContactForm() {
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  async function onSubmitHandler(event) {
    event.preventDefault();

    const { email, name, message } = event.target.elements;

    setRequestStatus("pending");

    try {
      await sendData({
        email: email.value,
        name: name.value,
        message: message.value,
      });
      setRequestStatus("success");
      setRequestError(null);
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  useEffect(() => {
    let timer;

    if (requestStatus === "error" || requestStatus === "success") {
      timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [requestStatus]);

  let notification;
  if (requestStatus === "pending") {
    notification = {
      title: "Pengind",
      status: "pending",
      message: "Message is being sent...",
    };
  }

  if (requestStatus === "success") {
    notification = {
      title: "Success!",
      status: "success",
      message: "Message is sent!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      title: "Error",
      status: "error",
      message: requestError || "Something went wrong",
    };
  }

  return (
    <section className={classes.contact}>
      <h1>Hi, how can i help you</h1>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input id="email" type="email" />
          </div>

          <div className={classes.control}>
            <label htmlFor="name">Your name</label>
            <input id="name" type="text" />
          </div>

          <div className={classes.control}>
            <label htmlFor="message">Your message</label>
            <textarea id="message" rows="5" />
          </div>
        </div>

        <div className={classes.actions}>
          <button>Send message</button>
        </div>

        {notification && <Notification {...notification} />}
      </form>
    </section>
  );
}

export default ContactForm;
