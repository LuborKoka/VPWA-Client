<template>
  <q-page class="full-height column chat-grid">
    <q-scroll-area class="column q-px-md">
      <div class="column q-px-md">
        <q-chat-message
          v-for="message in currentMessages"
          :key="message.id"
          :name="message.senderName"
          :text="[message.content]"
          text-color="white"
          :bg-color="isIncoming(message.senderName) ? 'secondary' : 'primary'"
          :sent="isIncoming(message.senderName)"
          :stamp="new Date(message.createdAt).toLocaleString()"
        >
        </q-chat-message>
        <unsent-message
          v-for="message in unsentMessages"
          :sender="message.sender"
          :content="message.content"
          :key="message.sender"
        ></unsent-message>
      </div>
    </q-scroll-area>
    <command-line></command-line>
  </q-page>
</template>

<script lang="ts">
import CommandLine from 'src/components/CommandLine.vue';
import UnsentMessage from 'src/components/UnsentMessage.vue';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { channelService } from 'src/services';


export default defineComponent({
    components: {
        CommandLine,
        UnsentMessage
    },
    data() {
        return {
            newMessage: '',
            dialogVisible: false,
        };
    },
    computed: {
        ...mapGetters('channels', ['currentMessages', 'unsentMessages']),
        ...mapGetters('auth', ['username']),
        activeChannel () {
            return this.$store.state.channels.active
        }
    },
    methods: {
        isIncoming(senderName: string) {
            return senderName === this.username
        },
        setActiveChannel(newRoute: string) {
            if ( !channelService.in(newRoute) )
                this.$store.dispatch('channels/join', newRoute)
            this.$store.commit('channels/SET_ACTIVE', newRoute)
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.setActiveChannel(to.query.name as string)
        next()
    },
    beforeMount() {
        const channel = this.$route.query.name?.toString()
        if ( !channel )
            this.$router.push({
                path: '/channels',
                query: { name: 'General' },
            })
        this.setActiveChannel( channel || 'General')
    }
})
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
  flex-basis: 0;
}
.chat-grid {
  display: grid;
  grid-template-rows: 1fr auto;
  z-index: 10;
}
</style>
