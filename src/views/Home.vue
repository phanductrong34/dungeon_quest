<template>
  <div class="title" v-if="loadUser">
    <img class="name" src="@/assets/images/title.png" alt="">
    <div class="nav" v-if="user">
      <router-link class="nav-button" :to="{name : 'Menu'}">
        <h1 class="nav-content">Start</h1>
        <img class="nav-img" src="@/assets/images/button-2.png" alt="">
      </router-link>
      <router-link class="nav-button" :to="{name:'Admin'}">
        <h1 class="nav-content">Map Maker</h1>
        <img class="nav-img" src="@/assets/images/button-2.png" alt="">
      </router-link>
      <div class="nav-button" @click="handleLogout">
        <h1 class="nav-content">Log out</h1>
        <img class="nav-img" src="@/assets/images/button-2.png" alt="">
      </div>

    </div>
    <div class="nav" v-else>
      <form class="form" @submit.prevent="handleLogin">
        <h1 class="input_title">Email</h1>
        <div class="input_wrapper">
          <input class="input_box" type="email" v-model="email" required>
          <img class="input_img" src="@/assets/images/text_box-01.png" alt="">
        </div>
        <h1 class="input_title">Password</h1>
        <div class="input_wrapper">
          <input class="input_box" type="password" v-model="password" required>
          <img class="input_img" src="@/assets/images/text_box-01.png" alt="">
        </div>
        <div class="button_container">
          <a class="button_wrapper" @click="handleLogin">
            <h2 class="button_content">Login</h2>
            <img class="button_img" src="@/assets/images/button-1.png" alt="">
          </a>
          <a class="button_wrapper" @click="handleSignup">
            <h2 class="button_content">Signup</h2>
            <img class="button_img" src="@/assets/images/button-1.png" alt="">
          </a>
        </div>
      </form>

      
    </div>
  </div>
  <div class="banner" v-if="banner">
    <h1>{{banner}}</h1>
  </div>
  <div class="characters">
  </div>
</template>

<script>
import {ref, watch, watchEffect,onMounted} from 'vue'
import getUser from '@/composables/getUser'
import useSignup from '@/composables/useSignup'
import useLogin from '@/composables/useLogin'
import useLogout from '@/composables/useLogout'
import {useStore} from 'vuex'
import {useToast} from 'vue-toastification'

export default {
  setup () {
    const password = ref(null);
    const email = ref(null);
    const banner = ref(null)
    const toast = useToast();
    const store = useStore();

    //init
    const {user,isAdmin,loadUser} = getUser();
    const {error, signup} = useSignup()
    const {error : error2, login} = useLogin();
    const {error : error3, logout} = useLogout();

    const handleLogin = async ()=>{
      await login(email.value, password.value);
      if(!error2.value){
        toast.success(`Log in successful`);
      }
    }
    onMounted(()=>{
      toast.success(`Welcome Back ${user.value.displayName}`);
    });
    watchEffect(()=>{
      if(user.value !== null){
        console.log(user.value);
        store.dispatch('setCurrentUser',{user:user.value});
      }
    })

    const handleSignup = async()=>{
      console.log("signup");
       await signup(email.value,password.value);
      if(!error.value){
        console.log("signup successful");
        toast.success("welcome to the game :))");
      }
    }

    const handleLogout = async()=>{
      await logout();
      if(!error3.value){
        user.value = null;
        toast.success("Logout Successful");

      }
    }
    return {password, email ,handleLogin, handleSignup,user,loadUser,handleLogout}
  }
}
</script>

<style lang="scss" scoped>
.title{
  @include center-1;
  image-rendering: pixelated;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.name{
  // margin-bottom: 0.5rem;
}
.nav{
  @include flex-center;
  flex-direction: column;
  cursor: pointer;

  &-button{
    position: relative;
    display: inline-block;
    transform: translateY(0) scale(1);

    &:hover{
      transform: translateY(-0.2rem) scale(1.02);
    }
    &:active{
      transform: translateY(0.1rem) scale(1.01);
    }
  }
  &-content{
    @include center-1;
    z-index: 2;
    color: white;
    top: 45%;
  }
  &-img{
    transform: translateX(-0.2rem)
  }
}
.form{
  @include flex-center;
  flex-direction: column;
  color: white;
}
.input {
  &_title{

  }
  &_wrapper{
    position: relative;
  }
  &_box{
    width: 87%;
    height:41%;
    background-color:rgba(0, 0, 0, 0);
    border:none;
    @include center-1;
    z-index: 100;
    font-size: 1.5rem;
    outline: none;
  }
  &_img{
    transform: translateY(0.15rem)
  }
}
.button{
  &_container{
    @include flex-center;
    margin-top: 1rem;
  }
  &_wrapper{
    position: relative;
    @include button_fx;
  }
  &_content{
    @include center-1;
    top: 42%;
    left: 52%;
  } 
  &_img{

  }

}

</style>