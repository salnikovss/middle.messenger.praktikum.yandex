export default function textareaAutogrow(element: HTMLTextAreaElement) {
  element.style.height = '5px';
  element.style.height = element.scrollHeight + 'px';
}