<script setup lang="ts">

import {ref} from "vue";

const show = ref(false);
const message = ref<string>("");
const toastType = ref<"success" | "error">("success")
const showToast = (msg: string, type: "success" | "error") => {
  message.value = msg;
  toastType.value = type || 'success';
  show.value = true;

  // 自动隐藏 Toast
  setTimeout(() => {
    hideToast();
  }, 3000);
}
const hideToast = () => {
  show.value = false;
  message.value = '';
}
defineExpose({showToast})
</script>

<template>
  <transition name="toast-fade">
    <div v-if="show" class="toast-container" :class="toastType">
      <span class="toast-message">{{ message }}</span>
    </div>
  </transition>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 4px;
  z-index: 9999;
}

.success {
  background-color: #4caf50;
}

.error {
  background-color: #f44336;
}

.toast-message {
  display: block;
  font-size: 14px;
  line-height: 1.4;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.3s;
}

.toast-fade-enter,
.toast-fade-leave-to {
  opacity: 0;
}
</style>