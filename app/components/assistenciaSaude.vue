<template>
    <section class="min-h-screen text-white bg-gray-900">
        <header class="p-6 border-b border-gray-700">
            <h1 class="text-3xl font-bold">Assistência à Saúde</h1>
            <p>Hospitais e leitos disponíveis por município.</p>
        </header>

    <UTable :data="dados" :columns="columns" class="m-6" />
    </section>
</template>

<script setup lang="ts">
import type { HospitalLeitos } from '~/dto/hospitaisLeitos.vue';
import type { ColumnDef } from '@tanstack/vue-table';
import { apiUrl } from '~/environment/endpointApi.vue';
import { mapHospitals } from '~/mappers/hospitalMapper';

    const { data } = await useFetch<{ hospitais_leitos: HospitalLeitos[] }>(`${apiUrl}/assistencia-a-saude/hospitais-e-leitos`);
    const dados: HospitalLeitos[] = mapHospitals(data.value?.hospitais_leitos ?? []);
    console.log('Dados de hospitais e leitos:', dados);

    const columns: ColumnDef<HospitalLeitos>[] = [
        {
            header: 'Nome do Hospital',
            accessorKey: 'nome',
        },
        {
            header: 'Município',
            accessorKey: 'municipio',
        },
        {
            header: 'Total de Leitos',
            accessorKey: 'totalLeitos',
        }
    ]

</script>