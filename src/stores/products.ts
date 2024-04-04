import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { db } from "../firebase.ts"
import { query, collection, getDocs, orderBy, updateDoc, doc, setDoc, deleteDoc } from "firebase/firestore";

export const useStoreProducts = defineStore('useStoreProducts', () => {


    const all_products = ref([])

    const products = ref(all_products.value)



    const howManyProductShow = ref(10)


    const counterStart = ref(0)
    const counterEnd = ref(howManyProductShow.value)
    const showOnly10 = ref(products.value.slice(counterStart.value, counterEnd.value))

    function pagination(index) {
        counterStart.value = (index * howManyProductShow.value) - howManyProductShow.value
        counterEnd.value = index * howManyProductShow.value
        showOnly10.value = products.value.slice(counterStart.value, counterEnd.value)

    }

    function search(input) {
        products.value = all_products.value
        const filtered = products.value.filter(item => item.product.substr(0, input.length).toLowerCase() == input.toLowerCase())
        products.value = filtered
        showOnly10.value = products.value.slice(0, 10)
    }
    function changeCategory(input) {
        products.value = all_products.value
        const filtered = products.value.filter(item => item.category == input)
        products.value = filtered
        showOnly10.value = products.value.slice(0, 10)
    }
    function filterYear(input) {
        products.value = all_products.value
        const filtered = products.value.filter(item => item.realize == input.getFullYear())
        products.value = filtered
        showOnly10.value = products.value.slice(0, 10)
    }
    function valuePrice(input) {
        products.value = all_products.value
        const filtered = products.value.filter(item => item.price > input[0] && item.price < input[1])
        products.value = filtered
        showOnly10.value = products.value.slice(0, 10)
    }
    function addNewProduct(obj) {
        all_products.value.unshift(obj)
        products.value = all_products.value
        showOnly10.value = products.value.slice(0, 10)
    }
    async function deleteNewProduct(obj) {
        const filtered = all_products.value.filter(item => item.id != obj)
        all_products.value = filtered
        products.value = all_products.value
        showOnly10.value = products.value.slice(0, 10)
    }
    async function editProduct(obj) {
        const filtered = all_products.value.filter(item => item.id != obj.id)
        all_products.value = filtered
        all_products.value.unshift(obj)
        products.value = all_products.value
        showOnly10.value = products.value.slice(0, 10)
    }


    return { products, showOnly10, howManyProductShow, pagination, search, changeCategory, filterYear, valuePrice, all_products, addNewProduct, deleteNewProduct, editProduct }
})

