import ProjectList from "../../components/ProjectList";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import ProjectFilter from "./ProjectFilter";
import { useState } from "react";
// import { projectFirestore } from "../../firebase/config";

//styles
import "./Dashboard.css";

export default function Dashboard() {
  const { document, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const projects = document
    ? document.filter((doc) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "mine":
            let assignedToMe = false;
            doc.assignedUsersList.forEach((u) => {
              if (u.id === user.uid) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case "development":
          case "design":
          case "sales":
          case "marketing":
            console.log(doc.category, currentFilter);
            return doc.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div className="dashboard">
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {document && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {document && <ProjectList projects={projects} />}
    </div>
  );
}
