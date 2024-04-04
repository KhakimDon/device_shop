<script setup lang="ts">
import { onMounted, ref, unref } from 'vue'
import CRUD from './components/CRUD.vue'
import { useEditStore } from './stores/edit.ts'
import { useDelete } from './stores/delete.ts'
import { useStoreProducts } from './stores/products.ts'
import { ClickOutside as vClickOutside } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

import { db } from "./firebase.ts"
import { query, collection, getDocs, orderBy, updateDoc, doc, setDoc, deleteDoc } from "firebase/firestore";



// import filterIcon from './components/icons/filterIcon.vue'

const edit = useEditStore()
const del = useDelete()
const products = useStoreProducts()
const centerDialogVisible = ref(false)
const centerDialogVisibleDelete = ref(false)
const eventProductForEdit = ref({})
const filterYear = ref('')
const input = ref('')
const valueCategory = ref('')
const editedProducts = ref([])


let _id = ref('')
let _visible = ref('')
let _productname = ref('')
let _category = ref('')
let _realizes = ref('')
let _description = ref('')
let _date = ref('')
let _image = ref('')
let _price = ref('')



onMounted(() => {
  async function get() {
    let a = []
    const q = query(collection(db, "bekhruzTest"))
    const querySnap = await getDocs(q);
    querySnap.forEach((doc) => {
      a.push(doc.data())
    })
    for (let i of a) {
      products.all_products.push(i)
    }
    products.showOnly10 = products.all_products.slice(0, 10)
  }
  get()
})

// async function axiaxi() {
//   for (let i of products.all_products) {
//     await setDoc(doc(db, "bekhruzTest", i.id), i);
//   }
// }

function editMode() {

}

function delMode() {

}

async function deleteProduct() {
  centerDialogVisibleDelete.value = false
  products.deleteNewProduct(eventProductForEdit.value.id)
  await deleteDoc(doc(db, "bekhruzTest", eventProductForEdit.value.id))
}

async function editProduct() {
  centerDialogVisible.value = false
  console.log(eventProductForEdit.value);


  let datess = _realizes.value.toString().split(' ')[3] !== undefined ? _realizes.value.toString().split(' ')[3] : _realizes.value
  console.log(datess)
  let obj = {
    id: _id.value,
    product: _productname.value,
    description: _description.value,
    visible: _visible.value,
    image: _image.value,
    date: _date.value,
    category: _category.value,
    price: _price.value,
    realize: datess
  }

  console.log(obj)
  products.editProduct(obj)



  await setDoc(doc(db, "bekhruzTest", obj.id), obj);


}


function pagination() {
  let index = +document.querySelector(".is-active").innerHTML
  products.pagination(index)
}


function clickCard(item) {
  edit.editMode ? openEditModal(item) : false
  del.deleteMode ? openDeleteModal(item) : false

  


}

function openEditModal(item) {
  centerDialogVisible.value = true
  eventProductForEdit.value = item


  console.log("open edit model")


  _productname.value = eventProductForEdit.value.product
  _category.value = eventProductForEdit.value.category
  _realizes.value = eventProductForEdit.value.realize
  _description.value = eventProductForEdit.value.description
  _date.value = eventProductForEdit.value.date
  _image.value = eventProductForEdit.value.image
  _price.value = eventProductForEdit.value.price
  _visible.value = eventProductForEdit.value.visible
  _id.value = eventProductForEdit.value.id

}


function openDeleteModal(item) {
  centerDialogVisibleDelete.value = true
  eventProductForEdit.value = item

}




const valueDateRealize = ref(0)
const valuePrice = ref([0, 1000])
const checked = ref(false)



