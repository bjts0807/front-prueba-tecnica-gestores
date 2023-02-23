<template>
    <main>
        <div class="row">
            <div class="col-12 d-flex justify-content-between">
                <div class="d-flex justify-content-between">
                   
                        <input v-model="pagination.search" type="text" class="form-control form-control-sm mb-2" placeholder="Buscar...">
                            
                
                    
                    <button class="btn btn-sm btn-primary shadow-sm ml-2 mb-2" title="Buscar" @click="search()">
                        <i class="fa fa-search text-white-50"></i>
                    </button>
                </div>
                <slot name="action-button"></slot>
            </div>
        </div>
        <div class="row">
            <div class="col-12 table-responsive">
                <slot name="grid"></slot>
            </div>
        </div>
        <div class="row">
            <div class="col-12 d-flex justify-content-between">
                <pagination-links
                @changePage="changePage($event)"
                @prevPage="changePage($event)"
                @nextPage="changePage($event)"
                :per-page="pagination.per_page"
                :total="pagination.total"
                :current-page="pagination.current_page">
                </pagination-links>
                <div class="d-flex justify-content-between">
                    <label class="mb-2 mx-1 d-block" for="resultPerPage">Mostrar</label>
                    <select name="resultPerPage" id="resultPerPage"
                            v-model="pagination.per_page"
                            @change="perPageChange()"
                            class="form-control-sm  mb-2 mr-2 form-control-solid w-25">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                    </select>
                    <label class="mb-2 mx-1 d-block" for="resultPerPage">Por Página</label>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import PaginationLinks from "../PaginationLinks.vue";

export default {
    props : ['headers', 'data'],
    components: {PaginationLinks},
    data()  {
        return {
            pagination : {
                data : [],
                per_page : 5,
                search : '',
                total : '',
                current_page : 1,
                page : 1,
            }
        }
    },
    watch : {
      data : {
          handler : function(value){
              this.pagination = value;
          },
          deep : true
      }
    },
    methods : {
        changePage(page){
            this.pagination.page = page;
            this.$emit('change-page', page);
        },
        perPageChange(){
            this.$emit('per-page-change', this.pagination.per_page);
        },
        search () {
            this.$emit('search', this.pagination.search);
        },
        get(){
            this.$emit('get');
        }
    }
}
</script>

<style scoped>

</style>
