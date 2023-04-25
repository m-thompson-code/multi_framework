<template>
  <section>
    <Suspense>
      <template #default>
        <AnimeDetailsContainer />
      </template>
      <template #fallback>
        <Loader />
      </template>
    </Suspense>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
