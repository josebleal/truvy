import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface Credential {
  inquiryId: string;
  name: string;
  country: string;
  documentType: string;
  ageVerified: string;
  issuedAt: string;
  issuer: string;
}

interface TruvyState {
  name: string;
  country: string;
  token: string;
  sessionId: string;
  qrBase64: string;
  currentScreen: number;
  issuedAt: string;
  documentType: "passport" | "driver_license";
  locationLabel: string;
  locationValue: string;
  ageVerified: string;
  credentials: Credential[];
}

interface TruvyContextType {
  state: TruvyState;
  setName: (name: string) => void;
  setCountry: (country: string) => void;
  setToken: (token: string) => void;
  setSessionId: (id: string) => void;
  setQrBase64: (qr: string) => void;
  setCurrentScreen: (screen: number) => void;
  setIssuedAt: (date: string) => void;
  setDocumentType: (type: "passport" | "driver_license") => void;
  setLocationLabel: (label: string) => void;
  setLocationValue: (value: string) => void;
  setAgeVerified: (age: string) => void;
  addCredential: (cred: Credential) => void;
  resetState: () => void;
}

const initialState: TruvyState = {
  name: "",
  country: "United States",
  token: "",
  sessionId: "",
  qrBase64: "",
  currentScreen: 0,
  issuedAt: "",
  documentType: "passport",
  locationLabel: "Document Country",
  locationValue: "",
  ageVerified: "",
  credentials: [],
};

function loadPersistedState(): Partial<TruvyState> {
  try {
    const raw = localStorage.getItem("truvy_state");
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function loadCredentials(): Credential[] {
  try {
    const raw = localStorage.getItem("truvy_credentials");
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

const TruvyContext = createContext<TruvyContextType | undefined>(undefined);

export const TruvyProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<TruvyState>(() => {
    const persisted = loadPersistedState();
    const credentials = loadCredentials();
    return { ...initialState, ...persisted, credentials, currentScreen: 0, sessionId: "", qrBase64: "" };
  });

  // Persist relevant state to localStorage whenever it changes
  useEffect(() => {
    const { name, country, token, documentType, ageVerified, locationLabel, locationValue, issuedAt } = state;
    localStorage.setItem("truvy_state", JSON.stringify({ name, country, token, documentType, ageVerified, locationLabel, locationValue, issuedAt }));
  }, [state.name, state.country, state.token, state.documentType, state.ageVerified, state.locationLabel, state.locationValue, state.issuedAt]);

  const setName = (name: string) => setState((s) => ({ ...s, name }));
  const setCountry = (country: string) => setState((s) => ({ ...s, country }));
  const setToken = (token: string) => setState((s) => ({ ...s, token }));
  const setSessionId = (id: string) => setState((s) => ({ ...s, sessionId: id }));
  const setQrBase64 = (qr: string) => setState((s) => ({ ...s, qrBase64: qr }));
  const setCurrentScreen = (screen: number) => setState((s) => ({ ...s, currentScreen: screen }));
  const setIssuedAt = (date: string) => setState((s) => ({ ...s, issuedAt: date }));
  const setDocumentType = (type: "passport" | "driver_license") => setState((s) => ({ ...s, documentType: type }));
  const setLocationLabel = (label: string) => setState((s) => ({ ...s, locationLabel: label }));
  const setLocationValue = (value: string) => setState((s) => ({ ...s, locationValue: value }));
  const setAgeVerified = (age: string) => setState((s) => ({ ...s, ageVerified: age }));

  const addCredential = useCallback((cred: Credential) => {
    setState((s) => {
      const updated = [...s.credentials, cred];
      localStorage.setItem("truvy_credentials", JSON.stringify(updated));
      return { ...s, credentials: updated };
    });
  }, []);

  const resetState = () => {
    localStorage.removeItem("truvy_state");
    localStorage.removeItem("truvy_credentials");
    setState(initialState);
  };

  return (
    <TruvyContext.Provider
      value={{ state, setName, setCountry, setToken, setSessionId, setQrBase64, setCurrentScreen, setIssuedAt, setDocumentType, setLocationLabel, setLocationValue, setAgeVerified, addCredential, resetState }}
    >
      {children}
    </TruvyContext.Provider>
  );
};

export const useTruvy = () => {
  const ctx = useContext(TruvyContext);
  if (!ctx) throw new Error("useTruvy must be used within TruvyProvider");
  return ctx;
};
