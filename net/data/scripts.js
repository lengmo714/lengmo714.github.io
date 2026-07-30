let allData = [];
        let pieChart = null;
        let lineChart = null;

        document.getElementById('fileInput').addEventListener('change', handleFiles, false);
        document.getElementById('timeSelect').addEventListener('change', filterData);
        document.getElementById('startDate').addEventListener('change', filterData);
        document.getElementById('endDate').addEventListener('change', filterData);
        document.getElementById('skuSelect').addEventListener('change', filterData);
        document.getElementById('category1Select').addEventListener('change', filterData);
        document.getElementById('category2Select').addEventListener('change', filterData);
        document.getElementById('category3Select').addEventListener('change', filterData);

        function handleFiles(e) {
            const files = e.target.files;
            const result = document.getElementById('result');
            result.innerHTML = '';
            allData = []; // 清除数据

            const timeSet = new Set();
            const skuSet = new Set();
            const category1Set = new Set();
            const category2Set = new Set();
            const category3Set = new Set();

            Array.from(files).forEach(file => {
                if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                    const reader = new FileReader();
                    reader.onload = function (event) {
                        const data = new Uint8Array(event.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });

                        const firstSheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[firstSheetName];
                        const json = XLSX.utils.sheet_to_json(worksheet);

                        json.forEach(item => {
                            // 将SKU字段转换为字符串
                            if (item['SKU'] !== undefined) {
                                item['SKU'] = String(item['SKU']);
                                skuSet.add(item['SKU']);
                            }
                            if (item['时间'] !== undefined) {
                                timeSet.add(item['时间']);
                            }
                            if (item['一级类目'] !== undefined) {
                                category1Set.add(item['一级类目']);
                            }
                            if (item['二级类目'] !== undefined) {
                                category2Set.add(item['二级类目']);
                            }
                            if (item['三级类目'] !== undefined) {
                                category3Set.add(item['三级类目']);
                            }
                            allData.push(item);
                        });

                        updateSelectOptions(timeSet, skuSet, category1Set, category2Set, category3Set);
                        filterData();
                    };
                    reader.readAsArrayBuffer(file);
                }
            });
        }

        function updateSelectOptions(timeSet, skuSet, category1Set, category2Set, category3Set) {
            const timeSelect = document.getElementById('timeSelect');
            const skuSelect = document.getElementById('skuSelect');
            const category1Select = document.getElementById('category1Select');
            const category2Select = document.getElementById('category2Select');
            const category3Select = document.getElementById('category3Select');

            timeSelect.innerHTML = '<option value="">全部</option>';
            skuSelect.innerHTML = '<option value="">全部</option>';
            category1Select.innerHTML = '<option value="">全部</option>';
            category2Select.innerHTML = '<option value="">全部</option>';
            category3Select.innerHTML = '<option value="">全部</option>';

            timeSet.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
            });

            skuSet.forEach(sku => {
                const option = document.createElement('option');
                option.value = sku;
                option.textContent = sku;
                skuSelect.appendChild(option);
            });

            category1Set.forEach(category1 => {
                const option = document.createElement('option');
                option.value = category1;
                option.textContent = category1;
                category1Select.appendChild(option);
            });

            category2Set.forEach(category2 => {
                const option = document.createElement('option');
                option.value = category2;
                option.textContent = category2;
                category2Select.appendChild(option);
            });

            category3Set.forEach(category3 => {
                const option = document.createElement('option');
                option.value = category3;
                option.textContent = category3;
                category3Select.appendChild(option);
            });
        }

        function filterData() {
            const timeSelect = document.getElementById('timeSelect').value;
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            const skuSelect = document.getElementById('skuSelect').value;
            const category1Select = document.getElementById('category1Select').value;
            const category2Select = document.getElementById('category2Select').value;
            const category3Select = document.getElementById('category3Select').value;

            const filteredData = allData.filter(item => {
                return (timeSelect === "" || item['时间'] === timeSelect) &&
                    (startDate === "" || new Date(item['时间']) >= new Date(startDate)) &&
                    (endDate === "" || new Date(item['时间']) <= new Date(endDate)) &&
                    (skuSelect === "" || item['SKU'] === skuSelect) &&
                    (category1Select === "" || item['一级类目'] === category1Select) &&
                    (category2Select === "" || item['二级类目'] === category2Select) &&
                    (category3Select === "" || item['三级类目'] === category3Select);
            });

            filteredData.sort((a, b) => {
                const dateA = new Date(a['时间']);
                const dateB = new Date(b['时间']);
                return dateB - dateA;
            });

            const result = document.getElementById('result');
            result.innerHTML = generateTable(filteredData);

            // 清除饼状图和曲线图
            clearPieChart();
            clearLineChart();
        }

        function generateTable(data) {
            if (data.length === 0) return '<p>暂无数据。</p>';

            let table = '<table><thead><tr>';

            // Generate table headers
            const headers = Object.keys(data[0]);
            headers.forEach(header => {
                let headerText = header;
                switch (header) {
                    case '时间':
                        headerText = '时间';
                        break;
                    case '浏览量':
                        headerText = '浏览量';
                        break;
                    case '访客数':
                        headerText = '访客数';
                        break;
                    case '人均浏览量':
                        headerText = '人均浏览量';
                        break;
                    case '平均停留时长':
                        headerText = '平均停留时长';
                        break;
                    case '成交人数':
                        headerText = '成交人数';
                        break;
                    case '成交转化率':
                        headerText = '成交转化率';
                        break;
                    case '成交单量':
                        headerText = '成交单量';
                        break;
                    case '成交商品件数':
                        headerText = '成交商品件数';
                        break;
                    case '成交金额':
                        headerText = '成交金额';
                        break;
                    case '成交客单价':
                        headerText = '成交客单价';
                        break;
                    case '加购人数':
                        headerText = '加购人数';
                        break;
                    case '加购商品件数':
                        headerText = '加购商品件数';
                        break;
                    case '加购转化率':
                        headerText = '加购转化率';
                        break;
                    case 'SKU':
                        headerText = 'SKU';
                        break;
                    case '一级类目':
                        headerText = '一级类目';
                        break;
                    case '二级类目':
                        headerText = '二级类目';
                        break;
                    case '三级类目':
                        headerText = '三级类目';
                        break;
                    default:
                        break;
                }
                table += `<th>${headerText}</th>`;
            });
            table += '</tr></thead><tbody>';

            // Generate table rows
            data.forEach((row, index) => {
                table += '<tr>';

                headers.forEach(header => {
                    let currentValue = row[header];
                    let previousValue = '';

                    // Find previous day's data for the same SKU
                    if (index >= 0) {
                        const previousItem = data.find(item => item['SKU'] === row['SKU'] && new Date(item['时间']).getTime() < new Date(row['时间']).getTime());
                        if (previousItem) {
                            previousValue = previousItem[header];
                            // Add arrow and color for selected fields
                            if (header === '浏览量' || header === '访客数' || header === '人均浏览量' || header === '平均停留时长' ||
                                header === '成交人数' || header === '成交单量' || header === '成交金额' || header === '成交转化率' ||
                                header === '加购人数' || header === '加购商品件数' || header === '成交客单价' || header === '加购转化率' || header === '成交商品件数') {
                                const currentValueNum = parseFloat(currentValue);
                                const previousValueNum = parseFloat(previousValue);
                                if (!isNaN(currentValueNum) && !isNaN(previousValueNum)) {
                                    if (currentValueNum > previousValueNum) {
                                        currentValue = `<span class="increase">${currentValue}<span class="arrow up">&#8593;</span></span>`;
                                    } else if (currentValueNum < previousValueNum) {
                                        currentValue = `<span class="decrease">${currentValue}<span class="arrow down">&#8595;</span></span>`;
                                    }
                                }
                            }
                        }
                    } else {
                        // For the first row, just display the value
                        currentValue = `<span>${currentValue}</span>`;
                    }

                    table += `<td>${currentValue}</td>`;
                });

                table += '</tr>';
            });

            table += '</tbody></table>';
            return table;
        }

        function calculateAndDrawPieChart() {
            clearPieChart();
            const timeSelect = document.getElementById('timeSelect').value;
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;

            // 根据时间筛选数据
            let filteredData = allData.filter(item => {
                return (timeSelect === "" || item['时间'] === timeSelect) &&
                    (startDate === "" || new Date(item['时间']) >= new Date(startDate)) &&
                    (endDate === "" || new Date(item['时间']) <= new Date(endDate));
            });

            // 计算每个三级类目的成交金额总和
            const category3Total = {};
            filteredData.forEach(item => {
                const category3 = item['三级类目'];
                const amount = parseFloat(item['成交金额']) || 0;
                if (category3 && !isNaN(amount)) {
                    if (category3Total[category3]) {
                        category3Total[category3] += amount;
                    } else {
                        category3Total[category3] = amount;
                    }
                }
            });

            // 计算总成交金额
            const totalAmount = Object.values(category3Total).reduce((acc, val) => acc + val, 0);

            // 计算每个三级类目的百分比
            const category3Percentages = {};
            Object.keys(category3Total).forEach(category3 => {
                const percentage = (category3Total[category3] / totalAmount) * 100;
                category3Percentages[category3] = percentage.toFixed(2); // 保留两位小数
            });

            // 准备数据用于绘制饼状图
            const labels = Object.keys(category3Percentages);
            const dataValues = Object.values(category3Percentages);

            // 清空现有的饼状图
            const pieChartContainer = document.getElementById('pieChartContainer');
            pieChartContainer.innerHTML = '<canvas id="pieChartCanvas"></canvas>';

            // 使用 Chart.js 绘制饼状图
            const ctx = document.getElementById('pieChartCanvas').getContext('2d');
            pieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '三级类目成交金额占比',
                        data: dataValues,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 159, 64, 0.7)',
                            'rgba(255, 99, 132, 0.7)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    return `${labels[tooltipItem.dataIndex]}: 金额:${category3Total[tooltipItem.label]}  占比:${dataValues[tooltipItem.dataIndex]}%`;
                                }
                            }
                        }
                    }
                }
            });

            // 在绘制完饼状图后滚动到饼状图容器
            scrollToElement(pieChartContainer);
        }
        function calculateAndDrawLineCharts() {
            clearLineChart();
            const skuSelect = document.getElementById('skuSelect').value;

            // 根据 SKU 筛选数据
            let filteredData = allData.filter(item => {
                return (skuSelect === "" || item['SKU'] === skuSelect);
            });

            // 准备访客数和成交单量的数据
            const labels = filteredData.map(item => item['时间']);
            const visitorsData = filteredData.map(item => parseFloat(item['访客数']) || 0);
            const ordersData = filteredData.map(item => parseFloat(item['成交单量']) || 0);

            // 清空现有的曲线图
            const lineChartContainer = document.getElementById('lineChartContainer');
            lineChartContainer.style.display = 'block'; // 显示曲线图容器
            lineChartContainer.innerHTML = '<canvas id="lineChartCanvas"></canvas>';

            // 使用 Chart.js 绘制曲线图
            const ctx = document.getElementById('lineChartCanvas').getContext('2d');
            lineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '访客数',
                        data: visitorsData,
                        borderColor: 'rgba(54, 162, 235, 0.7)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: false
                    }, {
                        label: '成交单量',
                        data: ordersData,
                        borderColor: 'rgba(255, 99, 132, 0.7)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: '时间'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: '数量'
                            }
                        }
                    }
                }
            });

            // 在绘制完曲线图后滚动到曲线图容器
            scrollToElement(lineChartContainer);
        }
        function scrollToElement(element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        }

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        function clearPieChart() {
            if (pieChart) {
                pieChart.destroy();
                pieChart = null;
            }
        }

        function clearLineChart() {
            if (lineChart) {
                lineChart.destroy();
                lineChart = null;
            }
        }