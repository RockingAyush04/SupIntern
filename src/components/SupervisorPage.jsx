import React, { useEffect, useState } from "react";
import {
  Sheet,
  Typography,
  Box,
  Table,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemContent,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Chip,
} from "@mui/joy";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

import PeopleIcon from "@mui/icons-material/People";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Download tasks as CSV
function downloadCSV(intern, tasks) {
  if (!tasks.length) return;
  const rows = [
    ["Date", "Task", "Hours", "Description"],
    ...tasks.map((t) => [t.date, t.task, t.hours, t.description || ""]),
  ];
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${intern.name.replace(/\s+/g, "_")}_tasks.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

// Utility to truncate description
function truncateDescription(description, maxLines = 2, maxCharsPerLine = 60) {
  if (!description) return "";
  const lines = description.split('\n');
  let result = [];
  for (let i = 0; i < lines.length && result.length < maxLines; i++) {
    let line = lines[i];
    while (line.length > maxCharsPerLine) {
      result.push(line.slice(0, maxCharsPerLine));
      line = line.slice(maxCharsPerLine);
      if (result.length === maxLines) break;
    }
    if (result.length < maxLines) result.push(line);
  }
  let joined = result.join('\n');
  if (lines.length > maxLines || description.length > joined.length) {
    joined = joined.trimEnd();
    if (!joined.endsWith('...')) joined += '...';
  }
  return joined;
}

function SupervisorPage() {
  const { user, getInternsOfSupervisor, getTasksForUser, logout } = useAuth();
  const navigate = useNavigate();
  const [interns, setInterns] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [selectedInternTasks, setSelectedInternTasks] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const interns = await getInternsOfSupervisor(user.id);
      setInterns(interns);

      const counts = {};
      for (const intern of interns) {
        const tasks = await getTasksForUser(intern._id);
        counts[intern._id] = tasks.length;
      }
      setTaskCounts(counts);
    }
    if (user) fetchData();
  }, [user, getInternsOfSupervisor, getTasksForUser]);

  const handleViewIntern = async (intern) => {
    setSelectedIntern(intern);
    const data = await getTasksForUser(intern._id);
    setSelectedInternTasks(data);
    setOpen(true);
  };



  // Format date to YYYY-MM-DD
  const formatDate = (dateStr) =>
    dateStr
      ? typeof dateStr === "string"
        ? dateStr.slice(0, 10)
        : dateStr instanceof Date
        ? dateStr.toISOString().slice(0, 10)
        : ""
      : "";

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
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box>
            <Typography level="h2" sx={{ color: "#fff", fontWeight: 700 }}>
              Supervisor Dashboard
            </Typography>
            <Typography level="body-sm" sx={{ color: "#94a3b8" }}>
              Manage and review your interns' progress
            </Typography>
          </Box>

        </Box>

        <Divider sx={{ mb: 6, bgcolor: "rgba(255,255,255,0.1)" }} />

        <Box
          sx={{
             p: 3,
             bgcolor: "rgba(255,255,255,0.03)",
             backdropFilter: "blur(10px)",
             borderRadius: "xl",
             border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Typography level="h4" sx={{ mb: 3, color: "#fff", display: "flex", alignItems: "center", gap: 1 }}>
            <PeopleIcon sx={{ color: "#a78bfa" }} />
            Your Interns
          </Typography>

          {interns.length === 0 ? (
            <Typography sx={{ color: "#94a3b8" }}>
              You have no interns assigned.
            </Typography>
          ) : (
            <List
              sx={{
                "--ListItem-paddingY": "1rem",
                "--ListItem-paddingX": "1rem",
                gap: 2 // Spacing between list items
              }}
            >
              {interns.map((intern) => (
                <ListItem
                  key={intern._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "lg",
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.05)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      borderColor: "rgba(167, 139, 250, 0.3)"
                    },
                    p: 2,
                  }}
                >
                  <ListItemContent sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
                     <Box sx={{ flex: 1 }}>
                        <Typography fontWeight="lg" fontSize="1.1rem" sx={{ color: "#fff" }}>
                          {intern.name}
                        </Typography>
                        <Typography level="body-sm" sx={{ color: "#94a3b8" }}>
                          {intern.email}
                        </Typography>
                     </Box>
                     
                     {/* Even distribution stats */}
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mr: 4 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography level="body-xs" sx={{ color: "#e2e8f0", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>
                                Tasks Submitted
                            </Typography>
                            <Chip
                                size="md"
                                variant="soft"
                                color="primary"
                                sx={{
                                    mt: 0.5,
                                    bgcolor: "rgba(139, 92, 246, 0.2)",
                                    color: "#c4b5fd",
                                    fontWeight: 600,
                                    minWidth: 40
                                }}
                            >
                                {taskCounts[intern._id] || 0}
                            </Chip>
                        </Box>
                     </Box>
                  </ListItemContent>

                  <Box>
                    <Tooltip title="View Tasks & Details" variant="solid" placement="top">
                        <Button
                          variant="solid"
                          color="primary"
                          startDecorator={<VisibilityIcon />}
                          onClick={() => handleViewIntern(intern)}
                          sx={{
                            bgcolor: "#7c3aed",
                            "&:hover": { bgcolor: "#6d28d9" }
                          }}
                        >
                            See All
                        </Button>
                    </Tooltip>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {/* Modal for viewing tasks */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
             layout="center"
             sx={{
                minWidth: { xs: "90%", md: 700 },
                maxHeight: "80vh",
                overflow: "auto",
                bgcolor: "#18181b",
                borderColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                boxShadow: "lg"
             }}
          >
            <DialogTitle sx={{ color: "#fff", fontSize: "1.25rem", mb: 1 }}>
              {selectedIntern && (
                <>
                  Task Entries for{" "}
                  <Typography component="span" fontWeight="lg" sx={{ color: "#a78bfa" }}>
                    {selectedIntern.name}
                  </Typography>
                </>
              )}
            </DialogTitle>
            <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", mb: 2 }} />
            
            <DialogContent sx={{ color: "#a1a1aa" }}>
              {selectedIntern && selectedInternTasks.length === 0 && (
                <Typography sx={{ color: "#94a3b8", fontStyle: "italic", textAlign: "center", py: 4 }}>
                  No tasks found for this intern.
                </Typography>
              )}
              {selectedIntern && selectedInternTasks.length > 0 && (
                <Table
                  aria-label="Intern task table"
                  stickyHeader
                  hoverRow
                  sx={{
                    "--TableCell-headBackground": "#18181b",
                    "--TableCell-selectedBackground": "rgba(255,255,255,0.05)",
                    "& thead th": { color: "#fff", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.2)" },
                    "& tbody td": { color: "#e2e8f0", borderBottom: "1px solid rgba(255,255,255,0.05)" },
                    "& tbody tr:hover": { bgcolor: "rgba(255,255,255,0.05) !important" }
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: "20%" }}>Date</th>
                      <th style={{ width: "25%" }}>Task</th>
                      <th style={{ width: "15%" }}>Hours</th>
                      <th style={{ width: "40%" }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInternTasks.map((task) => (
                      <tr key={task._id}>
                        <td>
                          <Typography level="body-sm" sx={{ color: "#fff" }}>
                            {formatDate(task.date)}
                          </Typography>
                        </td>
                        <td>
                          <Typography level="body-sm" fontWeight="lg" sx={{ color: "#ffffff" }}>{task.task}</Typography>
                        </td>
                        <td>
                           <Chip
                              size="sm"
                              variant="outlined"
                              sx={{
                                color: "#e2e8f0",
                                bgcolor: "transparent", // Explicitly remove any default white background
                                borderColor: "rgba(255,255,255,0.2)",
                                transition: "all 0.2s",
                                "&:hover": {
                                  bgcolor: "rgba(255,255,255,0.05)",
                                  color: "#fff",
                                  borderColor: "#a78bfa"
                                }
                              }}
                           >
                             {task.hours} hr
                           </Chip>
                        </td>
                        <td>
                          <Typography
                            level="body-sm"
                            sx={{
                              color: "#ffffff",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "pre-line",
                            }}
                          >
                            {truncateDescription(task.description)}
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </DialogContent>
            <DialogActions sx={{ pt: 2, justifyContent: "space-between" }}>
              <Button
                  startDecorator={<DownloadIcon />}
                  color="primary"
                  variant="solid"
                  onClick={() => downloadCSV(selectedIntern, selectedInternTasks)}
                  disabled={!selectedIntern || selectedInternTasks.length === 0}
                  sx={{ bgcolor: "#7c3aed", "&:hover": { bgcolor: "#6d28d9" } }}
              >
                  Export CSV
              </Button>
              <Button
                startDecorator={<CloseIcon />}
                variant="plain"
                color="neutral"
                onClick={() => setOpen(false)}
                sx={{ color: "#a1a1aa", "&:hover": { color: "#f87171", bgcolor: "rgba(248, 113, 113, 0.1)" } }}
              >
                Close
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </Box>
    </Sheet>
  );
}

export default SupervisorPage;