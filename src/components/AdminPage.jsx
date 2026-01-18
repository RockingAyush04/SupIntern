import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  Typography,
  Box,
  Table,
  IconButton,
  Tooltip,
  Button,
  Divider,
  List,
  ListItem,
  Select,
  Option,
  Chip,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/joy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PeopleIcon from "@mui/icons-material/People";
import CloseIcon from "@mui/icons-material/Close";

import { useAuth } from "../context/AuthContext";

function AdminPage() {
  const {
    getPendingUsers,
    approveUser,
    getSupervisors,
    getAllUsers,
    logout,
  } = useAuth();
  const navigate = useNavigate();

  const [pendingRole, setPendingRole] = useState({});
  const [pendingSupervisor, setPendingSupervisor] = useState({});
  const [approveDialog, setApproveDialog] = useState({ open: false, user: null });

  // Fetched data state
  const [pendingUsers, setPendingUsers] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // Fetch data on mount and after any approval
  const fetchData = async () => {
    setPendingUsers(await getPendingUsers());
    setSupervisors(await getSupervisors());
    setAllUsers(await getAllUsers());
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleApprove = async (userId) => {
    const role = pendingRole[userId];
    if (!role) return;
    const supervisorId = role === "intern" ? pendingSupervisor[userId] : null;
    await approveUser(userId, role, supervisorId);
    setApproveDialog({ open: false, user: null });
    setPendingRole((prev) => ({ ...prev, [userId]: undefined }));
    setPendingSupervisor((prev) => ({ ...prev, [userId]: undefined }));
    fetchData(); // Refresh
  };



  // Build supervisor-interns list
  const supervisorsWithInterns = supervisors.map((sup) => ({
    ...sup,
    interns: allUsers.filter(
      (u) => u.role === "intern" && String(u.supervisor_id) === String(sup._id) && u.status === "active"
    ),
  }));

  return (
    <Sheet
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #09090b 0%, #1a1a2e 50%, #2e1065 100%)",
        color: "#fff",
        py: 4,
        px: { xs: 2, md: 6 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography level="h2" sx={{ color: "#fff", fontWeight: 700 }}>
            Admin Dashboard
          </Typography>

        </Box>

        <Divider sx={{ mb: 6, bgcolor: "rgba(255,255,255,0.1)" }} />

        {/* Pending Approvals Section */}
        <Box
          sx={{
            mb: 6,
            p: 3,
            bgcolor: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(10px)",
            borderRadius: "xl",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Typography level="h4" sx={{ mb: 2, color: "#fff", display: "flex", alignItems: "center", gap: 1 }}>
            <PersonAddAlt1Icon sx={{ color: "#fbbf24" }} />
            Pending User Approvals
          </Typography>

          {pendingUsers.length === 0 ? (
            <Typography sx={{ color: "#94a3b8" }}>No pending users!</Typography>
          ) : (
            <Table
              aria-label="pending users table"
              sx={{
                "--TableCell-headBackground": "transparent",
                "--TableCell-selectedBackground": "rgba(255,255,255,0.05)",
                "& thead th": { color: "#94a3b8", borderBottom: "1px solid rgba(255,255,255,0.1)" },
                "& tbody td": { color: "#e2e8f0", borderBottom: "1px solid rgba(255,255,255,0.05)" },
                "& tbody tr:last-child td": { borderBottom: "none" },
                "& tbody tr": {
                   transition: "background-color 0.2s",
                   "&:hover": { bgcolor: "rgba(255,255,255,0.04)" }
                }
              }}
            >
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>Name</th>
                  <th style={{ width: "25%" }}>Email</th>
                  <th style={{ width: "20%" }}>Assign Role</th>
                  <th style={{ width: "25%" }}>Assign Supervisor</th>
                  <th style={{ width: "10%" }}>Approve</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map((u) => (
                  <tr key={u._id}>
                    <td>
                      <Typography fontWeight="lg" sx={{ color: "#fff" }}>{u.name}</Typography>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <Select
                        size="sm"
                        placeholder="Role"
                        variant="outlined"
                        value={pendingRole[u._id] || ""}
                        onChange={(_, value) => setPendingRole((prev) => ({ ...prev, [u._id]: value }))}
                        slotProps={{
                          listbox: {
                            sx: {
                              bgcolor: "#18181b", // Dark background for the dropdown menu
                              borderColor: "rgba(255,255,255,0.1)",
                              "& .MuiOption-root": {
                                color: "#e2e8f0",
                                "&:hover": {
                                  bgcolor: "rgba(167, 139, 250, 0.15)", // Purple tint on hover
                                  color: "#fff",
                                },
                                "&[aria-selected='true']": {
                                  bgcolor: "rgba(167, 139, 250, 0.25)",
                                  color: "#fff",
                                },
                              },
                            },
                          },
                        }}
                        sx={{
                          bgcolor: "rgba(0,0,0,0.2)",
                          color: "#fff",
                          borderColor: "rgba(255,255,255,0.2)",
                          "&:hover": { borderColor: "#a78bfa", bgcolor: "rgba(255,255,255,0.05)" },
                        }}
                      >
                        <Option value="intern">Intern</Option>
                        <Option value="supervisor">Supervisor</Option>
                      </Select>
                    </td>
                    <td>
                      {pendingRole[u._id] === "intern" ? (
                        <Select
                          size="sm"
                          placeholder="Supervisor"
                          variant="outlined"
                          value={pendingSupervisor[u._id] || ""}
                          onChange={(_, value) => setPendingSupervisor((prev) => ({ ...prev, [u._id]: value }))}
                          slotProps={{
                            listbox: {
                              sx: {
                                bgcolor: "#18181b",
                                borderColor: "rgba(255,255,255,0.1)",
                                "& .MuiOption-root": {
                                  color: "#e2e8f0",
                                  "&:hover": {
                                    bgcolor: "rgba(167, 139, 250, 0.15)",
                                    color: "#fff",
                                  },
                                  "&[aria-selected='true']": {
                                    bgcolor: "rgba(167, 139, 250, 0.25)",
                                    color: "#fff",
                                  },
                                },
                              },
                            },
                          }}
                          sx={{
                            bgcolor: "rgba(0,0,0,0.2)",
                            color: "#fff",
                            borderColor: "rgba(255,255,255,0.2)",
                            "&:hover": { borderColor: "#a78bfa", bgcolor: "rgba(255,255,255,0.05)" },
                          }}
                        >
                          {supervisors.length === 0 ? (
                            <Option disabled>No supervisors</Option>
                          ) : (
                            supervisors.map((sup) => (
                              <Option key={sup._id} value={sup._id}>
                                {sup.name}
                              </Option>
                            ))
                          )}
                        </Select>
                      ) : (
                        <Typography level="body-sm" sx={{ color: "#64748b", pl: 1 }}>—</Typography>
                      )}
                    </td>
                    <td>
                      <Tooltip title="Approve User" variant="solid">
                        <IconButton
                          size="sm"
                          variant="solid"
                          color="success"
                          disabled={!pendingRole[u._id] || (pendingRole[u._id] === "intern" && !pendingSupervisor[u._id])}
                          onClick={() => setApproveDialog({ open: true, user: u })}
                          sx={{ bgcolor: "#22c55e", color: "#fff", "&:hover": { bgcolor: "#16a34a" }, "&:disabled": { bgcolor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" } }}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Box>

        {/* Supervisors List Section */}
        <Box
          sx={{
            p: 3,
            bgcolor: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(10px)",
            borderRadius: "xl",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Typography level="h4" sx={{ mb: 2, color: "#fff", display: "flex", alignItems: "center", gap: 1 }}>
            <PeopleIcon sx={{ color: "#a78bfa" }} />
            Supervisors and Assigned Interns
          </Typography>

          {supervisorsWithInterns.length === 0 ? (
            <Typography sx={{ color: "#94a3b8" }}>No supervisors found.</Typography>
          ) : (
            <List sx={{ "--ListItem-paddingY": "1rem", "--ListItem-paddingX": "0" }}>
              {supervisorsWithInterns.map((sup) => (
                <ListItem
                  key={sup._id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    "&:last-child": { borderBottom: "none" },
                    py: 2,
                    px: 2,
                    borderRadius: "md",
                    transition: "background-color 0.2s",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.03)" }
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between", mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box sx={{ p: 1, bgcolor: "rgba(52, 211, 153, 0.1)", borderRadius: "50%" }}>
                          <SupervisorAccountIcon sx={{ color: "#34d399", fontSize: 28 }} />
                      </Box>
                      <Box>
                        <Typography fontWeight="lg" sx={{ color: "#fff", fontSize: "1.1rem" }}>{sup.name}</Typography>
                        <Typography level="body-sm" sx={{ color: "#94a3b8" }}>{sup.email}</Typography>
                      </Box>
                    </Box>
                    <Chip size="sm" variant="soft" color="primary" sx={{ bgcolor: "rgba(139, 92, 246, 0.2)", color: "#c4b5fd" }}>
                      {sup.interns.length} Active Intern{sup.interns.length !== 1 ? "s" : ""}
                    </Chip>
                  </Box>

                  <Box sx={{ width: "100%", pl: { xs: 0, md: 7 } }}>
                    {sup.interns.length === 0 ? (
                      <Typography level="body-xs" sx={{ color: "#64748b", fontStyle: "italic" }}>
                        No active interns assigned.
                      </Typography>
                    ) : (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                         {sup.interns.map((intern) => (
                            <Tooltip key={intern._id} title={intern.email} variant="soft" placement="top">
                                <Chip
                                  variant="soft"
                                  size="md"
                                  sx={{
                                      bgcolor: "rgba(255,255,255,0.08)",
                                      color: "#e2e8f0",
                                      border: "1px solid rgba(255,255,255,0.05)",
                                      "&:hover": {
                                          bgcolor: "rgba(167, 139, 250, 0.2)",
                                          color: "#fff",
                                          borderColor: "rgba(167, 139, 250, 0.4)"
                                      },
                                      transition: "all 0.2s"
                                  }}
                                >
                                    {intern.name}
                                </Chip>
                            </Tooltip>
                         ))}
                      </Box>
                    )}
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {/* Approve Dialog */}
        <Modal open={approveDialog.open} onClose={() => setApproveDialog({ open: false, user: null })}>
          <ModalDialog variant="outlined" sx={{ bgcolor: "#18181b", borderColor: "rgba(255,255,255,0.2)", color: "#fff", boxShadow: "lg" }}>
            <DialogTitle sx={{ color: "#fff", fontSize: "1.25rem" }}>Confirm Approval</DialogTitle>
            <DialogContent sx={{ color: "#a1a1aa" }}>
              {approveDialog.user && (
                <Typography sx={{ color: "#a1a1aa" }}>
                  Approve <b>{approveDialog.user.name}</b> as <span style={{ color: "#a78bfa", fontWeight: 600 }}>{pendingRole[approveDialog.user._id]}</span>
                  {pendingRole[approveDialog.user._id] === "intern" && pendingSupervisor[approveDialog.user._id] ? (
                    <> under supervisor <span style={{ color: "#fff", fontWeight: 600 }}>{supervisors.find((s) => String(s._id) === String(pendingSupervisor[approveDialog.user._id]))?.name}</span></>
                  ) : "?"}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button variant="plain" color="neutral" onClick={() => setApproveDialog({ open: false, user: null })} sx={{ color: "#a1a1aa", "&:hover": { color: "#f87171", bgcolor: "rgba(248, 113, 113, 0.1)" } }}>
                Cancel
              </Button>
              <Button variant="solid" color="success" onClick={() => approveDialog.user && handleApprove(approveDialog.user._id)} sx={{ bgcolor: "#22c55e", "&:hover": { bgcolor: "#16a34a" } }}>
                Confirm
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </Box>
    </Sheet>
  );
}

export default AdminPage;