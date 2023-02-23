<template>
    <div class="pagetitle">
      <h1>Gestores</h1>
    </div><!-- End Page Title -->
    <section class="section">
        <div class="row">
          <div class="">
        <div class="col-lg-12">
          <!-- Card with an image on left -->
            <div class="card mb-3">
                 <div class="card-body">
                            <h5 class="card-title">Registro de Gestores</h5>
                            <div class="row mt-2">
                                <VueDatePicker v-model="date" :format="format"></VueDatePicker>
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
                                <div class="row mt-2">
                                    <div class="mb-3 col-lg-6 col-md-12 col-sm-12">
                                        <div class="form-group">
                                            <label class="form-label">Foto del desarrollo</label>
                                            <file-pond
                                                name="test"
                                                ref="pond"
                                                max-files="1"
                                                class-name="my-pond"
                                                label-idle="Arrastre una imagen o examine su pc..."
                                                allow-multiple="false"
                                                accepted-file-types="image/jpeg, image/png, image/jpg"
                                                labelFileTypeNotAllowed="Tipo de archivo no es valido..."
                                                fileValidateTypeLabelExpectedTypes="Archivos permitidos png, jpg"
                                                v-on:updatefiles="handleFilePondUpdateFile"
                                            />
                                        </div>
                                    </div>
                                    <div class="mb-3 col-lg-6 col-md-12 col-sm-12">
                                        <div class="form-group">
                                            <label class="form-label">Evidencia de particpación</label>
                                            <file-pond
                                                name="test"
                                                ref="pond"
                                                max-files="1"
                                                class-name="my-pond"
                                                label-idle="Arrastre una imagen o examine su pc..."
                                                allow-multiple="false"
                                                accepted-file-types="image/jpeg, image/png, image/jpg"
                                                labelFileTypeNotAllowed="Tipo de archivo no es valido..."
                                                fileValidateTypeLabelExpectedTypes="Archivos permitidos png, jpg"
                                                v-on:updatefiles="handleFilePondUpdateFile"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3  d-flex justify-content-end">
                                <button type="button" class="btn btn-primary btn-sm shadow-sm mb-3 " @click="save();"><i class="fa fa-save fa-fw"></i>Guardar</button>
                            </div>
                        </div>
                    </div>
        </div>
      </div>
    </div>
    </section>
</template>
<script > 
 import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'

    import nacsService from '@/services/nacsService';
    import {isEmpty} from 'lodash';
    import vueFilePond from 'vue-filepond';
    // Import plugins
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js';
    // Import the plugin code
    import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
    // Import styles
    import 'filepond/dist/filepond.min.css';
    import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
    // Create FilePond component
    const FilePond = vueFilePond( FilePondPluginImagePreview,FilePondPluginFileEncode,FilePondPluginFileValidateType);

    import { ref } from 'vue';
    
    export default {
        components:{FilePond,VueDatePicker},
        setup: () => (
            {  
                date : ref(new Date()),
                 format(date) {
                 const day = date.getDate();
                 const month = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(date);
                 const year = date.getFullYear();

                    return `${month} ${day} de ${year}`;
                } 
            }),
        data (){
            return {
                supervision_mans:{
                    nac:{},
                    rol:'',
                    revision_date:'',
                    user_full_name:'',
                    start_time:'',
                    final_time:'',
                    imagen:''
                },
                nacs:[],
            }
        },
        methods:{
            handleFilePondUpdateFile(files){
                this.supervision_mans.imagen = files;
            },
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
            },
            save(){
                let fecha=this.date.toLocaleDateString();
                console.log(fecha);
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
            },
            
        }
    }
</script>