<template>
     <div class="pagetitle">
      <h1>Gestores</h1>
    </div><!-- End Page Title -->
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">Listado de Gestores</h5>
            <div class="row mt-2">
                <data-grid :data="pagination"
                    @changePage="changePage($event)"
                    @perPageChange="perPageChange($event)"
                    @search="search($event)">
                    <template #grid>
                        <grid-table>
                        <template #head>
                            <grid-cell-header class="bg-light"  v-for="(h,i) in headers" :key="`h_${i}`">{{h}}</grid-cell-header>
                        </template>
                        <template #body>
                            <grid-row v-for="(item, i) in pagination.data" :key="`d_${i}`">
                                <grid-cell class="text-center small">
                                    {{item.revision_date}}
                                </grid-cell>
                                <grid-cell class="text-center small">
                                    {{item.nac.name}} 
                                </grid-cell>
                                <grid-cell class="text-center ">
                                    {{item.rol.name}}
                                </grid-cell>
                                <grid-cell class="text-center ">
                                    {{item.start_time}} -  {{item.final_time}}
                                </grid-cell>
                                <grid-cell  class="text-center ">
                                    <img class="img-fluid avatar-50 mx-2" alt="" :src="'data:image/png;base64,' + item.evidence_participation_image" width="64" >
                                </grid-cell >
                                <grid-cell  class="text-center ">
                                    <img class="img-fluid avatar-50 mx-2" alt="" :src="'data:image/png;base64,' + item.development_activity_image" width="64" >
                                </grid-cell>
                                <grid-cell class="text-center   ">
                                    <router-link  class="btn btn-outline-primary mx-2  btn-sm" title="Editar" :to="{name:'strengtheningSupervisionMans.edit',params:{'id':item.id}}">
                                        <i class="fa fa-edit "></i> Editar
                                    </router-link>
                                </grid-cell>
                            </grid-row>
                        </template>
                        </grid-table>
                    </template>
                    <template #action-button>
                        <router-link  class="btn btn-primary btn-sm shadow-sm mb-2" title="Editar" :to="{name:'strengtheningSupervisionMans.create'}">
                            <i class="fas fa-plus"></i> Nuevo
                        </router-link>
                    </template>
                </data-grid>
            </div>
        </div>
    </div>
</template>
<script>
import DataGrid from "../../components/utilities/DataGrid/DataGrid";
import GridTable from "../../components/utilities/DataGrid/GridTable";
import GridCellHeader from "../../components/utilities/DataGrid/GridCellHeader";
import GridRow from "../../components/utilities/DataGrid/GridRow";
import GridCell from "../../components/utilities/DataGrid/GridCell";
import strengtheningSupervisionService from '@/services/strengtheningSupervisionService';

import Swal from "sweetalert2";

export default {
  components:{
     GridCell, GridRow, GridCellHeader, GridTable, DataGrid
  },
  data(){
    return {
        headers : [
            'Fecha de revisión',
            'Nac',
            'Rol',
            'Inicio - Final',
            'Evidencia de participación',
            'Foto de Desarrollo',
            'Opciones'
        ],
        pagination : {
            data : [],
            current_page : 1,
            page : 1,
            per_page : 5,
            search : '',
            total: '',
        }
    }
  },
  methods:{
    async getSupervision(){
        try {
            this.LoaderSpinnerShow();
            const response = (await strengtheningSupervisionService.index(this.pagination.search, this.pagination))?.data;
            console.log(response.data);
            this.pagination.data = response.data;
            this.pagination.current_page  = response.current_page;
            this.pagination.total = response.total;
            this.LoaderSpinnerHide(); 
        }catch (e) {
            console.error(e);
            this.LoaderSpinnerHide(); 
            Swal.fire("Oops!", "ha ocurrido un error al procesar la solicitud", "error");
        }
    },
    changePage(page) {
      this.pagination.page = page;
      this.getSupervision();
    },
    perPageChange(per_page) {
      this.pagination.per_page = per_page;
      this.pagination.page = 1;
      this.getSupervision();
    },
    search(query){
      this.pagination.search = query;
      this.pagination.page = 1;
      this.getSupervision();
    },
  },
  async created(){
    await this.getSupervision();
  }
}
</script>