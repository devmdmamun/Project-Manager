import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, ispending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setThumbnailError("please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("selected file must be image");
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError("image file must be less then 100KB");
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);
    console.log("thmbnail updated");
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Signup</h2>
      <label>
        <span>Name: </span>
        <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Email: </span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Profile Image: </span>
        <input required type="file" onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      <label>
        <span>Password: </span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!ispending && <button className="btn">Sign up</button>}
      {ispending && (
        <button disabled className="btn">
          Loading
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
