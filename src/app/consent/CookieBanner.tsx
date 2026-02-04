import { useConsent } from "./ConsentProvider";

export function CookieBanner() {
  const { consent, acceptAll, rejectAll, openManager } = useConsent();

  // consent === null => user hasn't made a choice yet => show banner
  if (consent !== null) return null;

  return (
    <div style={styles.banner}>
      <div style={styles.text}>
        We use cookies to improve your experience. You can accept all cookies or manage your preferences.
      </div>

      <div style={styles.actions}>
        <button onClick={openManager} style={styles.secondaryBtn}>Manage</button>
        <button onClick={rejectAll} style={styles.secondaryBtn}>Reject all</button>
        <button onClick={acceptAll} style={styles.primaryBtn}>Accept all</button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  banner: {
    position: "fixed",
    left: 16,
    right: 16,
    bottom: 16,
    zIndex: 9999,
    padding: 16,
    borderRadius: 12,
    background: "#111",
    color: "#fff",
    display: "flex",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    flexWrap: "wrap",
  },
  text: { maxWidth: 700, lineHeight: 1.4 },
  actions: { display: "flex", gap: 8, flexWrap: "wrap" },
  primaryBtn: { padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer" },
  secondaryBtn: { padding: "10px 12px", borderRadius: 10, cursor: "pointer" },
};
