<template>
    <div class="card">
        <div class="row">
            <div class="card-header border-bottom  col-xl-2"  >
                <div class="nav nav-pills nav-justified flex-column flex-xl-row nav-wizard "  id="cardTab" role="tablist">
                    <slot name="tabs"></slot>
                </div>
            </div>
            <div class="card-body col-xl-10">
                <div class="tab-content" id="cardTabContent">
                    <slot name="tab-content"></slot>
                    <hr class="my-4" />
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-light " @click="prev()" type="button">
                            Anterior
                        </button>
                        <button class="btn btn-primary" type="button" @click="next()" v-if="current < steps">
                            Siguiente
                        </button>
                        <slot name="finish" v-if="finish"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props : ['steps', 'current_step'],
        data () {
            return {
                current : this.current_step,
            }
        },
        methods : {
            next(){
                const prev_step = this.current;
                this.$emit('next', {'current' : this.current+1, 'prev' : prev_step});
            },
            prev(){
                const prev_step = this.current;
                this.$emit('prev', {'current' : this.current-1, 'prev' : prev_step});
            }
        },
        watch : {
            current_step : function(value){
                this.current = value;
            }
        },
        computed : {
            finish : function(){
                return parseInt(this.current) === parseInt(this.steps);
            }
        }
    }
</script>