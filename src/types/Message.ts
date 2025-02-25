// 定義 Flex Message 整體範本的介面
export interface FlexMessage {
    type: "bubble";
    hero: ImageComponent;
    body: BoxComponent;
    footer: BoxComponent;
}

// 定義 image 元件（hero 區塊）的介面
export interface ImageComponent {
    type: "image";
    url: string;
    size: "full" | string;
    aspectRatio: string;
    aspectMode: string;
    action: URIAction;
}

// 定義 URI 動作的介面（用於 image、button 等元件）
export interface URIAction {
    type: "uri";
    uri: string;
    label?: string;
}

// 定義 box 型元件的介面，其內容可以是其他元件類型的聯合型別
export interface BoxComponent {
    type: "box";
    layout: "vertical" | "baseline";
    contents: Component[];
    margin?: string;
    spacing?: string;
    flex?: number;
}

// 定義文字元件的介面
export interface TextComponent {
    type: "text";
    text: string;
    weight?: string;
    size?: string;
    color?: string;
    margin?: string;
    flex?: number;
    wrap?: boolean;
}

// 定義圖示元件的介面
export interface IconComponent {
    type: "icon";
    size: string;
    url: string;
}

// 定義按鈕元件的介面
export interface ButtonComponent {
    type: "button";
    style?: "primary" | "secondary" | "link";
    height?: string;
    action: URIAction;
}

// 定義一個聯合型別，包含 Flex Message 常用的元件類型
export type Component = TextComponent | IconComponent | BoxComponent | ButtonComponent;
