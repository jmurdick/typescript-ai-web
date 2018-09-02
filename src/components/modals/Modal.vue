<template>
    <div class="es-popup -es-open -es-closeable">
        <div class="es-popup-content">
            <header v-show="withHeader" class="es-popup-header">
                <slot name="ModalHeader">
                    <button class="es-icon es-icon-close" data-dismiss="modal" @click="$emit('close')"></button>
                    <h2>{{title}}</h2>
                    <slot name="header"></slot>
                </slot>
            </header>

            <div v-show="withBody" class="es-popup-body">
                <slot name="ModalBody">
                    <div class="es-content-box modal-body">
                        <slot></slot>
                    </div>
                </slot>
            </div>
            
            <footer v-show="withFooter" class="es-popup-footer">
                <slot name="ModalFooter">
                    <div class="es-content-box">
                        <slot name="footer"></slot>
                    </div>
                </slot>
            </footer>
        </div>
    </div>
</template>

<script lang="ts" src="./Modal.ts"></script>
<style src="./Modal.css" />