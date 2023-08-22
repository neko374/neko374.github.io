<template>
  <div class="page">
    <Header></Header>
    <div class="down">
      <el-table
        :data="pdfList"
        size="small"
        stripe
        height="80%"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="name"
          show-overflow-tooltip
          label="文件"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <a @click="viewPDF(scope.row.name)">查看</a>
            <a @click="downloadPDF(scope.row.name)">下载</a>
          </template>
        </el-table-column>
      </el-table>
      <div ref="pdfContainer" class="pdf-container" v-if="showPDF">
        <div class="pdf-toolbar">
          <button @click="closePDF">关闭</button>
        </div>
        <div ref="pdfViewer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import pdfjs from "pdfjs-dist";
function getPdfPath(fileName) {
  return `/pdf/${fileName}`;
}
export default {
  setup() {
    const pdfList = ref([{ name: "老早有些梳头娘也会给人绞脸.pdf" }]);
    const pdfContainer = ref(null);
    const pdfViewer = ref(null);
    const showPDF = ref(false);
    const viewPDF = async (fileName) => {
      const pdfPath = getPdfPath(fileName);
      const loadingTask = pdfjs.getDocument(pdfPath);
      try {
        const pdf = await loadingTask.promise;
        renderPDF(pdf);
        showPDF.value = true; // 将显示PDF的操作移到加载完成后
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };
    const renderPDF = async (pdf) => {
      const viewer = pdfViewer.value;
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        try {
          const page = await pdf.getPage(pageNum);
          const canvas = document.createElement("canvas");
          const scale = 1.5;
          const viewport = page.getViewport({ scale });
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          await page.render(renderContext).promise;
          viewer.appendChild(canvas);
        } catch (error) {
          console.error("Error rendering PDF page:", error);
        }
      }
    };
    const closePDF = () => {
      showPDF.value = false;
      while (pdfViewer.value.firstChild) {
        pdfViewer.value.removeChild(pdfViewer.value.firstChild);
      }
    };
    const downloadPDF = (fileName) => {
      const pdfPath = getPdfPath(fileName);
      const link = document.createElement("a");
      link.href = pdfPath;
      link.download = fileName;
      link.target = "_blank";
      link.click();
    };
    return {
      pdfList,
      viewPDF,
      pdfContainer,
      pdfViewer,
      showPDF,
      closePDF,
      downloadPDF,
      pdfViewer,
    };
  },
};
</script>
  
<style scoped>
.page {
  width: 100%;
  height: 100%;
  background: white;
}

.down {
  width: 100%;
  height: 80%;
}
</style>