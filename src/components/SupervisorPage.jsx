import React, { useState } from "react";
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
import { useAuth } from "../context/AuthContext";
import { globalTasks } from "../data/tasks";

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

function SupervisorPage() {
  const { user, getInternsOfSupervisor } = useAuth();
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [open, setOpen] = useState(false);

  const myInterns = getInternsOfSupervisor(user.id);

  // Intern tasks sorted by date ascending
  const internTasks = (intern) =>
    globalTasks
      .filter((t) => t.userId === intern.id)
      .sort((a, b) => (a.date < b.date ? -1 : 1));

  const handleViewIntern = (intern) => {
    setSelectedIntern(intern);
    setOpen(true);
  };

  return (
    <Sheet
      sx={{
        maxWidth: 900,
        mx: "auto",
        my: 6,
        p: 4,
        borderRadius: "lg",
        boxShadow: "lg",
        bgcolor: "background.body",
      }}
    >
      <Typography level="h2" fontWeight="lg" sx={{ mb: 2 }}>
        Supervisor Dashboard
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Typography level="h4" sx={{ mb: 2 }}>
        Your Interns
      </Typography>
      {myInterns.length === 0 ? (
        <Typography color="neutral">
          You have no interns assigned.
        </Typography>
      ) : (
        <List
          sx={{
            "--ListItem-paddingY": "1.2rem",
            "--ListItem-paddingX": "1rem",
            border: "1px solid var(--joy-palette-neutral-200, #e0e0e0)",
            borderRadius: "lg",
            bgcolor: "background.level1",
            mb: 2,
          }}
        >
          {myInterns.map((intern) => (
            <ListItem
              key={intern.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid var(--joy-palette-neutral-200, #f0f0f0)",
                "&:last-child": { borderBottom: "none" },
              }}
            >
              <ListItemContent sx={{ flex: 1 }}>
                <Box>
                  <Typography fontWeight="md" fontSize="lg">
                    {intern.name}
                  </Typography>
                  <Typography color="neutral" level="body-sm">
                    {intern.email}
                  </Typography>
                  <Chip size="sm" variant="soft" color="primary" sx={{ mt: 0.5 }}>
                    {internTasks(intern).length} task{internTasks(intern).length !== 1 ? "s" : ""}
                  </Chip>
                </Box>
              </ListItemContent>
              <Tooltip title="View Tasks" variant="outlined" color="primary">
                <IconButton
                  color="primary"
                  variant="soft"
                  sx={{ mx: 1 }}
                  onClick={() => handleViewIntern(intern)}
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download as CSV" variant="outlined">
                <IconButton
                  color="success"
                  variant="soft"
                  onClick={() => downloadCSV(intern, internTasks(intern))}
                >
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog sx={{ minWidth: 420, maxWidth: 650 }}>
          <DialogTitle>
            {selectedIntern && (
              <>
                Task Entries for{" "}
                <Typography component="span" fontWeight="lg" color="primary">
                  {selectedIntern.name}
                </Typography>
              </>
            )}
          </DialogTitle>
          <DialogContent>
            {selectedIntern && internTasks(selectedIntern).length === 0 && (
              <Typography color="neutral">
                No tasks found for this intern.
              </Typography>
            )}
            {selectedIntern && internTasks(selectedIntern).length > 0 && (
              <Table
                aria-label="Intern task table"
                size="sm"
                variant="soft"
                sx={{ borderRadius: "md", overflow: "hidden", mt: 1 }}
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Task</th>
                    <th>Hours</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {internTasks(selectedIntern).map((task) => (
                    <tr key={task.date}>
                      <td>
                        <Typography level="body-md">{task.date}</Typography>
                      </td>
                      <td>
                        <Typography level="body-md">{task.task}</Typography>
                      </td>
                      <td>
                        <Typography level="body-md">{task.hours}</Typography>
                      </td>
                      <td>
                        <Typography level="body-sm" color="neutral">
                          {task.description || <i>No description</i>}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              startDecorator={<CloseIcon />}
              color="neutral"
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
            {selectedIntern && internTasks(selectedIntern).length > 0 && (
              <Button
                startDecorator={<DownloadIcon />}
                color="primary"
                variant="solid"
                onClick={() => downloadCSV(selectedIntern, internTasks(selectedIntern))}
              >
                Download CSV
              </Button>
            )}
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Sheet>
  );
}

export default SupervisorPage;