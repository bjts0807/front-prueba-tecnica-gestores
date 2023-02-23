<template>
    <nav>
        <ul class="pagination pagination-sm">
            <li class="page-item mr-2">
                <a class="page-link rounded" href="#" @click.prevent="prevPage()" aria-label="Previous" title="Anterior Pág">
                    <i class="fas fa-angle-double-left"></i>
                    <span class="sr-only">Previous</span>
                </a>
            </li>

            <li class="page-item mr-1" :class="{'active' : currentPage === 1}">
                <a class="page-link rounded"
                   href="#"
                   @click.prevent="changePage(1)"
                   aria-label="Next"
                   title="Pág. 1">
                    1
                </a>
            </li>

            <li class="page-item ml-1" v-if="prevPages.length">
                <a class="page-link rounded" href="#">
                    <i class="fas fa-ellipsis-h"></i>
                </a>
            </li>

            <li v-for="(page, index) in middlePages" class="page-item ml-1 mr-1" :class="{'active' : currentPage === page}" :key="index" :title="`Pág. ${page}`">
                <a class="page-link rounded" href="#" @click.prevent="changePage(page)">
                    {{page}}
                </a>
            </li>

            <li class="page-item mr-1" v-if="nextPages.length">
                <a class="page-link rounded" href="#">
                    <i class="fas fa-ellipsis-h"></i>
                </a>
            </li>

            <li class="page-item ml-1" :class="{'active' : currentPage === total_pages}" v-if="total_pages > 1">
                <a class="page-link rounded"
                   href="#"
                   @click.prevent="changePage(total_pages)"
                   aria-label="Next"
                   :title="`Pág. ${total_pages}`">
                    {{total_pages}}
                </a>
            </li>

            <li class="page-item ml-2">
                <a class="page-link rounded" href="#" @click.prevent="nextPage()" aria-label="Next" title="Siguente Pág">
                    <i class="fas fa-angle-double-right"></i>
                    <span class="sr-only">Next</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    props : ['perPage','total', 'currentPage'],
    methods :{
        prevPage(){
            const page = this.currentPage - 1 > 0 ? this.currentPage - 1 : this.currentPage;
            this.$emit('prev-page', page);
        },
        nextPage(){
            const page = Number(this.currentPage) + 1 <= this.total_pages ? Number(this.currentPage) + 1 : this.currentPage;
            this.$emit('next-page', page);
        },
        changePage(page){
            this.$emit('change-page', page);
        },
    },
    computed : {
        total_pages() {
            return !this.total !== undefined && this.total > 0 && Number.isInteger(this.total)
                ? Math.ceil(this.total / this.perPage)
                : 0;
        },
        pages() {

            if(this.total_pages <= 0 || Number.isNaN(this.total_pages))  return [];

            if(this.total_pages > 1) {
                return Array(this.total_pages)
                    .fill(1)
                    .map((value, index) => Number(value) + index);
            }

            return [];

        },
        middlePages() {

            if(this.total_pages <= 0 || Number.isNaN(this.total_pages))  return [];

            return this.pages.filter(value => {
                return (value >= this.currentPage - 3)
                    && value <= (Number(this.currentPage) + 3)
                    && value < this.total_pages
                    && value > 1;
            });

        },
        nextPages(){
            if(this.total_pages <= 0 || Number.isNaN(this.total_pages))  return [];
            return  this.pages.filter(value => value > (Number(this.currentPage) + 3) && value < this.total_pages);
        },
        prevPages(){
            if(this.total_pages <= 0 || Number.isNaN(this.total_pages))  return [];
            return this.pages.filter(value => (value < this.currentPage - 3) && value > 1);
        }
    }
}
</script>
