"use client";

import React, { useState, useEffect } from "react";
import initialData from "./data.json";
import BoardColumn from "./BoardColumn";
import { Task } from "./BoardCard";
import { saveBoardToServer } from "./actions";

const COLUMNS: Task["status"][] = ["to do", "in progress", "to test", "done"];
const LOCAL_STORAGE_KEY = "sprint-board-tasks";

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  // 1. Chargement initial depuis le localStorage (ou le JSON par défaut)
  useEffect(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(initialData.tasks as Task[]);
    }
    setIsLoaded(true);
  }, []);

  // 2. Sauvegarde automatique dans le localStorage local à chaque changement
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  // Fonction pour faire avancer une tâche au clic
  const handleProgressTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) return task;

        let nextStatus: Task["status"];
        switch (task.status) {
          case "to do":
            nextStatus = "in progress";
            break;
          case "in progress":
            nextStatus = "to test";
            break;
          case "to test":
            nextStatus = "done";
            break;
          case "done":
            nextStatus = "to do";
            break;
        }
        return { ...task, status: nextStatus };
      }),
    );
  };

  // Fonction pour supprimer une tâche
  const handleDeleteTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  };

  // Fonction pour ajouter une tâche via le formulaire inline
  const handleAddTask = (
    status: Task["status"],
    title: string,
    content: string,
  ) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      content,
      status,
    };
    setTasks((currentTasks) => [...currentTasks, newTask]);
  };

  // [NOUVEAU] Appel de la Server Action au clic sur le bouton de synchronisation
  const handleSyncToServer = async () => {
    setIsSyncing(true);
    setSyncMessage("");

    const result = await saveBoardToServer(tasks);

    setIsSyncing(false);
    if (result.success) {
      setSyncMessage("✓ data.json mis à jour !");
      // On efface le message de succès après 3 secondes
      setTimeout(() => setSyncMessage(""), 3000);
    } else {
      setSyncMessage("❌ Erreur de sauvegarde");
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 text-slate-400 font-medium">
        Chargement du sprint...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 antialiased">
      <header className="mb-8 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Sprint E-Commerce
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Sauvegarde locale automatique active.
          </p>
        </div>

        {/* Zone du bouton de synchronisation */}
        <div className="flex items-center gap-3">
          {syncMessage && (
            <span className="text-xs font-medium text-slate-600 bg-slate-200/60 px-3 py-1.5 rounded-lg animate-in fade-in duration-200">
              {syncMessage}
            </span>
          )}
          <button
            onClick={handleSyncToServer}
            disabled={isSyncing}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors duration-150 flex items-center gap-2"
          >
            {isSyncing ? "Synchronisation..." : "💾 Sauvegarder dans data.json"}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-start max-w-7xl mx-auto">
        {COLUMNS.map((status) => {
          const columnTasks = tasks.filter((task) => task.status === status);

          return (
            <BoardColumn
              key={status}
              status={status}
              tasks={columnTasks}
              onCardClick={handleProgressTask}
              onDeleteCard={handleDeleteTask}
              onAddTask={handleAddTask}
            />
          );
        })}
      </div>
    </div>
  );
}
