<template>
<div class="wrapper">
      <section class="login-content">
         <div class="row m-0 align-items-center bg-white vh-100">            
            <div class="col-md-6">
               <div class="row justify-content-center">
                  <div class="col-md-10">
                     <div class="card card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                        <div class="card-body">
                          
                           <div class="text-center">
                            <img src="../assets/img/login.gif" alt="" width="150" >
                           </div>
                           
                           <p class="text-center">Ingresa tus credenciales</p>
                            <form @submit.prevent="login()">
                 
             
              <div class="form-group" v-if="has_error">
                  <div class="alert alert-danger alert-dismissible fade show w-100 d-block" role="alert">
                   
                    <div ><i class="fas fa-exclamation-triangle fa-fw"></i> {{message}}</div>
                  </div>
                </div>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" v-model="form.email" id="floatingInput" placeholder="Email address / Username" />
                <label for="floatingInput">Email</label>
                <div v-if="v$.form.email.$error" class="text-danger" style="font-size:14px" >
                  <i class="fa fa-warning fa-fw"></i> Por favor ingrese su email.
                </div>
              </div>
               
              <div class="form-floating mb-3">
                <input type="password" class="form-control" v-model="form.password" id="floatingInput" placeholder="Password" />
                <label for="floatingInput">Contraseña</label>
                <div v-if="v$.form.password.$error" class="text-danger" style="font-size:14px" >
                  <i class="fa fa-warning fa-fw"></i> Por favor ingrese su contraseña.
                </div>
              </div>
              
              <!-- <div class="d-flex mt-1 justify-content-between">
                <div class="form-check">
                  <input class="form-check-input input-primary" type="checkbox" id="customCheckc1" checked="" />
                  <label class="form-check-label text-muted" for="customCheckc1">Remember me</label>
                </div>
                <h5 class="text-secondary">Forgot Password?</h5>
              </div> -->
              <div class="d-grid mt-4">
                <button type="submit" class="btn btn-primary" >Acceder</button>
              </div>
              </form>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="sign-bg">
               
               </div>
            </div>
            <div class="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
               <img src="../assets/img/img-login.png" class="img-fluid gradient-main animated-scaleX" alt="images">
            </div>
         </div>
      </section>
      </div>
 
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required ,email} from '@vuelidate/validators';
import {useRouter} from "vue-router";

export default {
  name: "LoginComponent",
  setup: () => ({ v$: useVuelidate() }),
  data (){
    return {
      form: {
        email: "bjts95@gmail.com",
        password: "12345",
      },
      has_error : false,
      message : "",
    }
  },

  validations(){
    return {
      form: {
          email: { required, email },
          password: { required },
      }
    }
  },
  methods: {
    async login() {
      const router = useRouter();
      try{
        if (!await this.v$.form.$validate()) return;

        this.LoaderSpinnerShow();

        await this.$store.dispatch("login", this.form);

        await router.push({ name : 'Dashboard' });

        this.LoaderSpinnerHide();
      }catch(error){
        this.LoaderSpinnerHide();
        switch(error.status){
          case 422:
            this.has_error = true;
            this.message = "Usuario o contraseña incorrectos";
          break;
          case 401:
            this.has_error = true;
            this.message = "Usuario o contraseña incorrectos";
          break;
          default :
            this.has_error = true;
            this.message = "Ha ocurrido un error, por favor intente nuevamente";
          break;
        }
      }
    }
  },
};
</script>