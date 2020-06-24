<template>
    <div class="container signup">
        <form @submit.prevent="signup" class="card-panel">
            <h2 class="center deep-purple-text">Signup</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="email">
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password">
            </div>
            <div class="field">
                <label for="alias">Alias:</label>
                <input type="text" name="alias" v-model="alias">
            </div>
            <p class="red-text center" v-if="feedback">{{feedback}}</p>
            <div class="field center">
                <button class="btn deep-purple">Signup</button>
            </div>
        </form>
    </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: "Signup",
    data(){
        return {
            email:null,
            password:null,
            alias:null,
            feedback:null,
            slug:null

        }
    },
    methods: {
    signup(){
        if(this.alias){
            this.slug= slugify(this.alias,{
                replacement: '-',
                remove: /[$*_+~.()'"!\-:@]/g,
                lower:true
            })
            let ref = db.collection('users').doc(this.slug)
            ref.get().then(doc => {
                if(doc.exists){
                    this.feedback = "This Alias already EXISTS"
                }else{
                    firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
                .then(cred => {
                    ref.set({
                        alias: this.alias,
                        geolocation: null,
                        userId: cred.user.uid
                    })
                }).then(() => {
                    this.$router.push({name: 'GMap'})
                })
                .catch(err => {
                    console.log(err)
                    this.feedback = err.message
                })
                    this.feedback = "This Alias can be used nice choice!"
                }
            });
            console.log(this.slug)


        }else{
            
            this.feedback="Please enter all fields"
        }

    }
}}
</script>
<style>
.signup{
  max-width: 400px;
  margin-top: 60px;
}
.signup h2{
  font-size: 2.4em;
}
.signup .field{
  margin-bottom: 16px;
}
</style>

