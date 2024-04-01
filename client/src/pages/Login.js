import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../utils/api";
import { Form, Spinner } from "react-bootstrap";

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    if (demo) {
      signIn();
    }
  }, [demo]);

  const signIn = (e) => {
    e?.preventDefault();
    setError(null);
    setLoading(true);
    api.login({ username, password }).then((res) => {
      console.log(res);
      if (res.data.success) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        history.push("/collection");
      } else {
        setLoading(false);
        setError(res.data.message);
      }
    });
  };

  const useDemo = async () => {
    setUsername("demo");
    setPassword("demo123");
    setDemo(true);
  };

  const styles = {
    form: {
      width: "200px",
      margin: "0 auto",
    },
  };

  return (
    <div className="container pt-3">
      <h2 className="text-center mt-2">Sign In</h2>
      <Form style={styles.form} className="mt-3" onSubmit={signIn}>
        <Form.Group className="row d-flex justify-content-center align-items-center mb-3">
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type="text"
            className="text-center shadow"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="row d-flex justify-content-center align-items-center ">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            className="text-center shadow"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="row d-flex justify-content-center mt-4">
          <button className="btn btn-lg btn-dark" onClick={signIn}>
            Login
          </button>
        </div>
      </Form>
      {loading ? (
        <div className="row d-flex justify-content-center pt-3">
          <Spinner animation="border" />
        </div>
      ) : (
        <p className="text-center mt-2">
          Don't have an account? Register <a href="/register">here</a>
        </p>
      )}
      {error ? (
        <p className="text-center" style={{ color: "red" }}>
          {error}
        </p>
      ) : null}
      <div className="row d-flex justify-content-center mt-4">
        <button
          className="btn btn-link"
          style={{ width: "200px", fontSize: "14px", boxShadow:"none" }}
          onClick={useDemo}
        >
          Use demo account
        </button>
      </div>
    </div>
  );
};

export default Login;
