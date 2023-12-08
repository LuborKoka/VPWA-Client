<template>
    <q-dialog v-model="isVisible">
        <q-card>
            <q-card-section>
                <p>{{ text }}</p>
                <b>You sure?</b>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn label="No" color="negative" @click="setIsOpen(false)" class="button-focused"  />
                <q-btn label="Yes" color="positive" @click="handleConfirm" autofocus class="button-focused" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';

export default defineComponent({
    name: 'ConfirmationPopup',
    props: {
        popupVisible: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: 'Confirmation required'
        },
        setIsOpen: {
            type: Function as PropType<(isOpen: boolean) => void>,
            required: true
        },
        callback: {
            type: Function as PropType<() => Promise<void>>,
            default: undefined
        }
    },
    data() {
        return {
            isVisible: this.popupVisible
        }
    },
    watch: {
        popupVisible(val: boolean) {
            this.isVisible = val
        }
    },
    methods: {
        handleConfirm() {
            if ( this.callback !== undefined ) this.callback()
            this.setIsOpen(false)
        }
    }
})
</script>



<style lang="scss">
@import '../css/quasar.variables.scss';
.button-focused:focus {
    border: 2px solid $secondary;
}
</style>
