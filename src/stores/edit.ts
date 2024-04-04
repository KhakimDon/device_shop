import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useEditStore = defineStore('edit', () => {
  const editMode = ref(false)


  return { editMode }
})
