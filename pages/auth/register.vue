<script setup lang="ts">
    import { UserRole } from '~/types/enum/user-role.enum'

    async function register() {
        const { data, error } = await useFetch('/api/register', {
            method: 'POST',
            body: {
                firstName: 'Admin',
                lastName: 'Admin',
                email: 'admin3@example.com',
                phone: '+7 (000) 000-00-00',
                password: '123456',
                role: UserRole.Client
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