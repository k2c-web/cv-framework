'use server';

import fs from 'fs/promises';
import path from 'path';
import { Task } from './BoardCard';

export async function saveBoardToServer(tasks: Task[]) {
  try {
    // On cible le chemin absolu de ton fichier data.json
    const filePath = path.join(process.cwd(), 'app', 'board', 'sprint', 'data.json');
    
    // On reconstruit la structure d'origine du JSON
    const dataToSave = { tasks };

    // On écrit le fichier sur le disque avec un formatage propre (2 espaces)
    await fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2), 'utf-8');
    
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de l'écriture du fichier JSON :", error);
    return { success: false, error: "Impossible de sauvegarder sur le serveur." };
  }
}