import { defineStore } from 'pinia';
import { useRequest } from '~/composables/useRequest';
import { useAuthStore } from '~/stores/auth-store';
import type { Note } from '~/types';

export const useNoteStore = defineStore('note', () => {
	const { request } = useRequest();
	const authStore = useAuthStore();

	const notes = ref<Note[]>([]);
	const tags = ref<string[]>([]);

	async function getNote (id: string): Promise<Note> {
		return authStore.isLoggedIn
			? await request(`/admin/notes/${id}`, { headers: { Authorization: `Bearer ${authStore.token}` } })
			: await request(`/notes/${id}`);
	}

	async function getNoteBySlug (slug: string): Promise<Note> {
		return authStore.isLoggedIn
			? await request(`/admin/notes/${slug}?slug=true`, { headers: { Authorization: `Bearer ${authStore.token}` } })
			: await request(`/notes/${slug}?slug=true`);
	}

	async function indexNotes (): Promise<Note[]> {
		notes.value = authStore.isLoggedIn
			? await request('/admin/notes', { headers: { Authorization: `Bearer ${authStore.token}` } })
			: await request('/notes');

		notes.value = _sortNotes(notes.value);

		return notes.value;
	}

	async function indexTags (): Promise<string[]> {
		tags.value = authStore.isLoggedIn
			? await request('/admin/notes/tags', { headers: { Authorization: `Bearer ${authStore.token}` } })
			: await request('/notes/tags');

		return tags.value;
	}

	async function postNote (note: Partial<Note>): Promise<Note> {
		return await request('/admin/notes', {
			method: 'POST',
			headers: { Authorization: `Bearer ${authStore.token}` },
			body: JSON.stringify(note)
		});
	}

	async function patchNote (id: string, note: Partial<Note>): Promise<Note> {
		return await request(`/admin/notes/${id}`, {
			method: 'PATCH',
			headers: { Authorization: `Bearer ${authStore.token}` },
			body: JSON.stringify(note)
		});
	}

	async function deleteNote (id: string): Promise<Note> {
		return await request(`/admin/notes/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${authStore.token}` }
		});
	}

	function _sortNotes (notes: Note[]) {
		return notes.sort((a, b) => {
			const dateA = new Date(a.createdAt);
			const dateB = new Date(b.createdAt);

			return dateA > dateB ? -1 : 1;
		});
	}

	return {
		notes,
		tags,
		getNote,
		getNoteBySlug,
		indexNotes,
		indexTags,
		postNote,
		patchNote,
		deleteNote
	};
});
