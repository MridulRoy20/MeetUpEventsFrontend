import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://meet-up-events-backend.vercel.app"; 

function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    imageUrl: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  // Helper: handle simple input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Helper: add a tag to the list
  function handleAddTag() {
    const trimmed = tagInput.trim();
    if (!trimmed) return;

    // avoid duplicate tags
    if (!formData.tags.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmed],
      }));
    }

    setTagInput("");
  }

  // Helper: remove a tag
  function handleRemoveTag(tagToRemove) {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  }

  // Helper: build payload in case we want to change shape later
  function buildEventPayload() {
    return {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      imageUrl: formData.imageUrl,
      tags: formData.tags,
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Basic validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.location
    ) {
      setError("Please fill all required fields (Title, Description, Date, Location).");
      return;
    }

    try {
      const payload = buildEventPayload();

      const res = await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create event");
      }

      await res.json();

      setToast("Event created successfully!");
      setTimeout(() => setToast(""), 2000);

      navigate("/"); // go back to list
    } catch (err) {
      console.error("Error creating event:", err);
      setError(err.message || "Something went wrong");
    }
  }

  return (
    <>
      <Header />
      {toast && <div className="simple-toast">{toast}</div>}


      <div className="bg-light py-4">
        <div className="container" style={{ maxWidth: "750px" }}>
          <div className="card shadow-sm p-4">
            <h3 className="mb-3 text-center">Create New Event</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* TITLE */}
              <div className="mb-3">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Event title"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="mb-3">
                <label className="form-label">Description *</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the event"
                />
              </div>

              {/* DATE */}
              <div className="mb-3">
                <label className="form-label">Date & Time *</label>
                <input
                  type="datetime-local"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              {/* LOCATION */}
              <div className="mb-3">
                <label className="form-label">Location *</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, venue, or meeting link"
                />
              </div>

              {/* IMAGE URL */}
              <div className="mb-3">
                <label className="form-label">Image URL (optional)</label>
                <input
                  type="text"
                  name="imageUrl"
                  className="form-control"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* TAGS */}
              <div className="mb-3">
                <label className="form-label">Tags</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag and click Add"
                  />
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleAddTag}
                  >
                    Add
                  </button>
                </div>

                <div className="mt-2 d-flex flex-wrap gap-2">
                  {formData.tags.map((tag, idx) => (
                    <span className="badge bg-secondary p-2" key={idx}>
                      {tag}
                      <button
                        type="button"
                        className="btn-close btn-close-white ms-2"
                        style={{ fontSize: "10px" }}
                        onClick={() => handleRemoveTag(tag)}
                      ></button>
                    </span>
                  ))}
                </div>
              </div>

              {/* SUBMIT */}
              <button type="submit" className="btn btn-danger w-100 mt-3">
                Create Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateEvent;
