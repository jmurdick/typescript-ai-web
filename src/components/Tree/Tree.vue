<template>
    <div class="tree-menu">
        <div class="label-wrapper" @click="toggleChildren">
            <div :style="indent" :class="labelClasses">
                <i v-if="nodes" class="fa" :class="iconClasses"></i>{{ label }}
            </div>
        </div>
        <tree v-if="showChildren" v-for="(node, index) of nodes" :nodes="node.children" :key="index" 
            :label="node.name" :depth="depth + 1"></tree>
    </div>
</template>

<script lang="ts" src="./Tree.ts"></script>
<style src="./Tree.css" />
