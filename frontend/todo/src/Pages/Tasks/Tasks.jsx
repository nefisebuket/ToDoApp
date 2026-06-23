import React, { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../services/Services";
import "./task.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  // modal kontrol
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add"); // add | edit
  const [selectedId, setSelectedId] = useState(null);

  // tek form state (add + edit için ortak)
  const [newTask, setNewTask] = useState({
    TaskTitle: "",
    Description: "",
    Situation: false,
  });

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Görevler yüklenirken hata:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD + EDIT TEK FONKSİYON
  const handleSave = async () => {
    try {
      if (mode === "add") {
        await createTask({
          taskTitle: newTask.TaskTitle,
          description: newTask.Description,
          situation: newTask.Situation,
        });
      } else {
        await updateTask(selectedId, {
          taskId: selectedId,
          taskTitle: newTask.TaskTitle,
          description: newTask.Description,
          situation: newTask.Situation,
        });
      }

      setOpen(false);
      fetchTasks();

      setNewTask({
        TaskTitle: "",
        Description: "",
        Situation: false,
      });
    } catch (error) {
      console.error("Kaydetme hatası:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!id) return;
    await deleteTask(id);
    fetchTasks();
  };

  // EDIT açma
  const startEdit = (task) => {
    setMode("edit");
    setSelectedId(task.taskId);

    setNewTask({
      TaskTitle: task.taskTitle,
      Description: task.description,
      Situation: task.situation,
    });

    setOpen(true);
  };

  return (
    <div className="task-container">
      {/* ADD BUTON */}
      <button
        className="add-btn"
        onClick={() => {
          setMode("add");
          setOpen(true);
          setSelectedId(null);

          setNewTask({
            TaskTitle: "",
            Description: "",
            Situation: false,
          });
        }}
      >
        + Ekle
      </button>

      {/* TASK LİST */}
      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-item" key={task.taskId}>
            <div className="task-info">
              <h4 className="task-title">{task.taskTitle}</h4>
              <p className="task-desc">{task.description}</p>
            </div>

            <input type="checkbox" checked={task.situation} readOnly />

            <div className="task-actions">
              <button className="update-btn" onClick={() => startEdit(task)}>
                Düzenle
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDeleteTask(task.taskId)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h3 style={{ color: "#4B3B61" }}>
              {mode === "add" ? "Yeni Task Ekle" : "Task Düzenle"}
            </h3>

            <input
              placeholder="Başlık"
              value={newTask.TaskTitle}
              onChange={(e) =>
                setNewTask({ ...newTask, TaskTitle: e.target.value })
              }
            />

            <input
              placeholder="Açıklama"
              value={newTask.Description}
              onChange={(e) =>
                setNewTask({ ...newTask, Description: e.target.value })
              }
            />

            <label>
              <input
                type="checkbox"
                checked={newTask.Situation}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    Situation: e.target.checked,
                  })
                }
              />
              Tamamlandı
            </label>
            <div className="modal-actions">
              <button onClick={handleSave}>
                {mode === "add" ? "Ekle" : "Güncelle"}
              </button>

              <button onClick={() => setOpen(false)}>İptal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;
