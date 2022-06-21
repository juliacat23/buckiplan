<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  methods: {
    getYear() {
      const today = new Date();
      return today.getFullYear();
    },
  },
});
</script>

<template>
  <div class="container-fluid footer p-0 page_404">
    <div class="row footer justify-content-center m-0">
      <div class="col-3 footer">
        <a href="https://github.com/juliacat23/buckiplan" class="footer" target="_blank">
          BuckiPlan @ {{ getYear() }}</a
        >
      </div>
      <div class="col-3">
        <p class="footer">
          Built with
        </p>
      </div>
      <div class="col-3 footer">
        <a class="footer" target="_blank" href="/policy">Privacy Policy</a>
      </div>
    </div>
  </div>
</template>