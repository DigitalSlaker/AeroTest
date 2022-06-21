
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
    el: '#app',
    data(){ //входные данные с формы
        return{
            form: {
                peopleCount: '',
                timeTo: ''
            },
            contacts: [],
            goodpalaces: [],
            newcontacts: [],
        }
    },
    methods: {
        createContact(){ //создаем новую бронь
            let count = 0
            const{...newcontact} = this.form
            this.form.peopleCount = this.form.timeTo = ''
            console.log(this.newcontacts)
            for (let i = 0; i < this.newcontacts.length; i++){
                if (newcontact.timeTo == this.newcontacts[i].timeTo){
                    count = count + 1
                }
            }
            if (count == 0){
                this.newcontacts.push({...newcontact, id: Date.now()})
            }
            else{
                console.log('Данное время уже забронировано')
            }
            if (newcontact.peopleCount > 28 && newcontact.peopleCount <= 34){
                this.goodpalaces.push(this.contacts[0])
            }
            if (newcontact.peopleCount <= 9){
                this.goodpalaces.push(this.contacts[1])
            }
            if (newcontact.peopleCount > 9 && newcontact.peopleCount <= 28){
                this.goodpalaces.push(this.contacts[2])
            }
        }
    },
    async mounted(){ //получение данных
        this.contacts = await request('/api/contacts')
        console.log(this.contacts)
    }
})

async function request(url, method = 'GET', data = null){ //реквест на сервер для полученя данных с базы
    const headers = {}
    let body
    try{
        if(data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
       }
       const response = await fetch(url, {
           method,
           headers,
           body
       })
       return await response.json();

    }
    catch(e){
        console.log(e.messege)
    }
}