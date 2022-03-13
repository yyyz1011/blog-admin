import { DefineComponent } from "vue";

export interface RoutesItem {
  path: string;
  name: string;
  component: any;
}

export interface SideRoutesItem {
  path: string;
  name: string;
  icon: DefineComponent<
    {},
    {},
    {},
    {},
    {},
    import("vue").ComponentOptionsMixin,
    import("vue").ComponentOptionsMixin,
    import("vue").EmitsOptions,
    string,
    import("vue").VNodeProps &
      import("vue").AllowedComponentProps &
      import("vue").ComponentCustomProps,
    Readonly<import("vue").ExtractPropTypes<{}>>,
    {}
  >;
}
