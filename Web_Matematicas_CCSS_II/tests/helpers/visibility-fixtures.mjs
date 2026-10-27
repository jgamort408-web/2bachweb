import fs from 'node:fs';
import { buildContentCatalog } from '../../assets/js/content/catalog.js';
import { questions, flashcards } from '../../content/activities/catalog.js';
import { DEFAULT_VISIBILITY_CONFIG } from '../../assets/js/content/visibility.js';

export function readConfig(name) {
  return JSON.parse(fs.readFileSync(new URL('../../config/' + name + '.json', import.meta.url), 'utf8'));
}

export function projectCatalog(resourceItems = readConfig('resources').resources) {
  return buildContentCatalog({
    pages: readConfig('pages'), widgets: readConfig('widgets'), editorial: readConfig('editorial'),
    studyScopes: readConfig('study-scopes'), questions, flashcards,
    resources: { schemaVersion: 1, resources: resourceItems }
  });
}

export function visibility(entries = {}, extra = {}) {
  return { ...structuredClone(DEFAULT_VISIBILITY_CONFIG), ...extra, entries };
}

// Metadata-only fixtures. They do not represent compiled or published PDF files.
export const resourceFixtures = [
  { id: 'fixture-exam', title: 'Examen de prueba', kind: 'exam', topicId: 't01',
    path: 'fixtures/exam.pdf', tags: ['prueba'], reviewStatus: 'pending' },
  { id: 'fixture-solution', title: 'Soluciones de prueba', kind: 'solution', topicId: 't01',
    examId: 'fixture-exam', path: 'fixtures/solution.pdf', tags: ['prueba'], reviewStatus: 'partial' },
  { id: 'fixture-document', title: 'Documento de prueba', kind: 'document',
    path: 'fixtures/document.pdf', tags: [] }
];
