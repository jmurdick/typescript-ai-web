<template>
    <div class="row">
        <div class="column"> 
            <h2>Entities</h2>
            <ul>
                <li v-for="(node, index) of nodes" :key="index">
                    <a @click="showEntity(node)">{{node.name}}</a>
                </li>
            </ul>
        </div>
        
        <div class="column">
            <h2>Message Log</h2>
            <table width="100%" id="messageTable">
                <thead>
                    <th>Class</th>
                    <th>Value</th>
                </thead>

                <tbody v-if="hasMessages">
                    <tr v-for="message of messages" :key="message">
                        <td><span>{{message.class}}</span></td>
                        <td><span>{{message.value}}</span></td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="2">
                            <span>No Data</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" src="./LandingPage.ts"></script>
<style src="./LandingPage.css" />
