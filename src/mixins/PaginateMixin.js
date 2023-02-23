import Swal from 'sweetalert2/src/sweetalert2';

const paginateMixin = (Service, showLoader = true) => ({
    data() {
        return {
            pagination: {
                total: 0,
                data: [],
                page: 1,
                per_page: 5,
                current_page: 1,
                search: '',
            }
        }
    },
    watch: {
        'pagination.page': {
            handler: function() {
                this.index();
            },
            deep: true
        },
        'pagination.per_page': {
            handler: function() {
                this.pagination.page = 1;
                this.index();
            },
            deep: true
        }
    },
    methods: {
        async index() {
            try {

                showLoader && this.LoaderSpinnerShow();

                if (typeof Service === 'function') {

                    const response = (
                        this.pagination['params'] !== undefined ?
                        (await Service(this.pagination.search, this.pagination, ...Object.values(this.pagination.params))).data :
                        (await Service(this.pagination.search, this.pagination)).data
                    );

                    this.pagination.data = response.data;
                    this.pagination.total = response.total;
                    this.pagination.current_page = response.current_page;

                } else {
                    const response = (await Service.index(this.pagination.search, this.pagination)).data;
                    this.pagination.data = response.data;
                    this.pagination.total = response.total;
                    this.pagination.current_page = response.current_page;
                }

                showLoader && this.LoaderSpinnerHide();
            } catch (e) {
                console.error(e);
                showLoader && this.LoaderSpinnerHide();
                Swal.fire('Ha ocurrido un error al procesar la solicitud', 'si el problema persiste por favor contacte con soporte', 'error');
            }
        },
        search(query) {

            this.pagination.search = query;

            if (this.pagination.page === 1) {
                this.index();
                return;
            }

            this.pagination.page = 1;

        },
    }
});

export default paginateMixin;