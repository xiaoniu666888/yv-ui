import type { InjectionKey, Ref } from "vue";

export type NameType = string | number;
// 定义v-model和手风琴效果
export interface CollapseProps {
  modelValue: NameType[];
  accordion?: boolean;
}
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

export interface CollaspeEmits {
  (e: "update:modelValue", values: NameType[]): void;
  (e: "change", values: NameType[]): void;
}

export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol("collapseContextKey");
