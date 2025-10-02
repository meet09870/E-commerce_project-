import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Loader = () => {
  return (
    <div style={styles.overlay}>
      <div className="spinner-border text-primary" role="status" style={styles.spinner}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  spinner: {
    width: "3rem",
    height: "3rem",
  },
};

export default Loader;
