import React, { useState } from "react";
import {
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
  FormControl,
  FormLabel,
  IconButton,
  Sheet,
  Table,
  Typography,
  Tooltip,
  Box,
} from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../context/AuthContext";
import { globalTasks } from "../data/tasks";

// Utility: returns YYYY-MM-DD string
const formatDate = (dateObj) =>
  dateObj.toISOString().slice(0, 10);

function getDateLimits() {
  const today = new Date();
  const maxDate = formatDate(today);

  // Previous month, same date or last day if prev month too short
  const prevMonth = new Date(today);
  prevMonth.setMonth(today.getMonth() - 1);

  if (prevMonth.getMonth() === today.getMonth()) {
    // e.g., Mar 31 -> Feb 28/29
    prevMonth.setDate(0);
  }
  const minDate = formatDate(prevMonth);
  return { minDate, maxDate };
}

function isDateInRange(date, min, max) {
  return date >= min && date <= max;
}

function InternPage() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [form, setForm] = useState({
    date: "",
    task: "",
    hours: "",
    description: "",
  });
  const [refresh, setRefresh] = useState(0);

  const { minDate, maxDate } = getDateLimits();

  // Filter tasks for this intern
  const myTasks = globalTasks
    .filter((t) => t.userId === user.id)
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  // Open dialog for add or edit
  const handleOpen = (task, index) => {
    if (task) {
      setForm({ ...task });
      setEditingIndex(index);
    } else {
      setForm({
        date: "",
        task: "",
        hours: "",
        description: "",
      });
      setEditingIndex(-1);
    }
    setOpen(true);
  };

  // Save or update task
  const handleSave = () => {
    if (!form.date || !form.task || !form.hours) return;

    // Validate date range
    if (!isDateInRange(form.date, minDate, maxDate)) {
      alert(
        `Date must be between ${minDate} and ${maxDate}.`
      );
      return;
    }

    if (editingIndex !== -1) {
      // Find the global task index
      const idx = globalTasks.findIndex(
        (t) => t.userId === user.id && t.date === myTasks[editingIndex].date
      );
      if (idx !== -1) {
        globalTasks[idx] = { ...form, hours: Number(form.hours), userId: user.id };
      }
    } else {
      // Prevent duplicate date entries for this user in allowed range
      const exists = globalTasks.some(
        (t) => t.userId === user.id && t.date === form.date
      );
      if (exists) {
        alert("Task for this date already exists. Use edit.");
        return;
      }
      globalTasks.push({
        ...form,
        hours: Number(form.hours),
        userId: user.id,
      });
    }
    setOpen(false);
    setRefresh((v) => v + 1); // Force re-render
  };

  // For controlled input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Sheet
      sx={{
        maxWidth: 700,
        mx: "auto",
        my: 6,
        p: 3,
        borderRadius: "lg",
        boxShadow: "sm",
        bgcolor: "background.body",
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography level="h3">Your Task Entries</Typography>
        <Tooltip title="Add Task">
          <IconButton variant="soft" color="primary" onClick={() => handleOpen()}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {myTasks.length === 0 ? (
        <Typography level="body-md" color="neutral">
          No tasks added yet. Click <AddIcon fontSize="small" /> to add your first task.
        </Typography>
      ) : (
        <Table
          aria-label="task table"
          variant="soft"
          sx={{ mt: 2, borderRadius: "md", overflow: "hidden" }}
        >
          <thead>
            <tr>
              <th>Date</th>
              <th>Task</th>
              <th>Hours</th>
              <th>Description</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {myTasks.map((t, i) => (
              <tr key={t.date}>
                <td>{t.date}</td>
                <td>{t.task}</td>
                <td>{t.hours}</td>
                <td>{t.description}</td>
                <td>
                  <IconButton
                    size="sm"
                    variant="plain"
                    color="neutral"
                    onClick={() => handleOpen(t, i)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>{editingIndex !== -1 ? "Edit Task" : "Add Task"}</DialogTitle>
          <DialogContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <FormControl required sx={{ mb: 2 }}>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  disabled={editingIndex !== -1}
                  required
                  min={minDate}
                  max={maxDate}
                />
              </FormControl>
              <FormControl required sx={{ mb: 2 }}>
                <FormLabel>Task Name</FormLabel>
                <Input
                  name="task"
                  value={form.task}
                  onChange={handleChange}
                  placeholder="Enter task name"
                  required
                />
              </FormControl>
              <FormControl required sx={{ mb: 2 }}>
                <FormLabel>Hours</FormLabel>
                <Input
                  type="number"
                  name="hours"
                  value={form.hours}
                  onChange={handleChange}
                  placeholder="Number of hours"
                  required
                  inputProps={{ min: 1, max: 24 }}
                />
              </FormControl>
              <FormControl sx={{ mb: 2 }}>
                <FormLabel>Description (optional)</FormLabel>
                <Input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                  minRows={2}
                />
              </FormControl>
              <DialogActions>
                <Button type="button" variant="plain" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="solid">
                  {editingIndex !== -1 ? "Update" : "Add"}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </Sheet>
  );
}

export default InternPage;