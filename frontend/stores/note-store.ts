import { defineStore } from 'pinia'
import { useRequest } from '~/composables/useRequest'
import { useAuthStore } from '~/stores/auth-store'
import type { Note, Tag } from '~/types'

interface WipNote extends Partial<Note> {
  _id?: string
  slug?: string
  tags?: Tag[]
  views?: number
  createdAt?: string
}

export const useNoteStore = defineStore('note', () => {
  const { request } = useRequest()
  const authStore = useAuthStore()

  const notes = ref<Note[]>([])
  const tags = ref<Tag[]>([])

  async function getNote (id: string): Promise<Note> {
    return await request(`/articles/${id}`)
  }

  async function getNoteBySlug (slug: string): Promise<Note> {
    return await request(`/articles/${slug}?slug=true`)
  }

  async function indexNotes (): Promise<Note[]> {
    notes.value = _sortNotes(await request('/articles'))

    return notes.value
  }

  async function indexTags (): Promise<Tag[]> {
    tags.value = await request('/tags')

    return tags.value
  }

  async function postNote (note: WipNote): Promise<Note> {
    return await request('/articles', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      },
      body: JSON.stringify(note)
    })
  }

  async function patchNote (id: string, note: WipNote): Promise<Note> {
    return await request(`/articles/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      },
      body: JSON.stringify(note)
    })
  }

  async function deleteNote (id: string): Promise<Note> {
    return await request(`/articles/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
  }

  function _sortNotes (notes: Note[]) {
    return notes.sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)

      return dateA > dateB ? -1 : 1
    })
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
  }
})
