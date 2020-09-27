import { ref } from 'vue'
var pdfUtil = require('pdf-to-text');
export let textFile = ref(null)
export let uploaded = ref()

export function openFile() {
    return new Promise((resolve, reject) => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.txt, .md';
      fileInput.addEventListener('change', readSingleFile, false);
      fileInput.click();

      function readSingleFile(e) {
        const file = (e.target).files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
          let contents = e.target.result;
          textFile = contents;
          uploaded.value = true;
        };

        reader.onerror = () => {
          reject(new Error('Reader error'));
        };

        reader.readAsText(file)
        uploaded.value = true;
        
      }
    });
  }