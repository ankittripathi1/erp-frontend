"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { login, readToken, storeSession } from "../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (readToken()) {
      router.replace("/employees");
    }
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Enter your username and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const session = await login(username.trim(), password);
      storeSession(session);
      router.replace("/employees");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <Link href="/" className="brand-mark" aria-label="Universitas home">
          <span>U</span>
          <strong>Universitas</strong>
        </Link>

        <div className="login-copy">
          <p className="eyebrow">Administrative portal</p>
          <h1>Sign in to the operating layer.</h1>
          <p>
            Manage employee records, academic structures, and institutional
            workflows from one controlled workspace.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Username</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              placeholder="admin"
            />
          </label>

          <label>
            <span>Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              placeholder="Enter password"
              type="password"
            />
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <button className="button button-primary button-wide" type="submit">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>

      <aside className="login-display" aria-hidden="true">
        <div className="login-ledger">
          <div className="ledger-heading">
            <span>Today</span>
            <strong>Institution control room</strong>
          </div>
          {[
            ["Employee profile verified", "HR"],
            ["Academic year active", "Registrar"],
            ["Fee batch reconciled", "Accounts"],
            ["Library policy updated", "Admin"],
          ].map(([item, team]) => (
            <div className="ledger-row" key={item}>
              <span>{item}</span>
              <small>{team}</small>
            </div>
          ))}
        </div>
      </aside>
    </main>
  );
}
