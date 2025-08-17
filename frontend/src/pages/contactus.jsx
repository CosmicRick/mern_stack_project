import React, { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // { type: 'success'|'error', text: string }
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim() || form.name.trim().length < 2) {
      return "Please provide a valid name.";
    }
    // simple email check
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) {
      return "Please provide a valid email address.";
    }
    if (!form.message.trim() || form.message.trim().length < 5) {
      return "Message must be at least 5 characters.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const err = validate();
    if (err) {
      setStatus({ type: "error", text: err });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Request failed (${res.status})`);
      }

      setStatus({ type: "success", text: "Message sent. We'll be in touch soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", text: error.message || "Failed to send message." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 20 }}>
      <h1>Contact Us</h1>
      <p>If you have questions, feedback or need support, send us a message below.</p>

      {status && (
        <div
          role="alert"
          style={{
            marginBottom: 16,
            padding: 12,
            borderRadius: 6,
            color: status.type === "success" ? "#0b6623" : "#7a1f1f",
            background: status.type === "success" ? "#e6f4ea" : "#fdecea",
            border: `1px solid ${status.type === "success" ? "#bde7c9" : "#f5c2c2"}`,
          }}
        >
          {status.text}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <label style={{ display: "block", marginBottom: 8 }}>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            style={{
              display: "block",
              width: "100%",
              padding: "8px 10px",
              marginTop: 6,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            style={{
              display: "block",
              width: "100%",
              padding: "8px 10px",
              marginTop: 6,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 12 }}>
          Message
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            placeholder="How can we help?"
            rows={6}
            style={{
              display: "block",
              width: "100%",
              padding: "8px 10px",
              marginTop: 6,
              borderRadius: 4,
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 16px",
            borderRadius: 6,
            border: "none",
            background: "#0366d6",
            color: "white",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}