import { useState, FormEvent } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrewwknz";

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("source", "contact-section");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="lead-form lead-form--success">
        <h3>Thank you!</h3>
        <p>Your details have been received. A BCAS counselor will reach out to you shortly.</p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <h3>Start Your Study Abroad Journey</h3>
      <p className="lead-form__subtitle">
        Tell us a bit about yourself and we'll get in touch.
      </p>

      <div className="lead-form__row">
        <label htmlFor="name">Full Name</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>

      <div className="lead-form__row">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="lead-form__row">
        <label htmlFor="phone">Phone Number</label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" />
      </div>

      <div className="lead-form__row">
        <label htmlFor="destination">Preferred Destination</label>
        <select id="destination" name="destination" defaultValue="">
          <option value="" disabled>
            Select a destination
          </option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="UK">United Kingdom</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>

      <div className="lead-form__row">
        <label htmlFor="course">Course / Field of Interest</label>
        <input id="course" name="course" type="text" placeholder="e.g. Business, Engineering, Nursing" />
      </div>

      <div className="lead-form__row">
        <label htmlFor="message">Message (optional)</label>
        <textarea id="message" name="message" rows={3} />
      </div>

      {status === "error" && (
        <p className="lead-form__error">
          Something went wrong submitting your form. Please try again, or contact us directly.
        </p>
      )}

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
