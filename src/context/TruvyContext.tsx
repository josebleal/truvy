import React, { createContext, useContext, useState, ReactNode } from "react";

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
};

const TruvyContext = createContext<TruvyContextType | undefined>(undefined);

export const TruvyProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<TruvyState>(initialState);

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
  const resetState = () => setState(initialState);

  return (
    <TruvyContext.Provider
      value={{ state, setName, setCountry, setToken, setSessionId, setQrBase64, setCurrentScreen, setIssuedAt, setDocumentType, setLocationLabel, setLocationValue, resetState }}
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
