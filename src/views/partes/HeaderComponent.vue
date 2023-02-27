<template>
<!-- ======= Header ======= -->
  <header id="header" class="header fixed-top d-flex align-items-center">

    <div class="d-flex align-items-center justify-content-between">
      <a href="index.html" class="logo d-flex align-items-center">
        <img src="assets/img/logo.png" alt="">
        <span class="d-none d-lg-block">Plantilla</span>
      </a>
      <i class="bi bi-list toggle-sidebar-btn" @click="toggle();"></i>
    </div><!-- End Logo -->

    

    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">

      

        <li class="nav-item dropdown pe-3">

          <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
            <img src="../../assets/img/profile-img.jpg" alt="Profile" class="rounded-circle">
            <span class="d-none d-md-block dropdown-toggle ps-2" v-if="this.$store.state.user">{{this.$store.state.user.name}}</span>
          </a><!-- End Profile Iamge Icon -->

          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li class="dropdown-header">
              <h6><span class="font-weight-bold" v-if="this.$store.state.user">{{this.$store.state.user.name}}</span></h6>
              
            </li>
           
            <li>
              <hr class="dropdown-divider">
            </li>

            
            <li>
              <hr class="dropdown-divider">
            </li>

            <li>
              <a class="dropdown-item d-flex align-items-center " @click="logout();">
                <i class="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </a>
            </li>

          </ul><!-- End Profile Dropdown Items -->
        </li><!-- End Profile Nav -->

      </ul>
    </nav><!-- End Icons Navigation -->

  </header><!-- End Header -->


</template>
<script>

import {  mapState } from "vuex";
import {useStore} from 'vuex';
import Swal from "sweetalert2";

export default {
  name: "HeaderComponent",
  setup (){
    const store = useStore();
    const logout = async () => {
      try{
        const result = await Swal.fire({
          title :  "¿Está seguro de finalizar la Sesión ?",
          text : "",
          showCancelButton : true,
          showConfirmButton : true,
          confirmButtonColor: "#1a73e8",
          confirmButtonText : 'Sí, finalizar',
          cancelButtonText : 'No',
          icon : "warning",
          showLoaderOnConfirm : true,
          preConfirm: async () => {
            try{
             await store.dispatch('logout')
            }catch (e) {
              console.error(e);
              Swal.showValidationMessage('ha ocurrido un error al procesar la solicitud');
            }
          },
        });
        if(result.isConfirmed){
          Swal.fire('Exíto', 'Sesión finalizada con exíto', 'success');
          
        }
      }catch (e) {
        console.error(e);
      }
    }
    return {
      logout
    }
  },
  methods:{
    toggle(){
      const select = (el, all = false) => {
        el = el.trim()
        if (all) {
          return [...document.querySelectorAll(el)]
        } else {
          return document.querySelector(el)
        }
      }
      select('body').classList.toggle('toggle-sidebar')
    }
  },

  computed: {
    ...mapState(["is_logged", 'user']),
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>