import { useCollection } from "../hooks/useCollection";
import Avatar from "./Avatar";
//styles
import "./OnlineUsers.css";

export default function OnlineUsers() {
  const { error, document } = useCollection("users");
  return (
    <div className="user-list">
      <h2>All users</h2>
      {error && <div className="error"> {error} </div>}
      {document &&
        document.map((user) => (
          <div key={user.id} className="user-list-item">
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}
