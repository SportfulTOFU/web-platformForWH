<template>
    <div id="App">
        <div id="wrapper">
            <Nav></Nav>
            <Sidebar></Sidebar>
            <transition name="fade">
                <router-view>
                </router-view>
            </transition>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Nav from './components/Nav.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'

export default {
    name: 'app',
    mounted() {
        // console.log(this.$store)
    },
    methods: {
    },
    components: {
        Nav,
        Sidebar,
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