<template>
    <q-item class="shadow-highlight">
      <q-item-section class="full-width q-pa-md text-bold">
        Invitation: {{ title }}
      </q-item-section>
      <q-item-section side>
        <q-icon @click="accept" name="check" class="text-green cursor-pointer icon"/>
      </q-item-section>
      <q-item-section side>
        <q-icon @click="decline" name="close" class="text-red cursor-pointer icon"/>
      </q-item-section>
    </q-item>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { channelService } from 'src/services';
import { mapMutations } from 'vuex';
import { SerializedChannel } from 'src/contracts';

export default defineComponent({
    name: 'ChannelInvitation',
    props: {
        title: {
            type: String,
            default: 'Channel Name'
        },
        id: {
            type: String,
            required: true
        },
        isPrivate: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        ...mapMutations('auth', ['ADD_CHANNEL', 'REMOVE_CHANNEL', 'REMOVE_INVITE']),
        async accept() {
            const name = encodeURIComponent(this.title)
            const socket = channelService.in(name) || channelService.join(name)
            const res = await socket.handleInvite<SerializedChannel>(this.id, true)
            if ( res !== null ) {
                this.ADD_CHANNEL(res)
                this.REMOVE_INVITE(this.title)
                this.$store.dispatch('channels/join', name)
                this.$router.push({
                    path: '/channels',
                    query: { name: name },
                })
            }
        },
        async decline() {
            const name = encodeURIComponent(this.title)
            const socket = channelService.in(name) || channelService.join(name)
            const res = await socket.handleInvite(this.id, false)

            channelService.leave(name)
            this.REMOVE_CHANNEL(name)
            this.REMOVE_INVITE(this.title)
            this.ADD_CHANNEL(res)

        }
    }
})
</script>



<style lang="scss" scoped>
@import '../css//quasar.variables.scss';
.shadow-highlight {
    box-shadow: 0 0 5px .5px inset $primary;
}

.icon {
    border-radius: 5px;
    transition: background-color .2s;
    &:hover {
        background-color: rgba($secondary, .2);
    }
}
</style>
