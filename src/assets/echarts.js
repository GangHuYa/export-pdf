const echarts = require('echarts/lib/echarts');
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';
echarts.use([SVGRenderer, CanvasRenderer]);
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/grid');
require('echarts/lib/component/geo');
require('echarts/lib/component/dataset');
require('echarts/lib/component/transform');
require('echarts/lib/component/visualMap');
require('echarts/lib/component/dataZoom');
require('echarts/lib/component/graphic');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/timeline');

require('echarts/lib/chart/pie');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/chart/scatter');
require('echarts/lib/chart/radar');
require('echarts/lib/chart/boxplot');
require('echarts/lib/chart/heatmap');
require('echarts/lib/chart/treemap');
require('echarts/lib/chart/candlestick');

export default echarts
