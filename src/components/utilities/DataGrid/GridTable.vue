<template>
    <table class="table table-sm table-hover table-bordered">
        <thead>
            <slot name="head"></slot>
        </thead>
        <tbody>
            <slot name="body"></slot>
        </tbody>
    </table>
</template>

<script>
export default {
name: "GridTable"
}
</script>

<style scoped>

</style>
