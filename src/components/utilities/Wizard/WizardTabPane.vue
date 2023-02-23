<template>
   <div class="tab-pane py-2 py-xl-4 fade" :class="isActive" :id="`${id}`" role="tabpanel" :aria-labelledby="`${id}-tab`">
        <slot name="content"></slot>
    </div>
</template>
<script>
export default {
    props:['id','active'],
    computed:{
        isActive : function(){
            return this.active ? 'show active' : '';
            }
            }
            }
    
</script>