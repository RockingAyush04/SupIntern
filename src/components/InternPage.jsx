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
  Divider,
  Textarea,
  Chip,
} from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AssignmentIcon from "@mui/icons-material/Assignment";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const formatDate = (dateObj) => dateObj.toISOString().slice(0, 10);

function getDateLimits() {
  const today = new Date();
  const maxDate = formatDate(today);
  const prevMonth = new Date(today);
  prevMonth.setMonth(today.getMonth() - 1);
  if (prevMonth.getMonth() === today.getMonth()) {
    prevMonth.setDate(0);
  }
  const minDate = formatDate(prevMonth);
  return { minDate, maxDate };
}

function isDateInRange(date, min, max) {
  return date >= min && date <= max;
}

function InternPage() {
  const { user, getTasksForUser, addTask, editTask, deleteTask, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState({ date: "", task: "", hours: "", description: "" });
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { minDate, maxDate } = getDateLimits();
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    if (user) getTasksForUser(user.id).then(setTasks);
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
      setForm({ date: "", task: "", hours: "", description: "" });
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
      await editTask(editingTask._id, {
        date: form.date,
        task: form.task,
        hours: Number(form.hours),
        description: form.description,
      });
    } else {
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
            <Typography level="h2" sx={{ color: "#fff", fontWeight: 700 }}>Intern Dashboard</Typography>
            <Typography level="body-sm" sx={{ color: "#94a3b8" }}>Log and manage your daily tasks</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
             <Button variant="solid" color="primary" startDecorator={<AddIcon />} onClick={() => handleOpen()} sx={{ bgcolor: "#7c3aed", "&:hover": { bgcolor: "#6d28d9" }, display: { xs: 'none', sm: 'flex' } }}>Add Task</Button>

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
             overflow: "hidden"
          }}
        >
            <Typography level="h4" sx={{ mb: 3, color: "#fff", display: "flex", alignItems: "center", gap: 1 }}>
                <AssignmentIcon sx={{ color: "#a78bfa" }} />
                Your Entries
            </Typography>

            {tasks.length === 0 ? (
                <Typography sx={{ color: "#94a3b8", textAlign: 'center', py: 4 }}>No tasks added yet.</Typography>
            ) : (
                <Table sx={{ "& thead th": { color: "#fff" }, "& tbody td": { color: "#fff" } }}>
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Task</th>
                    <th>Hours</th>
                    <th>Description</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((t) => (
                    <tr key={t._id}>
                        <td>{t.date ? t.date.slice(0, 10) : ""}</td>
                        <td>{t.task}</td>
                        <td>{t.hours}</td>
                        <td>{t.description}</td>
                        <td>
                             <IconButton
                                size="sm"
                                variant="plain"
                                onClick={() => handleOpen(t)}
                                sx={{ color: "#e2e8f0", "&:hover": { color: "#a78bfa", bgcolor: "rgba(167,139,250,0.1)" } }}
                             >
                                <EditIcon fontSize="small" />
                             </IconButton>
                             <IconButton
                                size="sm"
                                variant="plain"
                                color="danger"
                                onClick={() => { setDeleteTaskId(t._id); setDeleteOpen(true); }}
                                sx={{ color: "#currentcolor", "&:hover": { bgcolor: "rgba(248, 113, 113, 0.1)" } }}
                             >
                                <DeleteIcon fontSize="small" />
                             </IconButton>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            )}
        </Box>

        {/* Delete Modal */}
        <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
            <ModalDialog
                variant="outlined"
                role="alertdialog"
                sx={{
                    bgcolor: "#18181b",
                    borderColor: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    boxShadow: "lg"
                }}
            >
              <DialogTitle sx={{ color: "#fff" }}>
                 <DeleteIcon sx={{ mr: 1, color: "#f87171" }} />
                 Delete Task?
              </DialogTitle>
              <DialogContent sx={{ color: "#a1a1aa" }}>
                Are you sure you want to delete this task? This action cannot be undone.
              </DialogContent>
              <DialogActions>
                <Button variant="plain" onClick={() => setDeleteOpen(false)} sx={{ color: "#a1a1aa", "&:hover": { color: "#f87171", bgcolor: "rgba(248, 113, 113, 0.1)" } }}>
                  Cancel
                </Button>
                <Button variant="solid" color="danger" onClick={handleDeleteTask} sx={{ bgcolor: "#ef4444", "&:hover": { bgcolor: "#dc2626" } }}>
                  Delete
                </Button>
              </DialogActions>
            </ModalDialog>
        </Modal>

        {/* Add/Edit Modal */}
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog
                sx={{
                    bgcolor: "#18181b",
                    borderColor: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    boxShadow: "lg",
                    minWidth: 400
                }}
            >
                <DialogTitle sx={{ color: "#fff" }}>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
                <DialogContent>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                      }}
                    >
                      <FormControl required sx={{ mb: 2 }}>
                        <FormLabel sx={{ color: "#a1a1aa" }}>Date</FormLabel>
                        <Input
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                          disabled={!!editingTask}
                          required
                          min={minDate}
                          max={maxDate}
                          sx={{
                            bgcolor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#fff", 
                            "& input": { colorScheme: "dark" }
                          }}
                        />
                      </FormControl>
                      <FormControl required sx={{ mb: 2 }}>
                        <FormLabel sx={{ color: "#a1a1aa" }}>Task Name</FormLabel>
                        <Input
                          name="task"
                          value={form.task}
                          onChange={handleChange}
                          placeholder="Enter task name"
                          required
                          sx={{
                            bgcolor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#fff",
                            "::placeholder": { color: "#52525b" }
                          }}
                        />
                      </FormControl>
                      <FormControl required sx={{ mb: 2 }}>
                        <FormLabel sx={{ color: "#a1a1aa" }}>Hours</FormLabel>
                        <Input
                          type="number"
                          name="hours"
                          value={form.hours}
                          onChange={handleChange}
                          placeholder="Number of hours"
                          required
                          min={1}
                          max={24}
                          sx={{
                            bgcolor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#fff"
                          }}
                        />
                      </FormControl>
                      <FormControl sx={{ mb: 3 }}>
                        <FormLabel sx={{ color: "#a1a1aa" }}>Description (optional)</FormLabel>
                        <Textarea
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          placeholder="Details about the task..."
                          minRows={3}
                          sx={{
                            bgcolor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#fff"
                          }}
                        />
                      </FormControl>
                      <DialogActions>
                        <Button
                          type="button"
                          variant="plain"
                          onClick={() => setOpen(false)}
                          sx={{ color: "#a1a1aa", "&:hover": { color: "#f87171", bgcolor: "rgba(248, 113, 113, 0.1)" } }}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" variant="solid" sx={{ bgcolor: "#7c3aed", "&:hover": { bgcolor: "#6d28d9" } }}>
                          {editingTask ? "Update Task" : "Add Task"}
                        </Button>
                      </DialogActions>
                    </form>
                </DialogContent>
            </ModalDialog>
        </Modal>

      </Box>
    </Sheet>
  );
}

export default InternPage;