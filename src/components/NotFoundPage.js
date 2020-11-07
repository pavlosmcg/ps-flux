import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>Page not found</h1>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
