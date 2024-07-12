import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState({});

  // Use `useParams()` and `useEffect()`
  // Load profile data from https://jsonplaceholder.typicode.com/users/${userId}
  const { userId } = useParams();

  //   useEffect(() => {
  //     console.log(userId);
  //     fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  //       .then((response) => response.json())
  //       .then(setUser);
  //   }, [userId]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadUser() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          { signal: abortController.signal }
        );

        const user = await response.json();
        setUser(user);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }

    loadUser();

    return () => {
      abortController.abort(); // Cancels any pending request or response
    };
  }, [userId]);

  const navigate = useNavigate();

  const deleteHandler = () => {
    // This will be successful but will not actually delete the user.
    fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      { method: "DELETE" } // The delete method tells the API to delete the user.
    )
      .then((response) => response.json())
      .then((data) => navigate("/"));
  };

  const rows = Object.entries(user).map(([key, value]) => (
    <div key={key}>
      <label>{key}</label>: {JSON.stringify(value)}
      <hr />
    </div>
  ));

  // No need to change anything below here
  if (user.id) {
    return (
      <div>
        {rows}
        <button type="button" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    );
  }
  return "Loading...";
}

export default UserProfile;
