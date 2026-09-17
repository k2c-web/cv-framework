import React, { useState } from "react";
import BoardCard, { Task } from "./BoardCard";

export interface BoardColumnProps {
  status: Task["status"];
  tasks: Task[];
  onCardClick: (taskId: string) => void;
  onDeleteCard: (taskId: string) => void;
  onAddTask: (status: Task["status"], title: string, content: string) => void;
}

export default function BoardColumn({
  status,
  tasks,
  onCardClick,
  onDeleteCard,
  onAddTask,
}: BoardColumnProps) {
  // États locaux pour gérer l'affichage du formulaire inline
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleMap: Record<Task["status"], string> = {
    "to do": "À faire",
    "in progress": "En cours",
    "to test": "À tester",
    done: "Terminé",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // On envoie les données à l'orchestrateur
    onAddTask(status, title, content);

    // On réinitialise le formulaire inline
    setTitle("");
    setContent("");
    setIsCreating(false);
  };

  return (
    <div className="bg-slate-200/60 border border-slate-300/50 rounded-2xl p-4 flex flex-col max-h-[85vh] shadow-sm">
      {/* En-tête de la colonne */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="font-bold text-xs uppercase tracking-wider text-slate-600">
          {titleMap[status]}
        </h2>
        <span className="bg-sky-100 text-sky-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-sky-200/40">
          {tasks.length}
        </span>
      </div>

      {/* Conteneur de cartes scrollable */}
      <div className="flex flex-col gap-3 overflow-y-auto pr-1 mb-3 flex-1 scrollbar-thin">
        {tasks.map((task) => (
          <BoardCard
            key={task.id}
            task={task}
            onCardClick={onCardClick}
            onDeleteClick={onDeleteCard}
          />
        ))}

        {tasks.length === 0 && !isCreating && (
          <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-300 rounded-xl bg-slate-100/50">
            Aucune tâche
          </div>
        )}

        {/* [NOUVEAU] Le Formulaire Inline */}
        {isCreating && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-sky-300 rounded-xl p-3 shadow-md animate-in fade-in zoom-in-95 duration-150"
          >
            <input
              type="text"
              placeholder="Titre de la tâche..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none mb-2"
              autoFocus
              required
            />
            <textarea
              placeholder="Description (optionnelle)..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-xs text-slate-600 placeholder-slate-400 focus:outline-none resize-none h-16 leading-relaxed"
            />
            <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-700 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-[11px] font-semibold bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors shadow-sm"
              >
                Enregistrer
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Bouton d'action / Déclencheur du formulaire */}
      {!isCreating && (
        <button
          onClick={() => setIsCreating(true)}
          className="w-full py-2.5 bg-white hover:bg-sky-50 border border-slate-300/70 hover:border-sky-300 rounded-xl text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors shadow-sm flex items-center justify-center gap-1.5 focus:outline-none"
        >
          <span>+</span> Ajouter une tâche
        </button>
      )}
    </div>
  );
}
