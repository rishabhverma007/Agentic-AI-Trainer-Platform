"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole, NotificationItem } from "@/types";
import { MOCK_USERS } from "@/lib/utils";

interface AuthContextType {
  user: User | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  loginAs: (role: UserRole) => void;
  switchRole: (role: string) => void;
  logout: () => void;
  notifications: NotificationItem[];
  unreadCount: number;
  markNotificationRead: (id: string) => void;
  addNotification: (title: string, message: string, type?: NotificationItem["type"]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif_1",
    title: "AI Match Ready",
    message: "Top 3 GenAI Trainers ranked for IIT Delhi request #req_901.",
    type: "MATCH",
    timestamp: "10m ago",
    read: false,
  },
  {
    id: "notif_2",
    title: "Assignment Created",
    message: "Dr. Aris Thorne matched for BITS Pilani bootcamp.",
    type: "ASSIGNMENT",
    timestamp: "1h ago",
    read: false,
  },
  {
    id: "notif_3",
    title: "System Update",
    message: "Gemini 1.5 Pro Agent Workflow Engine upgraded to v2.4.",
    type: "SYSTEM",
    timestamp: "3h ago",
    read: true,
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("MANAGER");
  const [user, setUser] = useState<User | null>(MOCK_USERS.MANAGER);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  useEffect(() => {
    const savedRole = localStorage.getItem("saas_demo_role") as UserRole;
    if (savedRole && MOCK_USERS[savedRole]) {
      setRoleState(savedRole);
      setUser(MOCK_USERS[savedRole]);
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setUser(MOCK_USERS[newRole]);
    localStorage.setItem("saas_demo_role", newRole);
  };

  const loginAs = (newRole: UserRole) => {
    setRole(newRole);
  };

  const switchRole = (newRoleStr: string) => {
    const formatted = newRoleStr.toUpperCase() as UserRole;
    if (MOCK_USERS[formatted]) {
      setRole(formatted);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addNotification = (
    title: string,
    message: string,
    type: NotificationItem["type"] = "SYSTEM"
  ) => {
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title,
      message,
      type,
      timestamp: "Just now",
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setRole,
        loginAs,
        switchRole,
        logout,
        notifications,
        unreadCount,
        markNotificationRead,
        addNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
