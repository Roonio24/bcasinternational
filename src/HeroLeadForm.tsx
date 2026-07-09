import { useState, FormEvent } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrewwknz";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Compact quick-capture form for the hero section.
 * Collects just enough to start a conversation — name, email, destination.
 * Tags the submission with source=hero so you can tell it apart from the
 * full contact form in Formspree's dashboard/email.
 */
export default function HeroLeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("source", "hero");

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
      <div className="hero-lead-form hero-lead-form--success">
        <p>Thanks! We'll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form className="hero-lead-form" onSubmit={handleSubmit}>
      <div className="hero-lead-form__fields">
        <input name="name" type="text" placeholder="Full name" required autoComplete="name" />
        <input name="email" type="email" placeholder="Email address" required autoComplete="email" />
        <select name="destination" defaultValue="">
          <option value="" disabled>
            Destination
          </option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="UK">UK</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Get Started"}
        </button>
      </div>

      {status === "error" && (
        <p className="hero-lead-form__error">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
