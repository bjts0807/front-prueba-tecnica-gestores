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
                                
                                <div class="col-lg-3 col-md-16 col-sm-12">
                                    <div class="form-group">
                                        <label class="form-label small">Fecha Revisión</label>
                                       <VueDatePicker v-model="date"  :format="format" select-text="Ok" cancel-text="Cerrar" ></VueDatePicker>
                                       <div v-if="v$.date.$error" class="text-danger" style="font-size:14px" >
                                            <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-16 col-sm-12 mb-3">
                                    <div class="form-group">
                                        <label class="form-label small">NAc</label>
                                        <select name="" id="" class="form-control" v-model="nac" >
                                            <option :value="item" v-for="item in nacs" :key="item.id">{{item.name}}</option>
                                        </select>
                                        <div v-if="v$.nac.$error" class="text-danger" style="font-size:14px" >
                                            <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-16 col-sm-12">
                                    <div class="form-group">
                                        <label class="form-label small">Rol</label>
                                        <select name="" id="" class="form-control" v-model="rol" >
                                            <option :value="item" v-for="item in roles" :key="item.id">{{item.name}}</option>
                                        </select>
                                        <div v-if="v$.rol.$error" class="text-danger" style="font-size:14px" >
                                            <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-16 col-sm-12">
                                    <div class="form-group">
                                        <label class="form-label small">Hora Inicio</label>
                                        <input type="time" class="form-control" v-model="start_time">
                                        <div v-if="v$.start_time.$error" class="text-danger" style="font-size:14px" >
                                            <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-16 col-sm-12">
                                    <div class="form-group">
                                        <label class="form-label small">Hora Final</label>
                                        <input type="time" class="form-control" v-model="final_time">
                                        <div v-if="v$.final_time.$error" class="text-danger" style="font-size:14px" >
                                            <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="mb-3 col-lg-6 col-md-12 col-sm-12">
                                        <div class="row">
                                            <div class="form-group col-lg-8">
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
                                                    v-on:updatefiles="fileActivityImage"
                                                    />
                                                </div>
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <img class="img-fluid avatar-50 mt-4" alt="" :src="'data:image/png;base64,' + development_activity_image_file" width="64" >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mb-3 col-lg-6 col-md-12 col-sm-12">
                                        <div class="row">
                                            <div class="form-group col-lg-8">
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
                                                    v-on:updatefiles="fileParticipationImage"
                                                />
                                            </div>
                                            
                                            <div class="form-group col-lg-4">
                                                <img class="img-fluid avatar-50 mt-4" alt="" :src="'data:image/png;base64,' + evidence_participation_image_file" width="64" height="64" >
                                            </div>
                                            
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
    import Swal from 'sweetalert2';
    import nacsService from '@/services/nacsService';
    import strengtheningSupervisionService from '@/services/strengtheningSupervisionService';
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

    import { ref ,computed} from 'vue';
    import { useRouter,useRoute } from 'vue-router'
    
    import { useVuelidate } from '@vuelidate/core'
    import { required } from '@vuelidate/validators'
    import localeData from 'dayjs/plugin/localeData'
    import dayjs from 'dayjs'
    dayjs.extend(localeData);

    import('dayjs/locale/es').then(() => {
        dayjs.locale('es');
    });
    
    export default {
        components:{FilePond,VueDatePicker},
        setup(){  

            const router = useRouter()
            const route = useRoute()

            const date = ref(new Date());

            const format = (date) => dayjs(date).format("MMMM DD [de] YYYY"); 
            
            const nac=ref(null)
            const rol=ref(null)
            const revision_date=ref(null)
            const user_full_name=ref(null)
            const start_time=ref(null)
            const final_time=ref(null)
            const development_activity_image=ref(null)
            const evidence_participation_image=ref(null)
            const evidence_participation_image_file=ref(null)
            const development_activity_image_file=ref(null)
            //const id=ref(null)
            const id = route.params.id; 

            const nacs=ref(null)

            const getNacs= async () =>{
                const response = await nacsService.index();
                nacs.value =  response.data;
            };

            const show=async ()=>{
                const response = await strengtheningSupervisionService.show(id);
                date.value = dayjs(response.data.revision_date).toDate();
                nac.value =  response.data.nac;
                rol.value =  response.data.rol;
                start_time.value=response.data.start_time;
                final_time.value=response.data.final_time;
                evidence_participation_image_file.value=response.data.evidence_participation_image;
                development_activity_image_file.value=response.data.development_activity_image;
            };

            function fileActivityImage(files){
                development_activity_image.value = files;
            }

            function fileParticipationImage(files){
                evidence_participation_image.value = files;
            }

            const save = async () =>{

                try {
                    const result = await v$.value.$validate()

                    if (!result) {
                        Swal.fire('Error','Por favor verifique que no existan campos vacios','warning');
                        return
                    }

                    let datos={
                        id:route.params.id,
                        revision_date:dayjs(date.value).format('YYYY-MM-DD'),
                        nac:nac.value,
                        rol:rol.value,
                        start_time:start_time.value,
                        final_time:final_time.value,
                        development_activity_image:(!isEmpty(development_activity_image.value))?development_activity_image.value[0].getFileEncodeBase64String():"",
                        evidence_participation_image:(!isEmpty(evidence_participation_image.value))?evidence_participation_image.value[0].getFileEncodeBase64String():""
                    }

                    await strengtheningSupervisionService.update(datos);

                    Swal.fire('Exíto', 'Datos guardados con exíto', 'success');
                    
                    router.push(
                        { name:'strengtheningSupervisionMans.index'}
                    )
                    
                } catch (error) {
                    console.log(error);
                    Swal.fire('Uppss', 'ha ocurrido un error al procesar la solicitud', 'error');

                }

            }

            getNacs();
            show();

            const roles = computed(() => nac.value?nac.value.roles:[]);
            
            const rules = {
                start_time: { required },
                final_time: { required },
                date: { required },
                nac: { required },
                rol: { required },

            }

            const v$ = useVuelidate(
                rules,
                { 
                    start_time,
                    final_time,
                    date,
                    nac,
                    rol
                }
            )

            return {
                nac,
                rol,
                revision_date,
                user_full_name,
                start_time,
                final_time,
                evidence_participation_image,
                development_activity_image,
                development_activity_image_file,
                evidence_participation_image_file,
                nacs,
                date,
                format,
                roles,
                getNacs,
                save,
                fileActivityImage,
                fileParticipationImage,
                show,
                v$
            }
        },
    }
</script>