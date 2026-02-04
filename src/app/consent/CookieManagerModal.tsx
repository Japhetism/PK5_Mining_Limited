import { useEffect, useState } from "react";
import { defaultConsent, Consent } from "./consent";
import { useConsent } from "./ConsentProvider";

export function CookieManagerModal() {
  const { consent, setConsent, isManagerOpen, closeManager } = useConsent();
  const [draft, setDraft] = useState<Consent>(defaultConsent);

  useEffect(() => {
    // If user has no consent yet, start from defaults; else load stored
    setDraft(consent ?? defaultConsent);
  }, [consent, isManagerOpen]);

  if (!isManagerOpen) return null;

  const save = () => {
    setConsent({ ...draft, necessary: true });
    closeManager();
  };

  return (
    <div style={styles.overlay} onClick={closeManager}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>Cookie preferences</h3>
        <p style={{ opacity: 0.85 }}>
          Choose which cookies you allow. Necessary cookies are always on.
        </p>

        <div style={styles.row}>
          <label>
            <input type="checkbox" checked disabled /> Necessary
          </label>
          <small style={styles.small}>Required for the site to work.</small>
        </div>

        <div style={styles.row}>
          <label>
            <input
              type="checkbox"
              checked={draft.preferences}
              onChange={(e) => setDraft((d) => ({ ...d, preferences: e.target.checked }))}
            />
            Preferences
          </label>
          <small style={styles.small}>Remembers settings like theme/language.</small>
        </div>

        <div style={styles.row}>
          <label>
            <input
              type="checkbox"
              checked={draft.analytics}
              onChange={(e) => setDraft((d) => ({ ...d, analytics: e.target.checked }))}
            />
            Analytics
          </label>
          <small style={styles.small}>Helps us understand usage and improve.</small>
        </div>

        <div style={styles.row}>
          <label>
            <input
              type="checkbox"
              checked={draft.marketing}
              onChange={(e) => setDraft((d) => ({ ...d, marketing: e.target.checked }))}
            />
            Marketing
          </label>
          <small style={styles.small}>Personalized ads and campaign measurement.</small>
        </div>

        <div style={styles.actions}>
          <button onClick={closeManager} style={styles.secondaryBtn}>Cancel</button>
          <button onClick={save} style={styles.primaryBtn}>Save preferences</button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "grid",
    placeItems: "center",
    zIndex: 10000,
    padding: 16,
  },
  modal: { width: "min(560px, 100%)", background: "#fff", borderRadius: 12, padding: 16 },
  row: { display: "grid", gap: 6, padding: "10px 0", borderBottom: "1px solid #eee" },
  small: { color: "#444" },
  actions: { display: "flex", justifyContent: "flex-end", gap: 8, paddingTop: 12 },
  primaryBtn: { padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer" },
  secondaryBtn: { padding: "10px 12px", borderRadius: 10, cursor: "pointer" },
};
