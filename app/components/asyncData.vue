<script setup lang="ts">
import { computed } from 'vue'
import { mapHospitals } from '~/mappers/hospitalMapper'

interface Props { url: string }
const props = defineProps<Props>()

// SSR-friendly fetch: useFetch sem await
const { data, pending, error } = useLazyFetch<{ hospitais_leitos: any[] }>(props.url)

const dados = computed(() => mapHospitals(data.value?.hospitais_leitos ?? []))
const isReady = computed(() => !pending.value && !error.value)
const dadosOrdenados = computed(() => [...dados.value].sort((a, b) => (a.uf || '').localeCompare(b.uf || '')))
</script>

<template>
  <slot :dados="dados" :dadosOrdenados="dadosOrdenados" :isReady="isReady" :pending="pending" :error="error" />
</template>
