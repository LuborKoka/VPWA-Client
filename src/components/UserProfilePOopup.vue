<template>
    <div v-if="showPopup" class="user-profile-popup">
      <!-- Popup content -->
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showPopup: Boolean,
    },
  };
  </script>
  
  <style scoped>
  .user-profile-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* Add more styles as needed */
  }
  </style>
  