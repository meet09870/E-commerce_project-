import React, { useState, useEffect } from "react";

const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        {/* <img
          // src="/images/offline.gif"  GIF public folder ma
          alt="No Internet Connection"
          style={styles.gif}
        /> */}
        <h2 style={styles.title}>Oops! No Internet Connection</h2>
        <p style={styles.text}>
          ⚠️ It looks like you're offline. Please check your network settings.
        </p>
        <button style={styles.button} onClick={() => window.location.reload()}>
          Retry
        </button>
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
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px 20px",
    textAlign: "center",
    maxWidth: "350px",
    width: "90%",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.3s ease-in-out",
  },
  gif: {
    width: "120px",
    height: "120px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "20px",
    margin: "0 0 10px",
    color: "#e63946",
  },
  text: {
    fontSize: "16px",
    margin: "0 0 20px",
    color: "#333",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#e63946",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default OfflineBanner;
