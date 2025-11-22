import { useMemo, useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
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

// Helper: collect all unique tags from events
function getAllTags(events) {
  const tagSet = new Set();
  events.forEach((event) => {
    (event.tags || []).forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet);
}

// Helper: filter events by search text and selected tag
function filterEvents(events, searchTerm, selectedTag) {
  return events.filter((event) => {
    const textMatch =
      !searchTerm ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const tagMatch =
      !selectedTag ||
      (event.tags && event.tags.includes(selectedTag));

    return textMatch && tagMatch;
  });
}

const HomePage = () => {
  const { data, loading, error } = useFetch(`${API_BASE_URL}/events`, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const events = Array.isArray(data) ? data : [];

  const allTags = useMemo(() => getAllTags(events), [events]);
  const filteredEvents = useMemo(
    () => filterEvents(events, searchTerm, selectedTag),
    [events, searchTerm, selectedTag]
  );

  return (
    <>
      <Header />

      <div className="bg-light py-4">
        <div className="container">
          {/* Top bar: title + create button */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="fw-bold mb-0">Events</h1>
            <Link to="/events/new" className="btn btn-danger">
              + Create Event
            </Link>
          </div>

          {/* Search and tag filters */}
          <div className="row mb-4">
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title, description, or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-2 d-flex flex-wrap gap-2">
              <button
                type="button"
                className={`btn btn-sm ${
                  !selectedTag ? "btn-dark" : "btn-outline-dark"
                }`}
                onClick={() => setSelectedTag("")}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`btn btn-sm ${
                    selectedTag === tag ? "btn-dark" : "btn-outline-dark"
                  }`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Loading / error states */}
            {loading && (
              <div className="d-flex justify-content-center my-5">
              <div className="spinner-border text-danger" role="status"></div>
              </div>
            )}
          {error && (
            <div className="alert alert-danger">
              Failed to load events: {error}
            </div>
          )}

          {/* Event cards */}
          <div className="row">
            {filteredEvents.map((event) => (
              <div className="col-md-4 mb-4" key={event._id}>
                <div className="card h-100 shadow-sm">
                  {event.imageUrl && (
                    <img
                      src={event.imageUrl}
                      className="card-img-top"
                      alt={event.title}
                      style={{ objectFit: "cover", height: "180px" }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <p className="text-muted mb-1">
                      {formatEventDate(event.date)}
                    </p>
                    <h5 className="card-title fw-bold">{event.title}</h5>
                    <p className="card-text text-truncate">
                      {event.description}
                    </p>
                    <p className="small text-muted mb-2">
                      <i className="bi bi-geo-alt-fill me-1"></i>
                      {event.location}
                    </p>
                    <div className="mb-2 d-flex flex-wrap gap-1">
                      {(event.tags || []).map((tag, idx) => (
                        <span className="badge bg-secondary" key={idx}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <p className="small text-muted mb-1">
                        {event.attendees?.length || 0} attendee(s)
                      </p>
                      <Link
                        to={`/events/${event._id}`}
                        className="btn btn-outline-danger w-100 btn-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {!loading && filteredEvents.length === 0 && (
              <p>No events found. Try changing your search or create a new event.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
