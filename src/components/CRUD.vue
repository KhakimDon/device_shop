<script lang="ts" setup>
import { ref } from 'vue'
import { useEditStore } from '../stores/edit.ts'
import { useDelete } from '../stores/delete.ts'
import { useaddProducts } from '../stores/add.ts'
import { query, collection, getDocs, orderBy, updateDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.ts"
import { useStoreProducts } from '../stores/products.ts'

const edit = useEditStore()
const addGood = useaddProducts()
const del = useDelete()

const drawer = ref(false)
const add = ref(false)
const products = useStoreProducts()

async function addToAllProducts() {
    let datess = realizes.value.toString().split(' ')[3]
    let obj = {
        id: id.value,
        product: productname.value,
        description: description.value,
        visible: false,
        image: image.value,
        date: date,
        category: category.value,
        price: price.value,
        realize: datess
    }

    products.addNewProduct(obj)

    await setDoc(doc(db, "bekhruzTest", obj.id), obj);


}


let id = ref(Math.random().toString().substr(2, 10))
let description = ref('')
let date = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`
let category = ref('')
let image = ref('')
let price = ref('')
let productname = ref('')
let realizes = ref('')

</script>

<template>
    <div>
        <el-button class="filter" style="margin-left: 16px" @click="drawer = true">
            <slot></slot>
        </el-button>

        <el-drawer v-model="drawer" title="CRUD">
            <el-button @click="drawer = false; add = false; edit.editMode = true; $emit('editMode')"
                type="warning">Edit</el-button>
            <el-button @click="add = true" type="success">Add</el-button>
            <el-button @click="drawer = false; add = false; del.deleteMode = true; $emit('delMode')"
                type="danger">Delete</el-button>

            <!-- добавить  -->
            <form @submit.prevent="addToAllProducts()" v-if="add" action="#">
                <h2>Добавить продукт:</h2>
                <div class="editform">
                    <p>Продукт:</p>
                    <input required v-model="productname" style="width: 240px" placeholder="Please input" />
                </div>
                <div class="editform">
                    <p>Категория:</p>
                    <select class="categ" v-model="category">
                        <option value="appliances">Техника</option>
                        <option value="phones">Телефоны</option>
                        <option value="laptops">Ноутбуки</option>
                    </select>
                </div>
                <div class="flex-edit">
                    <div class="editform">
                        <p>Год релиза:</p>
                        <el-date-picker class="godreliza" v-model="realizes" type="year" placeholder="Pick a year" />
                    </div>
                    <div class="editform">
                        <p>Цена:</p>
                        <p>$ <input v-model="price" type="number" required style="width: 240px"
                                placeholder="Please input" />
                        </p>
                    </div>
                </div>
                <div class="editform">
                    <p>Продукт</p>
                    <textarea v-model="description" style="width: 240px" placeholder="Please input"> </textarea>
                </div>
                <div class="editform">
                    <p>Дата добавления в систему: </p>
                    <input v-model="date" disabled style="width: 240px" placeholder="Please input" />
                </div>
                <div class="editform pickphoto">
                    <p>Ссылка для картинки: </p>
                    <input v-model="image" required style="width: 240px" placeholder="Please input" />
                    <!-- <img src="eventProductForEdit.image" alt=""> -->
                </div>
                <el-button @click="addToAllProducts()">Отмена</el-button>
                <button><el-button class="btn">Добавить</el-button></button>
            </form>


        </el-drawer>
    </div>
</template>

<style scoped>
.addactive {
    color: #67C23A;
    border: 1px solid #67C23A;
    background: transparent;
}

.btn {
    background: #409EFF;
    color: white;
}

h2 {
    color: black;
    margin-bottom: 15px;
}

form {
    margin-top: 40px;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.346);
}

.editform {
    color: black !important;
}

.filter {
    color: white;
    background: transparent;
}
</style>