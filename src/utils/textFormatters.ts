import { CrossRefRelationship } from '../types';

export function getRelationshipMeta(relationship: CrossRefRelationship) {
  switch (relationship) {
    case 'prophetic_fulfillment':
      return {
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
        badgeColorDark: 'bg-purple-950/40 text-purple-300 border-purple-800/40',
        icon: '🔮',
        defaultEn: 'Prophetic Fulfillment',
        defaultTe: 'ప్రవచన నెరవేర్పు',
      };
    case 'parallel_account':
      return {
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
        badgeColorDark: 'bg-sky-950/40 text-sky-300 border-sky-800/40',
        icon: '⚡',
        defaultEn: 'Parallel Passage',
        defaultTe: 'సమాంతర వచనము',
      };
    case 'theological_foundation':
      return {
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
        badgeColorDark: 'bg-amber-950/40 text-amber-300 border-amber-800/40',
        icon: '🏛️',
        defaultEn: 'Theological Foundation',
        defaultTe: 'మూల సిద్ధాంతం',
      };
    case 'direct_quotation':
      return {
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        badgeColorDark: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40',
        icon: '📜',
        defaultEn: 'Direct Citation',
        defaultTe: 'ప్రత్యక్ష ఉల్లేఖనం',
      };
    case 'thematic_echo':
      return {
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        badgeColorDark: 'bg-indigo-950/40 text-indigo-300 border-indigo-800/40',
        icon: '🌿',
        defaultEn: 'Thematic Echo',
        defaultTe: 'అంశ సంబంధిత లంకె',
      };
    case 'practical_application':
    default:
      return {
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
        badgeColorDark: 'bg-teal-950/40 text-teal-300 border-teal-800/40',
        icon: '🕊️',
        defaultEn: 'Practical Application',
        defaultTe: 'ఆత్మీయ అన్వయం',
      };
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  } catch (e) {
    console.error('Failed to copy', e);
    return false;
  }
}
