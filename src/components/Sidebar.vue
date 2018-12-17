<template>
    <div id="sidebar-nav" class="sidebar">
        <div class="sidebar-scroll">
            <nav>
                <ul class="nav">
                    <li>
                        <router-link to="/app/unload" class=""><i class="lnr lnr-home"></i>
                            <span>任务下载</span></router-link>
                    </li>
                    <li>
                        <router-link to="/app/check" class=""><i class="lnr lnr-chart-bars"></i> <span>项目进度</span></router-link>
                    </li>
                    <li>
                        <router-link to="/app/overview" class=""><i class="lnr lnr-dice"></i> <span>项目进度总览</span></router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Sidebar',
}
</script>
<style scoped>
</style>