  import jsPDF from 'jspdf';
  import html2canvas from 'html2canvas';
  import { Message  } from 'element-ui';
  const A4_WIDTH = 595.28;
  const A4_HEIGHT = 841.89;

  // 每一页的分页坐标， PDF高度， 初始值为根元素距离顶部的距离
  const pages = [0];

  // 将元素转化为canvas元素
  // 通过 放大 提高清晰度
  // width为内容宽度
  async function toCanvas(element, width) {
    const options = {
      allowTaint: true, // 允许渲染跨域图片
      scale: 2, // window.devicePixelRatio * 2,  // 增加清晰度
      useCORS: true,// 允许跨域
      backgroundColor: '#fff',
      width: element.offsetWidth, // 加入width和高可以让比列一致
      height: element.offsetHeight,
      onrendered: function (canvas) {
        document.body.appendChild(canvas);
      }
    }
    const canvas = await html2canvas(element, options);
    // 获取canavs转化后的宽度
    const canvasWidth = canvas.width;
    // 获取canvas转化后的高度
    const canvasHeight = canvas.height;
    // const { offsetWidth, offsetHeight } = element
    // console.log('originalData', offsetWidth, offsetHeight, canvasWidth, canvasHeight)
    // 高度转化为PDF的高度
    const height = (width / canvasWidth) * canvasHeight;

    if (element.classList.contains('second-page')) {
      const { offsetHeight, offsetWidth } = element
      console.log('canvas', offsetHeight, offsetWidth, canvasWidth, canvasHeight)
      console.log('pdf-rate', width / canvasWidth)
      console.log('pdf', width, height)
    }

    // 转化成图片Data
    const canvasData = canvas.toDataURL('image/jpeg', 1.0);

    return { width, height, data: canvasData };
  }

  // 添加第一页
  async function addFirstPage(firstPage, pdf) {
    const { height: firstPageHeight, data: firstPageData } = await toCanvas(firstPage, A4_WIDTH);
    pdf.addImage(firstPageData, 'JPEG', 0, 0, A4_WIDTH, firstPageHeight);
    pdf.addPage()
  }

  // 添加页脚
  async function addHeader(header, pdf, contentWidth) {
    const { height: headerHeight, data: headerData } = await toCanvas(header, contentWidth);
    console.log('header', headerHeight)
    pdf.addImage(headerData, 'JPEG', 0, 0, contentWidth, headerHeight);
  }

  // 添加页眉
  async function addFooter(footer, pdf, contentWidth) {
    // const newFooter = footer.cloneNode(true);
    // document.documentElement.append(newFooter);
    const { height: footerHeight, data: footerData } = await toCanvas(footer, contentWidth);
    console.log('footer', footerHeight)
    pdf.addImage(footerData, 'JPEG', 0, A4_HEIGHT - footerHeight, contentWidth, footerHeight)
  }

  // 添加
  function addImage(_x, _y, pdf, data, width, height) {
    pdf.addImage(data, 'JPEG', _x, _y, width, height);
  }

  // 增加空白遮挡
  function addBlank(x, y, width, height, pdf) {
    pdf.setFillColor(255, 255, 255);
    pdf.rect(x, y, Math.ceil(width), Math.ceil(height), 'F');
  };

  // 获取元素距离网页顶部的距离
  // 通过遍历offsetParant获取距离顶端元素的高度值
  function getElementTop(element, outerestClassName) {
    let actualTop = element.offsetTop;
    let current = element.offsetParent;
    // while (current && current !== null) {
    while (current && !current.classList.contains(outerestClassName)) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  }

  // 遍历正常的元素节点
  function traversingNodes({ nodes, rate, outerestClassName, originalPageHeight, contentWidth, elementWidth }) {
    for (let i = 0; i < nodes.length; ++i) {
      const one = nodes[i];
      // 需要判断跨页且内部存在跨页的元素
      const isDivideInside = one.classList && one.classList.contains('divide-inside');
      // 图片元素不需要继续深入，作为深度终点
      const isIMG = one.tagName === 'IMG';
      // table的每一行元素也是深度终点
      const isTableCol = one.classList && ((one.classList.contains('el-table__row')));
      // 特殊的富文本元素
      const isEditor = one.classList && (one.classList.contains('editor'));
      // 对需要处理分页的元素，计算是否跨界，若跨界，则直接将顶部位置作为分页位置，进行分页，且子元素不需要再进行判断
      let { offsetHeight } = one;
      // 计算出最终高度
      let offsetTop = getElementTop(one, outerestClassName);

      // dom转换后距离顶部的高度
      // 转换成canvas高度
      const top = rate * (offsetTop)

      // 对于需要进行分页且内部存在需要分页（即不属于深度终点）的元素进行处理
      if (isDivideInside) {
        // 执行深度遍历操作
        traversingNodes({ 
          nodes: one.childNodes, 
          rate, 
          outerestClassName, 
          originalPageHeight
        });
      }
      // 对于深度终点元素进行处理
      else if (isTableCol || isIMG) {
        // dom高度转换成生成pdf的实际高度
        // 代码不考虑dom定位、边距、边框等因素，需在dom里自行考虑，如将box-sizing设置为border-box
        updatePos(rate * offsetHeight, top, originalPageHeight);
      }
      else if (isEditor) {
        // 执行位置更新操作
        updatePos(rate * offsetHeight, top, originalPageHeight);
        // 遍历富文本节点
        traversingEditor(one.childNodes, contentWidth, elementWidth)
      }
      // 对于普通元素，则判断是否高度超过分页值，并且深入
      else {
        // 执行位置更新操作
        updateNomalElPos(rate * offsetHeight, top, originalPageHeight)
        // 遍历子节点
        // traversingNodes({ nodes: one.childNodes, rate, outerestClassName });
      }
    }
    return;
  }

  // 可能跨页元素位置更新的方法
  // 需要考虑分页元素，则需要考虑两种情况
  // 1. 普通达顶情况，如上
  // 2. 当前距离顶部高度加上元素自身高度 大于 整页高度，则需要载入一个分页点
  function updatePos(eheight, top, originalPageHeight) {
    // 若 距离当前页顶部的高度 加上元素自身的高度 大于 一页内容的高度, 则证明元素跨页，将当前高度作为分页位置
    if ((top + eheight - (pages.length > 0 ? pages[pages.length - 1] : 0) > originalPageHeight) && (top != (pages.length > 0 ? pages[pages.length - 1] : 0))) {
      pages.push(top);
    }
  }

  // 对于富文本元素，观察所得段落之间都是以<p> / <img> 元素相隔，因此不需要进行深度遍历 (仅针对个人遇到的情况)
  function traversingEditor(nodes, contentWidth, elementWidth) {
    // 遍历子节点
    for (let i = 0; i < nodes.length; ++i) {
      const one = nodes[i];
      let { offsetHeight } = one;
      let offsetTop = getElementTop(one);
      const top = contentWidth / elementWidth * (offsetTop)
      updatePos(contentWidth / elementWidth * offsetHeight, top, one);
    }
  }

  // 普通元素更新位置的方法
  // 普通元素只需要考虑到是否到达了分页点，即当前距离顶部高度 - 上一个分页点的高度 大于 正常一页的高度，则需要载入分页点 
  function updateNomalElPos(eheight, top, originalPageHeight, currentIndex) {
    // 若 距离当前页顶部的高度 加上元素自身的高度 大于 一页内容的高度, 则证明元素跨页，将当前高度作为分页位置
    if ((top + eheight - (pages.length > 0 ? pages[pages.length - 1] : 0) > originalPageHeight) && (top != (pages.length > 0 ? pages[pages.length - 1] : 0))) {
      pages.push(top);
    }
  }

  /**
   * 生成pdf(A4多页pdf截断问题， 包括页眉、页脚 和 上下左右留空的护理)
   * @param {Object} param
   * @param {HTMLElement} param.element - 需要转换的dom根节点
   * @param {number} [param.contentWidth=550] - 一页pdf的内容宽度，0-592.28
   * @param {string} [param.filename='document.pdf'] - pdf文件名
   * @param {HTMLElement} param.header - 页眉dom元素
   * @param {HTMLElement} param.footer - 页脚dom元素
   */
  export async function outputPDF({ element, firstpage, contentWidth = 550, outerestClassName, header, footer, endImage, filename = "测试A4分页.pdf", onProgress }) {
    if (!(element instanceof HTMLElement)) {
      return;
    }

    // jsPDFs实例
    const pdf = new jsPDF({
      unit: 'pt',
      format: 'a4',
      orientation: 'p',
    });

    await addFirstPage(firstpage, pdf)
    onProgress(10)

    // 一页的高度， 转换宽度为一页元素的宽度
    const { width, height, data } = await toCanvas(element, contentWidth);
    onProgress(60)
  
    // 页脚元素 经过转换后在PDF页面的高度
    const { height: tfooterHeight } = await toCanvas(footer, contentWidth)

    // 页眉元素 经过转换后在PDF的高度
    const { height: theaderHeight } = await toCanvas(header, contentWidth);
    onProgress(70)

    // 距离PDF左边的距离，/ 2 表示居中 
    const baseX = (A4_WIDTH - contentWidth) / 2;        // 预留空间给左边
    // 距离PDF 页眉和页脚的间距， 留白留空
    const baseY = 15;

    // 出去页头、页眉、还有内容与两者之间的间距后 每页内容的实际高度
    const originalPageHeight = (A4_HEIGHT - tfooterHeight - theaderHeight - baseY * 2);

    // 元素在网页页面的宽度
    const elementWidth = element.offsetWidth;

    // PDF内容宽度 和 在HTML中宽度 的比， 用于将 元素在网页的高度 转化为 PDF内容内的高度， 将 元素距离网页顶部的高度  转化为 距离Canvas顶部的高度
    let rate = contentWidth / elementWidth
    console.log('rate', rate)
    
    // 深度遍历节点的方法
    traversingNodes({ nodes: element.childNodes, rate, outerestClassName, originalPageHeight, contentWidth, elementWidth });

    // 可能会存在遍历到底部元素为深度节点，可能存在最后一页位置未截取到的情况
    if (pages[pages.length - 1] + originalPageHeight < height) {
      pages.push(pages[pages.length - 1] + originalPageHeight);
    }

    // 如果
    const newPages = pages.filter(item => item <= height)
    let currentProgress = 70
    // 根据分页位置 开始分页
    for (let i = 0; i < newPages.length; ++i) {
      currentProgress += Math.floor(20 / newPages.length)
      console.log('currentProgress', currentProgress)
      onProgress(currentProgress)
      // Message.success(`共${newPages.length}页， 生成第${i + 1}页`)
      // 根据分页位置新增图片
      addImage(baseX, baseY + theaderHeight - newPages[i], pdf, data, width, height);

      // 将 内容 与 页眉之间留空留白的部分进行遮白处理
      addBlank(0, theaderHeight, A4_WIDTH, baseY, pdf);

      // 将 内容 与 页脚之间留空留白的部分进行遮白处理
      addBlank(0, A4_HEIGHT - baseY - tfooterHeight, A4_WIDTH, baseY, pdf);
      // 对于除最后一页外，对 内容 的多余部分进行遮白处理
      if (i < newPages.length - 1) {
        // 获取当前页面需要的内容部分高度
        const imageHeight = newPages[i + 1] - newPages[i];
        // 对多余的内容部分进行遮白
        addBlank(0, baseY + imageHeight + theaderHeight - 3, A4_WIDTH, A4_HEIGHT - (imageHeight), pdf);
      }
      // 添加页眉
      await addHeader(header, pdf, A4_WIDTH)

      // 添加页脚
      await addFooter(footer, pdf, A4_WIDTH);
      
      // 若不是最后一页，则分页
      if (i !== newPages.length - 1) {
        // 增加分页
        pdf.addPage();
      }
    }
    // add a image to the last page of pdf file
    await addLastImage({
      endImage, 
      contentWidth, 
      originalPageHeight, 
      rate, 
      theaderHeight,
      baseY,
      pdf,
      header,
      height,
      tfooterHeight,
      newPages
    })
    onProgress(100)
    return pdf.save(filename)
  }

  async function addLastImage({
    endImage, 
    contentWidth, 
    originalPageHeight, 
    rate, 
    theaderHeight,
    baseY,
    pdf,
    header,
    height,
    tfooterHeight,
    newPages
  }) {
    const { height: endImageHeight, data: endImageData } = await toCanvas(endImage, contentWidth)
    if (originalPageHeight - (height - newPages[newPages.length - 1] + theaderHeight + tfooterHeight + 2 * baseY) >= endImageHeight * rate) {
      const top = theaderHeight + baseY + (height - newPages[newPages.length - 1])
      pdf.addImage(endImageData, 'PNG', (contentWidth - contentWidth * rate) / 2, top, contentWidth * rate, endImageHeight * rate)
    } else {
      pdf.addPage()
      // 添加页眉
      await addHeader(header, pdf, A4_WIDTH)
      const top = theaderHeight + baseY
      pdf.addImage(endImageData, 'PNG', (contentWidth - contentWidth * rate) / 2, top, contentWidth * rate, endImageHeight * rate)
    }
  }