<script setup>

const props = defineProps({
    variant: {
        type: String,
        default: 'text'
    },
    color: {
        type: String,
        default: 'primary'
    },
    text: {
        type: String,
        default: 'Submit'
    }
})

</script>

<template>
    <v-btn
        :variant="variant"
        :color="color"
    >
        {{ text }}
    </v-btn>
</template>