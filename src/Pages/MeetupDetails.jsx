import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const API_BASE_URL = "https://meet-up-events-backend.vercel.app"; 

// Helper: format date nicely
function formatEventDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [attendeeInput, setAttendeeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [error, setError] = useState("");
  const [rsvpError, setRsvpError] = useState("");

  const [toast, setToast] = useState("");

  // Helper: fetch a single event
  async function fetchEvent() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE_URL}/events/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch event");
      }
      const data = await res.json();
      setEvent(data);
    } catch (err) {
      console.error("Error fetching event:", err);
      setError(err.message || "Failed to load event");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Helper: handle RSVP submit
  async function handleRsvp(e) {
    e.preventDefault();
    setRsvpError("");

    if (!attendeeInput.trim()) {
      setRsvpError("Please enter your name or email to RSVP.");
      return;
    }

    try {
      setRsvpLoading(true);
      const res = await fetch(`${API_BASE_URL}/events/${id}/rsvp`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attendee: attendeeInput.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to RSVP");
      }

      const updatedEvent = await res.json();
      setEvent(updatedEvent);
      setAttendeeInput("");

      setToast("RSVP submitted successfully!");
      setTimeout(() => setToast(""), 2000);
    } catch (err) {
      console.error("Error sending RSVP:", err);
      setRsvpError(err.message || "Failed to RSVP");
    } finally {
      setRsvpLoading(false);
    }
  }
      async function handleDelete() {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this event?"
      );

      if (!confirmDelete) return;

      try {
        const res = await fetch(`${API_BASE_URL}/events/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to delete event");
        }

        alert("Event deleted successfully!");
        window.location.href = "/";
      } catch (err) {
        console.error("Delete error:", err);
        alert(err.message);
      }
    }


  return (
    <>
      <Header />

      {toast && <div className="simple-toast">{toast}</div>}

      <main className="bg-light py-4">
        <div className="container">
          {loading && (
            <div className="d-flex justify-content-center my-5">
              <div className="spinner-border text-danger" role="status"></div>
            </div>
          )}
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          <button 
            className="btn btn-outline-secondary mb-3"
            onClick={() => window.history.back()}
          >
            ← Back
          </button>


          {event && (
            <div className="card shadow-sm">
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  className="card-img-top"
                  alt={event.title}
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h2 className="card-title fw-bold mb-2">{event.title}</h2>
                <p className="text-muted mb-1">
                  {formatEventDate(event.date)}
                </p>
                <p className="text-muted mb-3">
                  <i className="bi bi-geo-alt-fill me-1"></i>
                  {event.location}
                </p>

                <p className="card-text mb-3">{event.description}</p>

                <div className="mb-3 d-flex flex-wrap gap-2">
                  {(event.tags || []).map((tag, idx) => (
                    <span className="badge bg-secondary" key={idx}>
                      {tag}
                    </span>
                  ))}
                </div>

                <hr />

                {/* RSVP section */}
                <section className="mb-3">
                  <h5>RSVP</h5>
                  <form className="row g-2" onSubmit={handleRsvp}>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name or email"
                        value={attendeeInput}
                        onChange={(e) => setAttendeeInput(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <button
                        type="submit"
                        className="btn btn-danger w-100"
                        disabled={rsvpLoading}
                      >
                        {rsvpLoading ? "Submitting..." : "RSVP"}
                      </button>
                    </div>
                  </form>
                  {rsvpError && (
                    <div className="mt-2 alert alert-danger py-1">
                      {rsvpError}
                    </div>
                  )}
                </section>

                {/* Attendees list */}
                <section>
                  <h6 className="mb-1">
                    Attendees ({event.attendees?.length || 0})
                  </h6>
                  {event.attendees && event.attendees.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {event.attendees.map((att, idx) => (
                        <li className="list-group-item" key={idx}>
                          {att}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">
                      No attendees yet. Be the first to RSVP!
                    </p>
                  )}
                </section>
                {/* DELETE EVENT */}
              <div className="mt-4">
                <button
                  className="btn btn-outline-danger w-100"
                  onClick={handleDelete}
                >
                  Delete Event
                </button>
              </div>

              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default EventDetails;
