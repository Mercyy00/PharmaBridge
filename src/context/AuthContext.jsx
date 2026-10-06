import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Demo accounts. Anyone who registers becomes a "buyer".
const defaultUsers = [
  { id: 1, name: "Admin", email: "admin@pharmabridge.com", password: "admin123", role: "admin" },
  { id: 2, name: "Compliance Officer", email: "officer@pharmabridge.com", password: "officer123", role: "officer" },
  { id: 3, name: "Apollo Health Group", email: "buyer@apollo.com", password: "buyer123", role: "buyer", status: "verified", licenseName: "WDL-FDA-2026-981.pdf", licenseNumber: "WDL-FDA-2026-981", country: "India" },
  { id: 4, name: "St. Mary Medical Center", email: "stmary@hospital.org", password: "buyer123", role: "buyer", status: "pending", licenseName: "Drug_Import_Permit_2026.pdf", licenseNumber: "IMP-US-77812", country: "United States" },
];

function loadUsers() {
  const saved = localStorage.getItem("users");
  return saved ? JSON.parse(saved) : defaultUsers;
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers);
  const [currentId, setCurrentId] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const demo = params.get("demoUser");
      if (demo === "admin") return 1;
      if (demo === "officer") return 2;
      if (demo === "buyer") return 3;
      if (demo === "pending") return 4;
    } catch {
      // ignore
    }
    return JSON.parse(localStorage.getItem("currentId"));
  });

  const currentUser = users.find((u) => u.id === currentId) || null;

  const saveUsers = (list) => {
    setUsers(list);
    localStorage.setItem("users", JSON.stringify(list));
  };

  // Buyer status values: "no-license" -> "pending" -> "verified" or "rejected"
  const register = (name, email, password) => {
    if (users.some((u) => u.email === email)) {
      return "This email is already registered";
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "buyer",
      status: "no-license",
      licenseName: "",
    };
    saveUsers([...users, newUser]);
    return null;
  };

  const login = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return false;
    setCurrentId(user.id);
    localStorage.setItem("currentId", JSON.stringify(user.id));
    return true;
  };

  const logout = () => {
    setCurrentId(null);
    localStorage.removeItem("currentId");
  };

  // Used by UploadLicense (status -> "pending") and OfficerDashboard (status -> "verified"/"rejected")
  const updateUser = (id, changes) => {
    saveUsers(users.map((u) => (u.id === id ? { ...u, ...changes } : u)));
  };

  return (
    <AuthContext.Provider
      value={{ users, currentUser, register, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
