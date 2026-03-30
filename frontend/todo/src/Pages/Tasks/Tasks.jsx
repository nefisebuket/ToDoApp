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
  const [newTask, setNewTask] = useState({
    TaskTitle: "",
    Description: "",
    Situation: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [editTask, setEditTask] = useState({
    taskTitle: "",
    description: "",
    situation: false,
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

  const handleAddTask = async () => {
    const taskToSend = {
      taskTitle: newTask.TaskTitle,
      description: newTask.Description,
      situation: newTask.Situation,
    };
    await createTask(taskToSend);
    setNewTask({ TaskTitle: "", Description: "", Situation: false });
    fetchTasks();
  };

  const handleUpdateTask = async (task) => {
    const id = task.taskId;

    if (!id) {
      console.error("Hata: taskId bulunamadı!", task);
      return;
    }

    try {
      await updateTask(id, {
        taskId: id,
        taskTitle: task.taskTitle,
        description: task.description,
        situation: !task.situation,
      });
      fetchTasks();
    } catch (error) {
      console.error("Güncelleme hatası:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!id) return;
    await deleteTask(id);
    fetchTasks();
  };
  const startEdit = (task) => {
    setEditingId(task.taskId);
    setEditTask({
      taskTitle: task.taskTitle,
      description: task.description,
      situation: task.situation,
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      await updateTask(id, {
        taskId: id,
        ...editTask,
      });
      setEditingId(null);
      fetchTasks();
    } catch (error) {
      console.error("Güncelleme hatası:", error);
    }
  };

  return (
    <div className="task-container">
      <div className="task-form">
        <input
          type="text"
          placeholder="Başlık"
          value={newTask.TaskTitle}
          onChange={(e) =>
            setNewTask({ ...newTask, TaskTitle: e.target.value })
          }
        />
        <input
          type="text"
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
              setNewTask({ ...newTask, Situation: e.target.checked })
            }
          />
          Yapıldı
        </label>
        <button onClick={handleAddTask}>Ekle</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-item" key={task.taskId}>
            {}
            {editingId === task.taskId ? (
              <>
                {}
                <div className="task-info">
                  <input
                    type="text"
                    className="edit-input"
                    value={editTask.taskTitle}
                    onChange={(e) =>
                      setEditTask({ ...editTask, taskTitle: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="edit-input"
                    value={editTask.description}
                    onChange={(e) =>
                      setEditTask({ ...editTask, description: e.target.value })
                    }
                  />
                </div>

                <input
                  type="checkbox"
                  checked={editTask.situation}
                  onChange={(e) =>
                    setEditTask({ ...editTask, situation: e.target.checked })
                  }
                />

                <div className="task-actions">
                  <button
                    className="save-btn"
                    onClick={() => handleSaveEdit(task.taskId)}
                  >
                    Kaydet
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setEditingId(null)}
                  >
                    İptal
                  </button>
                </div>
              </>
            ) : (
              <>
                {}
                <div className="task-info">
                  <h4>{task.taskTitle}</h4>
                  <p>{task.description}</p>
                </div>

                <input type="checkbox" checked={task.situation} readOnly />

                <div className="task-actions">
                  <button
                    className="update-btn"
                    onClick={() => startEdit(task)}
                  >
                    Düzenle
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteTask(task.taskId)}
                  >
                    Sil
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
