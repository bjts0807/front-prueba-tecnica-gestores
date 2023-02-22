<template>
  <div>
    <HeaderComponent/>

    <SidebarComponent/>

    <main id="main" class="main">
      <router-view />
    </main>

    <FooterComponent />

    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
  </div>
</template>

<script>

  import SidebarComponent from '../views/partes/SidebarComponent';
  import HeaderComponent from '../views/partes/HeaderComponent';
  import FooterComponent from '../views/partes/FooterComponent';

  export default {
    name: 'AppLayout',
    components: {
      SidebarComponent,FooterComponent,HeaderComponent
    },
  }
</script>

