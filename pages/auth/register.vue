<script setup lang="ts">
    async function register() {
        const { data, error } = await useFetch('/api/register', {
            method: 'POST',
            body: {
                firstName: 'Admin',
                lastName: 'Admin',
                email: 'admin@example.com',
                phone: '+7 (000) 000-00-00',
                password: '123456',
            }
        });

        if (data.value) {
            console.log('Registered!', data.value.user);
        }
    }
</script>

<template>
    <UiButton type="button" @click="register()">
        Register
    </UiButton>
</template>