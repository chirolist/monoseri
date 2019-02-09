<template>
  <div class="MonoseriLogo">
    <img src="../static/monoseri_logo.png" />
  </div>
</template>

<style>
.MonoseriLogo {
  margin: 40px auto;
}

@keyframes turn {
  100% {
    transform: rotateX(0deg);
  }
}

@keyframes godown {
  100% {
    top: 180px;
  }
}

@keyframes goright {
  100% {
    left: 70px;
  }
}
</style>
