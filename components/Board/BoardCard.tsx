import React from "react";

export interface Task {
  id: string;
  title: string;
  content: string;
  status: "to do" | "in progress" | "to test" | "done";
}

interface BoardCardProps {
  task: Task;
  onCardClick: (taskId: string) => void;
  onDeleteClick: (taskId: string) => void;
}

export default function BoardCard({
  task,
  onCardClick,
  onDeleteClick,
}: BoardCardProps) {
  return (
    <div className="relative group">
      <button
        onClick={() => onCardClick(task.id)}
        className="w-full text-left bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-sky-400 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400/40"
      >
        <h3 className="font-semibold text-slate-800 group-hover:text-sky-600 transition-colors text-sm leading-snug pr-6">
          {task.title}
        </h3>

        <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
          {task.content}
        </p>

        <div className="mt-4 pt-2 border-t border-slate-100 flex justify-end">
          <span className="text-[10px] text-slate-400 group-hover:text-sky-500 font-bold uppercase tracking-wider flex items-center gap-1 transition-colors">
            {task.status === "done" ? "↺ Recommencer" : "Avancer →"}
          </span>
        </div>
      </button>

      {/* Petit bouton de suppression en haut à droite, visible surtout au survol */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Évite de déclencher le clic de la carte entière !
          onDeleteClick(task.id);
        }}
        className="absolute top-3 right-3 text-slate-300 hover:text-red-500 text-xs font-bold p-1 rounded-md hover:bg-red-5 transition-colors"
        title="Supprimer la tâche"
      >
        ✕
      </button>
    </div>
  );
}
