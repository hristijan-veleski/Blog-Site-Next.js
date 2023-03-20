import Head from "next/head";
import { Fragment } from "react";
import ContactForm from "../components/contact/contact-form";

function Contact() {
  return (
    <Fragment>
      <Head>
        <title>The Contact page</title>
        <meta name="description" content="Contact page" />
      </Head>
      <ContactForm />
    </Fragment>
  );
}

export default Contact;