// {
//     id: 'qwdjl178',
//     product: 'Iphone 15 pro max',
//     realize: 2023,
//     category: 'phones',
//     price: 1450,
//     description: 'Дисплей: 6,1 и 6,7 дюйма, LTPO Super Retina XDR OLED, 2556×1179 и 2796×1290, 1−120 Гц, не менее 2000 нит, HDR10, Dolby Vision, Always-On Display стекло Ceramic Shield, толщина рамок 1,55 мм. Чипсет: A17 Bionic. Оперативная память: 8 ГБ.',
//     date: '23.03.2023',
//     visible: false,
//     image: 'https://www.creditasia.uz/upload/iblock/9b9/zyr2wzvv0d16wsbiyvi90fbtsmtf6g0e/smartfon-apple-iphone-15-pro-max-256gb-white-titanium.jpg',
// },
// {
//     id: 'd218ujs8',
//     product: 'Dyson',
//     realize: 2024,
//     category: 'appliances',
//     price: 670,
//     description: 'сингапурская международная технологическая компания. Основана в 1991 году Джеймсом Дайсоном в Малмсбери, Англия. Компания разрабатывает и производит бытовые приборы',
//     visible: true,
//     date: '02.02.2023',
//     image: 'https://www.creditasia.uz/upload/iblock/230/1rhf1zkgbdqtf7bp31vsn0ne2qjznpu0/fen-dyson-supersonic-hd07-gray-pink.webp',
// },
// {
//     id: 'adj82djk',
//     product: 'Asus TUF gaming',
//     realize: 2020,
//     category: 'laptops',
//     price: 750,
//     description: 'Дисплей: 6,1 и 6,7 дюйма, LTPO Super Retina XDR OLED, 2556×1179 и 2796×1290, 1−120 Гц, не менее 2000 нит, HDR10, Dolby Vision, Always-On Display стекло Ceramic Shield, толщина рамок 1,55 мм. Чипсет: A17 Bionic. Оперативная память: 8 ГБ.',
//     date: '12.01.2024',
//     visible: false,
//     image: 'https://mini-io-api.texnomart.uz/catalog/product/3562/356214/192196/7e571e6f-a868-4dd8-99b6-e13108385b4f.webp',
// },
// {
//     id: '1dh127d',
//     product: 'Samsung Galaxy A73',
//     realize: 2021,
//     category: 'phone',
//     price: 105,
//     description: 'Зима не лучшее время для гаджетов. Аккумуляторы боятся холода, а нежное стекло корпусов и экранов — падений, которые случаются намного чаще. Да и просто выронить смартфон из кармана зимней одежды куда проще',
//     date: '12.02.2024',
//     visible: true,
//     image: 'https://mini-io-api.texnomart.uz/catalog/product/1041/104163/181142/2eeeb1b1-e38d-4846-9d07-e8acd1d9944b.jpg',
// },
// {
//     id: 'asdbn27hh',
//     product: 'HP Probook',
//     realize: 2023,
//     category: 'laptops',
//     price: 750,
//     description: 'В игровом ноутбуке HP с диагональю 13,3 дюйма есть все, что тебе может понадобиться для отличной игры. Он оснащен мощным процессором Intel®, великолепной видеокартой. Эффективная система охлаждения не допустит перегрева даже во время самых жарких сражений. ',
//     date: '30.03.2024',
//     visible: false,
//     image: 'https://mini-io-api.texnomart.uz/catalog/product/1045/104525/192849/44f3b795-22cc-4b11-ab39-40080c73c45f.jpg',
// },
// {
//     id: 'd2hsd787',
//     product: 'Babyliss Pro 2073EPE',
//     realize: 2018,
//     category: 'appliances',
//     price: 56,
//     description: 'Ширина пластин 38 мм / Максимальная температура нагрева 230 ºС / Длина сетевого шнура 2.7 Длина пластин',
//     date: '18.02.2024',
//     visible: false,
//     image: 'https://mini-io-api.texnomart.uz/catalog/product/1040/104017/180795/0d9473cc-fcae-41a6-acd1-6aec2c1b30ef.jpg',
// },
// {
//     id: 'ad23d21a',
//     product: 'Infinix Smart 7 Plus 4',
//     realize: 2020,
//     category: 'phones',
//     price: 90,
//     date: '13.02.2024',
//     description: 'Количество SIM-карт / 2 nano SIM / Модель / Smart 7 Plus',
//     visible: true,
//     image: 'https://mini-io-api.texnomart.uz/catalog/product/3566/356646/194659/1f7b42ed-96f3-418a-bac2-43b56cc88abf.webp',
// },
// {
//     id: 'asdj277',
//     product: 'Polaris PHC 1922RC',
//     realize: 2015,
//     category: 'appliances',
//     price: 30,
//     description: 'Бренд / Polaris / Количество насадок / 2',
//     date: '07.02.2022',
//     visible: false,
//     image: 'https://mini-io-api.texnomart.uz/catalog/product/940/94025/170377/34e7e741-b8eb-491e-a3d5-9b48f8162bd5.jpg',
// },
// {
//     id: 'ad2d233',
//     product: ' Acer Aspire 3',
//     realize: 2024,
//     category: 'laptops',
//     price: 889,
//     description: 'Дисплей: 6,1 и 6,7 дюйма, LTPO Super Retina XDR OLED, 2556×1179 и 2796×1290, 1−120 Гц, не менее 2000 нит, HDR10, Dolby Vision, Always-On Display стекло Ceramic Shield, толщина рамок 1,55 мм. Чипсет: A17 Bionic. Оперативная память: 8 ГБ.',
//     date: '13.05.2023',
//     visible: false,
//     image: 'https://mini-io-api.texnomart.uz/catalog/product/3562/356298/192626/7ab97871-118e-4bcc-9d89-6b4a638c0c80.webp',
// },
// {
//     id: 'ad51211',
//     product: 'Xiaomi POCO C40',
//     realize: 2021,
//     category: 'phones',
//     price: 120,
//     description: 'мартфон Xiaomi POCO C40, адаптер питания 10 Вт, кабель USB Type-C, инструмент для извлечения SIM-карты, краткое руководство по началу работы, гарантийный талон',
//     visible: true,
//     image: 'https://mini-io-api.texnomart.uz/catalog/product/3553/355374/187837/7580b41a-568f-4a20-b82b-26d2611f652f.jpg',
// },
// {
//     id: 'dq2d23d3d',
//     product: ' Artel A32KH5000',
//     realize: 2023,
//     category: 'laptops',
//     price: 750,
//     description: 'Дисплей: 6,1 и 6,7 дюйма, LTPO Super Retina XDR OLED, 2556×1179 и 2796×1290, 1−120 Гц, не менее 2000 нит, HDR10, Dolby Vision, Always-On Display стекло Ceramic Shield, толщина рамок 1,55 мм. Чипсет: A17 Bionic. Оперативная память: 8 ГБ.',
//     date: '12.01.2024',
//     visible: false,
//     image: 'https://mini-io-api.texnomart.uz/catalog/product/3562/356214/192196/7e571e6f-a868-4dd8-99b6-e13108385b4f.webp',
// },
// {
//     id: 'adj82wdjk',
//     product: 'Asus TUF gaming',
//     realize: 2020,
//     category: 'appliances',
//     price: 750,
//     description: 'Дисплей: 6,1 и 6,7 дюйма, LTPO Super Retina XDR OLED, 2556×1179 и 2796×1290, 1−120 Гц, не менее 2000 нит, HDR10, Dolby Vision, Always-On Display стекло Ceramic Shield, толщина рамок 1,55 мм. Чипсет: A17 Bionic. Оперативная память: 8 ГБ.',
//     date: '12.01.2024',
//     visible: false,
//     image: 'https://mini-io-api.texnomart.uz/catalog/product/3562/356214/192196/7e571e6f-a868-4dd8-99b6-e13108385b4f.webp',
// }