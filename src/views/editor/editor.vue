<template>
  <div>
    <Header></Header>
    <div style="padding: 10px 0 10px 0">
      <span style="font-size: 20px; margin-left: 2vw; vertical-align: middle"
        >在线代码编辑器</span
      >
      <el-select
        style="
          display: inline-block;
          vertical-align: middle;
          float: right;
          margin-right: 1vw;
        "
        v-model="language"
        placeholder="选择语言"
        @change="handleLanguage"
      >
        <el-option
          v-for="(languageItem, key) in languageOptions"
          :key="key"
          :label="languageItem"
          :value="languageItem"
        >
        </el-option>
      </el-select>
      <span style="font-size: 20px; float: right; vertical-align: middle"
        >选择语言：</span
      >
    </div>
    <div id="monaco"></div>
  </div>
</template>
  
<script>
import { ref, toRaw } from "vue";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import {
  pythonCompletion,
  sqlCompletion,
  cppCompletion,
  javaCompletion,
  csharpCompletion,
} from "./language.js";
import Header from "../../components/header/header.vue";
export default {
  name: "editor",
  data() {
    return {};
  },
  setup() {
    // 编辑器
    const editor = ref(null);
    const editorTheme = ref("vs-light");
    const language = ref("java");
    const languageOptions = ref([
      "bat",
      "cpp",
      "csharp",
      "css",
      "dockerfile",
      "go",
      "graphql",
      "html",
      "ini",
      "java",
      "javascript",
      "json",
      "julia",
      "kotlin",
      "less",
      "markdown",
      "mysql",
      "objective-c",
      "pascal",
      "pascaligo",
      "perl",
      "php",
      "powershell",
      "python",
      "r",
      "redis",
      "rust",
      "scala",
      "scheme",
      "scss",
      "shell",
      "sophia",
      "sql",
      "swift",
      "tcl",
      "typescript",
      "xml",
      "yaml",
    ]);
    self.MonacoEnvironment = {
      getWorker(_, label) {
        if (label === "json") {
          return new jsonWorker();
        }
        if (label === "css" || label === "scss" || label === "less") {
          return new cssWorker();
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
          return new htmlWorker();
        }
        if (label === "typescript" || label === "javascript") {
          return new tsWorker();
        }
        return new editorWorker();
      },
    };
    const initEditor = () => {
      editor.value = monaco.editor.create(document.getElementById("monaco"), {
        value: "",
        language: language.value,
        theme: editorTheme.value,
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        automaticLayout: true,
        glyphMargin: true,
        useTabStops: false,
        fontSize: 15,
        autoIndent: true,
        quickSuggestionsDelay: 100, //代码提示延时
      });
      // 监听值的变化
      // editor.value.onDidChangeModelContent((val) => {
      //   console.log(val.changes[0].text)
      // })
      // 创建代码提醒
      pythonCompletion;
      sqlCompletion;
      cppCompletion;
      csharpCompletion;
      javaCompletion;
    };
    const handleLanguage = (item) => {
      language.value = item;
      monaco.editor.setModelLanguage(
        toRaw(editor.value).getModel(),
        language.value
      );
    };
    return {
      editor,
      language,
      handleLanguage,
      initEditor,
      languageOptions,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initEditor();
    });
  },
  components: { Header },
};
</script>
  
<style lang="scss" scoped>
#monaco {
  width: 100%;
  height: 84vh;
}
</style>