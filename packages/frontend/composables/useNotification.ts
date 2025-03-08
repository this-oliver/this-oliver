import type { DefineComponent } from "vue";
import { defineComponent, h, shallowRef } from "vue";
import { toast } from "vue-sonner";
import BaseCardVue from "~/components/base/BaseCard.vue";

export function useNotification() {
  type NotificationType = "general" | "warning" | "error" | "success";

  interface Notification {
    type: NotificationType
    title: string
    message: string
    component: DefineComponent
  }

  function _trigger(notification: Notification) {
    toast(shallowRef(notification.component));
  }

  function _mapTypeToColor(type: NotificationType): string {
    switch (type) {
      case "general":
        return "info";
      case "warning":
        return "warning";
      case "error":
        return "error";
      case "success":
        return "success";
      default:
        return "primary";
    }
  }

  function _renderNotifictaion(
    title: string,
    message: string,
    type: NotificationType
  ): Notification {
    const component: DefineComponent = defineComponent({
      setup() {
        // return BaseCard with a child div containing v-html
        return () =>
          h(
            BaseCardVue,
            {
              style: "width: 350px;",
              flat: true,
              color: _mapTypeToColor(type)
            },
            {
              default: () =>
                h("div", { innerHTML: `<b>${title}</b> <p>${message}</p>` })
            }
          );
      }
    });

    return {
      type,
      title,
      message,
      component
    };
  }

  function notify(
    title: string,
    message: string,
    type: NotificationType = "general"
  ) {
    const notification: Notification = _renderNotifictaion(
      title,
      message,
      type
    );
    _trigger(notification);
  }

  return { notify };
}
