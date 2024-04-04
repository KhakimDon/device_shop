import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDelete = defineStore('delete', () => {
    const deleteMode = ref(false)

    return { deleteMode }
})
