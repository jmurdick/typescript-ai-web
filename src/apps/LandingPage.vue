<template>
    <div class="row">
        <div class="column">
            <tree :trunk="treeData"></tree>
        </div>
        
        <div class="column">
            <table width="100%">
                <thead>
                    <th>Class</th>
                    <th>Value</th>
                </thead>

                <tbody v-if="hasMessages">
                    <tr v-for="message in messages" :key="message">
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
