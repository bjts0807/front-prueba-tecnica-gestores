<template>
   <!-- ======= Sidebar ======= -->
  <aside id="sidebar" class="sidebar">

    <ul class="sidebar-nav" id="sidebar-nav">

      <li class="nav-item">
        <router-link class="nav-link " :to="{name:'Dashboard'}">
          <i class="bi bi-grid"></i>
          <span>Dashboard</span>
        </router-link>
      </li><!-- End Dashboard Nav -->

      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#components-tutor" data-bs-toggle="collapse" href="#">
          <i class="bi bi-person-lines-fill"></i><span>Gestores</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="components-tutor" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <router-link :to="{name:'strengtheningSupervisionMans.create'}">
              <i class="bi bi-circle"></i><span>Registro</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{name:'strengtheningSupervisionMans.index'}">
              <i class="bi bi-circle"></i><span>Listado</span>
            </router-link>
          </li>
          
        </ul>
      </li><!-- End Components Nav -->

    </ul>

  </aside><!-- End Sidebar-->

</template>