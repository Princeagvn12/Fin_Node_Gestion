// src/utils/formatDate.js

// formatDate: retourne une date en format JJ/MM/AAAA (jour mois année)
export function formatDate(dateInput) {
  if (!dateInput) return "-";
  const d = (dateInput instanceof Date) ? dateInput : new Date(dateInput);
  if (isNaN(d.getTime())) return "-";
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/*
Utilisation :
import { formatDate } from '../../utils/formatDate.js';
formatDate(entry.date); // Affiche ex : 26/10/2025
*/
