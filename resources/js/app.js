import axios from 'axios'
import Noty from 'noty'
import { initAdmin } from './admin'
import moment from 'moment'

let addToCard = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCard(food){
    axios.post('/update-cart',food).then(res =>{
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false
        }).show();
    }).catch(err => {
        new Noty({
            type: 'err',
            timeout: 1000,
            text: 'something went wrong',
            progressBar: false
        }).show();
    })
}

addToCard.forEach((btn) => {
    btn.addEventListener('click',(e) =>{
        let food = JSON.parse(btn.dataset.food)
        updateCard(food)
    })
})

//! Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(()=> {
        alertMsg.remove()
    },2000)
}





//!Change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')


function updateStatus(order){
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
        let dataProp = status.dataset.status
        if(stepCompleted){
            status.classList.add('step-completed')
        }
        if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current')
            }
            
        }
    })
}

updateStatus(order);

//socket
let socket =io()
initAdmin(socket)

//join
if(order){
    socket.emit('join',`order_${order._id}`)
}
let adminAreaPath = window.location.pathname
console.log(adminAreaPath)
if(adminAreaPath.includes('admin')){
    socket.emit('join','adminRoom')
}

socket.on('orderUpdated', (data)=>{
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status  
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false
    }).show();
})