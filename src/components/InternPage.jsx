import React, { useEffect, useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../context/AuthContext";
import { Textarea } from "@mui/joy";

// Utility: returns YYYY-MM-DD string
const formatDate = (dateObj) => dateObj.toISOString().slice(0, 10);

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
  const { user, getTasksForUser, addTask, editTask, deleteTask } = useAuth();
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState({
    date: "",
    task: "",
    hours: "",
    description: "",
  });
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { minDate, maxDate } = getDateLimits();
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    if (user) {
      getTasksForUser(user.id).then(setTasks);
    }
  }, [user, refresh, getTasksForUser]);

  const handleOpen = (task = null) => {
    if (task) {
      setForm({
        date: task.date ? task.date.slice(0, 10) : "",
        task: task.task,
        hours: task.hours,
        description: task.description || "",
      });
      setEditingTask(task);
    } else {
      setForm({
        date: "",
        task: "",
        hours: "",
        description: "",
      });
      setEditingTask(null);
    }
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.date || !form.task || !form.hours) return;

    if (!isDateInRange(form.date, minDate, maxDate)) {
      alert(`Date must be between ${minDate} and ${maxDate}.`);
      return;
    }

    if (editingTask) {
      await editTask(editingTask.id, {
        date: form.date,
        task: form.task,
        hours: Number(form.hours),
        description: form.description,
      });
    } else {
      // Prevent duplicate date entries for this user in allowed range
      if (tasks.some((t) => t.date === form.date)) {
        alert("Task for this date already exists. Use edit.");
        return;
      }
      await addTask({
        userId: user.id,
        date: form.date,
        task: form.task,
        hours: Number(form.hours),
        description: form.description,
      });
    }
    setOpen(false);
    setRefresh((v) => !v);
  };

  const handleDeleteTask = async () => {
    await deleteTask(deleteTaskId);
    setDeleteOpen(false);
    setRefresh((v) => !v);
    setDeleteTaskId(null);
  };

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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography level="h3">Your Task Entries</Typography>
        <Tooltip title="Add Task">
          <IconButton
            variant="soft"
            color="primary"
            onClick={() => handleOpen()}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {tasks.length === 0 ? (
        <Typography level="body-md" color="neutral">
          No tasks added yet. Click <AddIcon fontSize="small" /> to add your
          first task.
        </Typography>
      ) : (
        <Table
          aria-label="task table"
          variant="soft"
          sx={{
            mt: 2,
            borderRadius: "md",
            overflow: "hidden",
            tableLayout: "fixed",
            "& th, & td": {
              verticalAlign: "top",
              wordBreak: "break-word",
              whiteSpace: "pre-line",
            },
          }}
        >
          <colgroup>
            <col style={{ width: "110px" }} />
            <col style={{ width: "120px" }} />
            <col style={{ width: "70px" }} />
            <col style={{ width: "230px" }} />
            <col style={{ width: "50px" }} />
            <col style={{ width: "60px" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Date</th>
              <th>Task</th>
              <th>Hours</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id}>
                <td>{t.date ? t.date.slice(0, 10) : ""}</td>
                <td>{t.task}</td>
                <td>{t.hours}</td>
                <td>
                  <Typography
                    sx={{
                      maxWidth: "220px",
                      overflowWrap: "break-word",
                      whiteSpace: "pre-line",
                    }}
                    level="body-sm"
                  >
                    {t.description}
                  </Typography>
                </td>
                <td>
                  <IconButton
                    size="sm"
                    variant="plain"
                    color="neutral"
                    onClick={() => handleOpen(t)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </td>
                <td>
                  <IconButton
                    size="sm"
                    variant="plain"
                    color="danger"
                    onClick={() => {
                      setDeleteTaskId(t.id);
                      setDeleteOpen(true);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Delete Modal */}
      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <ModalDialog variant="outlined" color="danger">
          <DialogTitle>Delete Task?</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogContent>
          <DialogActions>
            <Button variant="plain" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="solid" color="danger" onClick={handleDeleteTask}>
              Delete
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      {/* Add/Edit Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>{editingTask ? "Edit Task" : "Add Task"}</DialogTitle>
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
                  disabled={!!editingTask}
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
                  min={1}
                  max={24}
                />
              </FormControl>
              <FormControl sx={{ mb: 2 }}>
                <FormLabel>Description (optional)</FormLabel>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                  minRows={2}
                />
              </FormControl>
              <DialogActions>
                <Button
                  type="button"
                  variant="plain"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="solid">
                  {editingTask ? "Update" : "Add"}
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