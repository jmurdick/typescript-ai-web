<template>
    <li class="node-tree">
        <span>{{ node.name }}</span>

        <ul v-if="node.children && node.children.length">
            <node v-for="child in node.children" :key="child" :node="child"></node>
        </ul>

        <!-- <div :class="{bold: isFolder}" @click="toggle" @dblclick="changeType">{{ model.name }}
            <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
        </div>
         -->
        <!-- <ul v-show="isOpen" v-if="isFolder">
            <node-tree :class="item" v-for="(item, index) in model.children" :key="index" :model="item"></node-tree>
            <li class="add" @click="addChild">+</li>
        </ul> -->
    </li>
</template>

<script lang="ts" src="./Node.ts"></script>
<style src="./Tree.css" />
