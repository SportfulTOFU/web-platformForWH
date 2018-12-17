<template>
    <div id="App">
        <div id="wrapper">
            <!-- NAVBAR -->
            <Nav></Nav>
            <!-- END NAVBAR -->
            <!-- LEFT SIDEBAR -->
            <Sidebar2></Sidebar2>
            <!-- END LEFT SIDEBAR -->
            <!-- MAIN -->
            <transition name="fade">
                <router-view>
                </router-view>
            </transition>
            <!-- END MAIN -->
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Nav from './components/Nav.vue'
import Sidebar2 from './components/Sidebar2.vue'
import Footer from './components/Footer.vue'

export default {

    name: 'Leaderapp',
    mounted() {
        // console.log(this.$store)
    },
    methods: {

    },
    components: {
        Nav,
        Sidebar2,
        Footer,
    }
}
</script>
<style>
.fade-enter-active,
.fade-leave-actve {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>