const category = [
  {
    value: '1',
    label: 'phones',
  },
  {
    value: '2',
    label: 'appliances',
  },
  {
    value: '3',
    label: 'laptops',
  },
]

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header :class="{ headerEditActive: edit.editMode, headerDelActive: del.deleteMode }" class="header">
        <h1>DeviceShopMaster</h1>
        <!-- <button @click="axiaxi()">add</button> -->

        <span v-if="edit.editMode" class="text-black">Выберите товар для редактирования данных !</span>
        <span v-if="del.deleteMode" class="text-black">Выберите какой товар хотите удалить !</span>

        <CRUD v-if="edit.editMode == false && del.deleteMode == false" @editMode="editMode()" @delMode="delMode()">
          CRUD
        </CRUD>

        <!-- <h1 :class="{ nf: edit.editMode, Lala: !edit.editMode }">d</h1> -->

        <div v-if="edit.editMode == true">
          <el-button @click="edit.editMode = false; editMode();" type="primary">Выйти из режима изменений</el-button>
        </div>

        <div v-if="del.deleteMode == true">
          <el-button @click="del.deleteMode = false; editMode();" type="primary">Выйти из режима удалений</el-button>
        </div>


      </el-header>
      <el-container>

        <el-aside>
          <form class="filter-options">
            <p class="title">Настройка фильтра:</p>

            <div class="mb">
              <p>Наименование Модели:</p>
              <el-input @input="products.search(input)" v-model="input" style="width: 240px" placeholder="Please input"
                clearable />
            </div>


            <div class="mb">
              <p>Поиск по категории:</p>
              <el-select class="filter-slect" @change="products.changeCategory(valueCategory), input = ''"
                v-model="valueCategory" placeholder="Select" size="large" style="width: 240px">
                <el-option v-for="item in category" :key="item.id" :label="item.label" :value="item.label" />
              </el-select>
            </div>

            <div class="mb">
              <p>Год релиза:</p>
              <el-date-picker class="filterYear" @change="products.filterYear(filterYear)" v-model="filterYear"
                type="year" placeholder="Pick a year" />
            </div>

            <div class="mb">
              <p>Цена:</p>
              <el-slider @change="products.valuePrice(valuePrice)" v-model="valuePrice" range show-stops :max="1500" />
            </div>


          </form>
        </el-aside>


        <el-main>

          <div class="counters-paginations">

            <el-pagination v-if="products.all_products.length > 0" @click="pagination()"
              :page-size="products.howManyProductShow" class="pagination" :pager-count="100" layout="prev, pager, next"
              :total="products.products.length" />

            <div>

            </div>
          </div>



          <div class="card_container">
            <el-empty v-if="products.products.length == 0" description="Пусто :(" />

            <el-card @click="clickCard(item)" :id="item.id" v-for="item of products.showOnly10" :key="item.id"
              style="animation-name: editAnim; animation-duration: 3s"
              :class="{ activeEditMode: edit.editMode, activeEditModes: del.deleteMode }" class="card">



              <div v-if="!edit.editMode && !del.deleteMode" class="card-options">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <div>
                      <svg class="card-options-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </div>

                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="openDeleteModal(item)"
                        class="options-dropdown">Delete</el-dropdown-item>
                      <el-dropdown-item @click="openEditModal(item)" class="options-dropdown">Edit</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>



              <div :class="{ editModeDecorActive: edit.editMode }" class="edit-mode-decor"> <span>Изменить этот
                  товар</span> </div>
              <div :class="{ delModeDecorActive: del.deleteMode }" class=" del-mode-decor"> <span>Удалить этот
                  товар</span> </div>
              <div style="background-color: white">
                <img :src="item.image" style="width: 100%" />
              </div>
              <template #footer>
                <div>
                  <span class="card-model"> {{ item.product }} </span>
                  <span class="card-realize"> {{ item.realize }} </span>
                </div>
                <div>
                  <p class="card-price">${{ item.price }} </p>
                  <p class="card-category">{{ item.category }}</p>
                </div>
                <div>
                  <el-checkbox v-model="item.visible">Show to users </el-checkbox>
                  <span class="card-date"> {{ item.date }} </span>
                </div>
              </template>
            </el-card>
          </div>



          <!-- изменение  -->
          <el-dialog class="editmodal" v-model="centerDialogVisible"
            :title="`Изменить продукт #${eventProductForEdit.id}`" width="500" align-center>

            <form action="#">
              <div class="editform">
                <p>Продукт:</p>
                <input v-model="_productname" style="width: 240px" placeholder="Please input" />
              </div>
              <div class="editform">
                <p>Категория:</p>
                <select class="categ" v-model="_category">
                  <option value="appliances">Техника</option>
                  <option value="phones">Телефоны</option>
                  <option value="laptops">Ноутбуки</option>
                </select>
              </div>
              <div class="flex-edit">
                <div class="editform">
                  <p>Год релиза:</p>
                  <el-date-picker class="godreliza" v-model="_realizes" type="year" placeholder="Pick a year" />
                </div>
                <div class="editform">
                  <p>Цена:</p>
                  <p>$ <input type="number" v-model="_price" style="width: 240px" placeholder="Please input" />
                  </p>
                </div>
              </div>
              <div class="editform">
                <p>Продукт</p>
                <textarea v-model="_description" style="width: 240px" placeholder="Please input"> </textarea>
              </div>
              <div class="editform">
                <p>Дата добавления в систему: </p>
                <input disabled v-model="_date" style="width: 240px" placeholder="Please input" />
              </div>
              <div class="editform pickphoto">
                <p>Ссылка для картинки: </p>
                <input v-model="_image" style="width: 240px" placeholder="Please input" />
                <img :src="_image" alt="">
              </div>

            </form>

            <template #footer>
              <div class="dialog-footer">
                <el-button @click="centerDialogVisible = false">Отмена</el-button>
                <el-button @click="editProduct()" type="primary">
                  Сохранить
                </el-button>
              </div>
            </template>
          </el-dialog>


          <!-- удаление  -->
          <el-dialog class="editmodal" v-model="centerDialogVisibleDelete"
            :title="`Удаление продукта #${eventProductForEdit.id}`" width="500" align-center>

            <form action="#">

              <h1>Вы действительно хотите безвазвратно удлаить продукт {{ eventProductForEdit.product }} ?</h1>

            </form>

            <template #footer>
              <div class="dialog-footer">
                <el-button @click="centerDialogVisibleDelete = false">Отмена</el-button>
                <el-button class="deletee" @click="deleteProduct()">
                  Я уверен, удалить
                </el-button>
              </div>
            </template>
          </el-dialog>


        </el-main>




      </el-container>
    </el-container>

  </div>
</template>

<style scoped>
.slider-demo-block {
  max-width: 600px;
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}

@keyframes editAnim {
  0% {
    background: red !important;
  }

  100% {
    background: blue !important;
  }
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.deletee {
  background: red;
  color: white;

}
</style>
