import type { InjectionKey, Ref } from "vue";

export type NameType = string | number;

export interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean;
}
// 定义context接口
export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}

export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol("collapseContextKey");
