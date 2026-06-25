declare module "@toast-ui/editor" {
  interface EditorOptions {
    el: HTMLElement;
    initialEditType?: "markdown" | "wysiwyg";
    hideModeSwitch?: boolean;
    height?: string;
    initialValue?: string;
    placeholder?: string;
    hooks?: {
      addImageBlobHook?: (blob: Blob, callback: (url: string, text?: string) => void) => void;
    };
  }

  class Editor {
    constructor(options: EditorOptions);
    getHTML(): string;
    getMarkdown(): string;
    setHTML(html: string): void;
    destroy(): void;
  }

  export default Editor;
}
