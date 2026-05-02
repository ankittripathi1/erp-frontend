"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AuthUser,
  Employee,
  clearSession,
  fullName,
  getMe,
  initials,
  listEmployees,
  readStoredUser,
  readToken,
} from "../lib/api";

export default function EmployeesPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadEmployees() {
      const storedToken = readToken();

      if (!storedToken) {
        router.replace("/login");
        return;
      }

      setIsLoading(true);
      setError("");
      setUser(readStoredUser());

      try {
        const [freshUser, result] = await Promise.all([
          getMe(storedToken),
          listEmployees({ token: storedToken, page, search }),
        ]);

        if (cancelled) return;

        setUser(freshUser);
        setEmployees(result.data);
        setMeta(result.meta);
      } catch (err) {
        if (cancelled) return;

        if (err instanceof Error && err.message === "Unauthorized") {
          clearSession();
          router.replace("/login");
          return;
        }

        setError(err instanceof Error ? err.message : "Employees failed to load.");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadEmployees();

    return () => {
      cancelled = true;
    };
  }, [page, router, search]);

  const activeCount = useMemo(
    () => employees.filter((employee) => employee.status === "active").length,
    [employees],
  );

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  function signOut() {
    clearSession();
    router.replace("/");
  }

  return (
    <main className="app-frame">
      <aside className="sidebar">
        <Link href="/" className="brand-mark">
          <span>U</span>
          <strong>Universitas</strong>
        </Link>

        <nav className="side-nav" aria-label="Main">
          <Link href="/employees" className="active">
            Employees
          </Link>
          <span>Students</span>
          <span>Academics</span>
          <span>Fees</span>
          <span>Settings</span>
        </nav>

        <div className="side-user">
          <small>Signed in</small>
          <strong>{user?.username ?? "Loading..."}</strong>
          <button type="button" onClick={signOut}>
            Sign out
          </button>
        </div>
      </aside>

      <section className="workspace">
        <header className="workspace-header">
          <div>
            <p className="eyebrow">Employee operations</p>
            <h1>Employees</h1>
            <p>
              Faculty, administrators, and staff records connected to roles,
              departments, and designations.
            </p>
          </div>

          <button className="button button-primary" type="button">
            Onboard employee
          </button>
        </header>

        <section className="metric-strip" aria-label="Employee summary">
          <div>
            <span>Total records</span>
            <strong>{meta.total.toLocaleString("en-IN")}</strong>
          </div>
          <div>
            <span>Visible active</span>
            <strong>{activeCount.toLocaleString("en-IN")}</strong>
          </div>
          <div>
            <span>Current page</span>
            <strong>
              {meta.page} / {meta.totalPages || 1}
            </strong>
          </div>
        </section>

        <section className="data-surface">
          <div className="table-toolbar">
            <form onSubmit={submitSearch} className="search-form">
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search name, email, status, or employee number"
              />
              <button className="button button-secondary" type="submit">
                Search
              </button>
            </form>
            {search ? (
              <button
                className="text-button"
                type="button"
                onClick={() => {
                  setSearch("");
                  setSearchInput("");
                  setPage(1);
                }}
              >
                Clear search
              </button>
            ) : null}
          </div>

          {isLoading ? (
            <EmployeeSkeleton />
          ) : error ? (
            <StateMessage
              title="Employees could not load"
              message={error}
              tone="danger"
            />
          ) : employees.length === 0 ? (
            <StateMessage
              title={search ? "No employees match this search" : "No employees yet"}
              message={
                search
                  ? "Try a name, username, employment type, status, or employee number."
                  : "Use onboarding to create the first staff record when the workflow is ready."
              }
            />
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Designation</th>
                    <th>Department</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>
                        <div className="employee-cell">
                          <span className="avatar">{initials(employee)}</span>
                          <span>
                            <strong>{fullName(employee)}</strong>
                            <small>{employee.employee_no}</small>
                          </span>
                        </div>
                      </td>
                      <td>
                        <strong className="cell-primary">
                          {employee.designation?.name ?? "Unassigned"}
                        </strong>
                        <small>{formatValue(employee.designation?.category)}</small>
                      </td>
                      <td>{employee.department?.name ?? "No department"}</td>
                      <td>{formatValue(employee.employment_type)}</td>
                      <td>
                        <span className={`status-pill ${employee.status}`}>
                          {formatValue(employee.status)}
                        </span>
                      </td>
                      <td>{formatDate(employee.joining_date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="pagination">
            <span>
              Page {meta.page} of {meta.totalPages || 1}
            </span>
            <div>
              <button
                className="button button-secondary"
                type="button"
                disabled={page <= 1 || isLoading}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                Previous
              </button>
              <button
                className="button button-secondary"
                type="button"
                disabled={page >= meta.totalPages || isLoading}
                onClick={() => setPage((current) => current + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function EmployeeSkeleton() {
  return (
    <div className="skeleton-list" aria-label="Loading employees">
      {Array.from({ length: 7 }).map((_, index) => (
        <div className="skeleton-row" key={index}>
          <span />
          <span />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}

function StateMessage({
  title,
  message,
  tone,
}: {
  title: string;
  message: string;
  tone?: "danger";
}) {
  return (
    <div className={`state-message ${tone ?? ""}`}>
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  );
}

function formatValue(value?: string) {
  if (!value) return "Not set";
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDate(value?: string) {
  if (!value) return "Not set";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
