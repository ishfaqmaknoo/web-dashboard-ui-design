let sideBar = document.querySelector('.sidebar');
let wrapper = document.querySelector('.wrapper');
let toggleIcon = document.querySelector('.toggle-icon');
toggleIcon.addEventListener('click', function() {
	console.log('clicked');
	sideBar.classList.toggle('shrink');
	wrapper.classList.toggle('full-width');
});

/********
* 
*Chart.js 
* 
* 
* *******/

let ctx = document.getElementById('myChart').getContext('2d');

let myChart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC' ],
		datasets: [
			{
				label: '',
				fill: false,
				data: [ 0, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45, 1.5, 1.55, 1.6 ],
				backgroundColor: [ 'rgba(102, 124, 233, 1)' ],
				borderColor: [ 'rgba(102, 124, 233, 1)' ],
				borderWidth: 1
			}
		]
	},
	options: {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true
					}
				}
			]
		},
		legend: {
			display: false
		},
		tooltips: {
			// Disable the on-canvas tooltip
			enabled: false,
			yAlign: 'top',

			custom: function(tooltipModel) {
				// Tooltip Element
				var tooltipEl = document.getElementById('chartjs-tooltip');

				// Create element on first render
				if (!tooltipEl) {
					tooltipEl = document.createElement('div');
					tooltipEl.id = 'chartjs-tooltip';
					tooltipEl.innerHTML = '<table></table>';
					document.body.appendChild(tooltipEl);
				}

				// Hide if no tooltip
				if (tooltipModel.opacity === 0) {
					tooltipEl.style.opacity = 0;
					return;
				}

				// Set caret Position
				tooltipEl.classList.remove('above', 'below', 'no-transform');
				if (tooltipModel.yAlign) {
					tooltipEl.classList.add(tooltipModel.yAlign);
				} else {
					tooltipEl.classList.add('no-transform');
				}

				function getBody(bodyItem) {
					return bodyItem.lines;
				}

				// Set Text
				if (tooltipModel.body) {
					var titleLines = tooltipModel.title || [];
					var bodyLines = tooltipModel.body.map(getBody);

					var innerHtml = '<thead>';

					titleLines.forEach(function(title) {
						innerHtml += `<tr>
                        <div class="tooltip-head"> 
                          <span class="tooltip-head__text">EUR/USD</span>
                          <span class="dots-icon">
                            <i></i><i></i><i></i>
                          </span>
                        </div
                        </tr>
                        <tr>
                          <div class="tooltip-body">
                            <span class="w-100 tooltip-body__text">CLOSE: ${title}</span>
                            <span class="light">${title} 00.00 UTC</span>
                          </div>
                        </tr>
                      `;
					});
					innerHtml += '</thead><tbody>';

					bodyLines.forEach(function(body, i) {
						var colors = tooltipModel.labelColors[i];
						var style = 'background:' + colors.backgroundColor;
						style += '; border-color:' + colors.borderColor;
						style += '; border-width: 2px';
						var span = '<span style="' + style + '"></span>';
						innerHtml += '<tr><td>' + span + body + '</td></tr>';
					});
					innerHtml += '</tbody>';

					var tableRoot = tooltipEl.querySelector('table');
					tableRoot.innerHTML = innerHtml;
				}
				// `this` will be the overall tooltip
				var position = this._chart.canvas.getBoundingClientRect();

				// Display, position, and set styles for font
				tooltipEl.style.opacity = 1;
				tooltipEl.style.position = 'absolute';
				tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
				tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
				tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
				tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
				tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
				tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
				tooltipEl.style.pointerEvents = 'none';
			}
		}
	}
});

/****************
 * 
 * 
 *Side Bar Responsive 
 * 
 * 
 **************/
