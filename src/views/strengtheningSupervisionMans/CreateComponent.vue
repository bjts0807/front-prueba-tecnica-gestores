<template>
    <div class="pagetitle">
      <h1>Tutores</h1>
    </div><!-- End Page Title -->
    <section class="section">
        <div class="row">
          <div class="">
        <div class="col-lg-12">
          <!-- Card with an image on left -->
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-2">
                        <img src="../../assets/img/tutor.png" class="img-fluid gradient-main animated-scaleX" alt="images">
                    </div>
                    <div class="col-md-10">
                        <div class="card-body">
                            <h5 class="card-title">Registro de Tutores</h5>
                            <div class="row mt-2">
                                <div class="col-lg-3 col-md-16 col-sm-12">
                                    <div class="form-group">
                                        <label class="form-label small">Fecha Revisión</label>
                                        <input type="month" class="form-control">
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-16 col-sm-12 mb-3">
                                    <div class="form-group">
                                        <label class="form-label small">NAc</label>
                                        <select name="" id="" class="form-control" v-model="supervision_mans.nac" >
                                            <option :value="item" v-for="item in nacs" :key="item.id">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-16 col-sm-12">
                                    <div class="form-group">
                                        <label class="form-label small">Rol</label>
                                        <select name="" id="" class="form-control" v-model="supervision_mans.rol" >
                                            <option :value="item" v-for="item in roles" :key="item.id">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-16 col-sm-12">
                                    <div class="form-group">
                                        <label class="form-label small">Hora Inicio</label>
                                        <input type="time" class="form-control">
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-16 col-sm-12">
                                    <div class="form-group">
                                        <label class="form-label small">Hora Final</label>
                                        <input type="time" class="form-control">
                                    </div>
                                </div>
                                
                            </div>
                            <div class="mt-3  d-flex justify-content-end">
                                <button type="button" class="btn btn-primary btn-sm shadow-sm mb-3 "><i class="fa fa-save fa-fw"></i>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- End Card with an image on left -->
        </div>
      </div>
    </div>
    </section>
</template>
<script>
import nacsService from '@/services/nacsService';
import {isEmpty} from 'lodash';
    export default {
        data (){
            return {
                supervision_mans:{
                    nac:{},
                    rol:'',
                    revision_date:'',
                    user_full_name:'',
                    start_time:'',
                    final_time:''
                },
                nacs:[],
            }
        },
        methods:{
            async getNacs(){
                const response = await nacsService.index();
                this.nacs = response.data.map(x => {
                    return {
                    id : x.id,
                    name : x.name,
                    roles : x.roles.map(y => {
                        return {
                        ...y,
                        }
                    })
                }
            });
            }
        },
        created(){
            this.getNacs();
        },
        computed : {
            roles(){
                if(!isEmpty(this.supervision_mans.nac)){
                    return this.supervision_mans.nac.roles;
                }
                return [];
            }
        }
    }
</script>