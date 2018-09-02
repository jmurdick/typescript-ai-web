import Vue from "vue";
import { Mixin } from "vue-mixin-decorator";

import NotifyModal from "@src/components/modals/NotifyModal.vue";

@Mixin
export default class ModalMixin extends Vue {

    public Notify(title: string, message: string): void {
        // HACK: the VModal interface definition is missing the final optional 
        // argument supported by show(). the cast to <any> allows access without error
        (this.$modal as any).show(NotifyModal,
            {
                title,
                text: message,
            },
            {
                draggable: ".es-popup-header",
                clickToClose: false,
                height: "auto",
            },
        );
    }
}
