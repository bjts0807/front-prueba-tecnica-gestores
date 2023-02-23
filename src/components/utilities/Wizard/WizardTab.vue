<template>
  <a
    class="nav-item nav-link "
    style="padding:4px 4px 4px;"
    :class="isActive"
    :id="`${id}-tab`"
    :href="`#${id}`"
    data-toggle="tab"
    role="tab"
    :aria-controls="`${id}`"
    aria-selected="true"
    @click.prevent="$emit('tab-click')"
  >
    <div class="wizard-step-icon">{{ step }}</div>
    <div class="wizard-step-text">
      <div class="wizard-step-text-name">{{ title }}</div>
      <div class="wizard-step-text-details">{{ subtitle }}</div>
    </div>
  </a>
</template>
<script>
export default {
  props: ["title", "subtitle", "id", "active", "step"],
  computed: {
    isActive: function() {
      return this.active ? "active" : "";
    },
  },
};
</script>
