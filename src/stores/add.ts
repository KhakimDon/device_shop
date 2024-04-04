import { query, collection, getDocs, orderBy, updateDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.ts"
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useaddProducts = defineStore('add', () => {
    const addProducts = ref([])

    async function addFunc(item) {
        const m = Math.random().toString().substr(2, 10)
        await setDoc(doc(db, "bekhruzTest", m), item);

    }

    return { addProducts, addFunc }
})
