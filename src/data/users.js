export const users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@admin.com",
    password: "admin123",
    role: "admin",
    status: "active",
    supervisorId: null,
  },
  {
    id: 2,
    name: "Super Visor",
    email: "ayush.padhy@tcs.com",
    password: "ayush123",
    role: "supervisor",
    status: "active",
    supervisorId: null,
  },
  {
    id: 3,
    name: "Intern Demo",
    email: "intern@demo.com",
    password: "intern123",
    role: "intern",
    status: "active",
    supervisorId: 2,
  },
];