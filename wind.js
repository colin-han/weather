window.wind = window.wind || {};
(function (wind, window, undefined) {
    let _defaultOpts = {
        defaultBoxWidth: 1186,
        defaultBoxHeight: 342,
        defaultDuration: 2,
        sizeRange: [0.5, 1.5],
        speed: [0.7, 1.4],
        maxNum: 20,
        numLevel: 2,
        leafClasses: ['leaf-1'],
    }
    let _opts;
    let _leafs = [];
    wind.init = function (opts) {
        _opts = _.assign({}, _defaultOpts, opts);
        if (_opts.templateId) {
            _opts.anchor = document.getElementById(_opts.templateId);
            _opts.template = _.template(_opts.anchor.innerHTML);
        }
        _opts.container = document.getElementById(_opts.containerId);
        _opts.containerWidth = _opts.container.offsetWidth;
        _opts.containerHeight = _opts.container.offsetHeight;

        window.requestAnimFrame(update);
    }
    wind.animationEnd = function(event) {
        let leaf = event.target;
        leaf.remove();
    }
    function update(opts) {
        let leafs = document.getElementsByClassName('leaf');
        if (leafs.length < _opts.maxNum) {
            generateLeafs();
        }
        setTimeout(function(){
            requestAnimationFrame(update);
        }, 100);
    }
    function generateLeafs() {
        for (let i = 0; i < _opts.numLevel; i++) {
            let size = Math.random() * (_opts.sizeRange[1] - _opts.sizeRange[0]) + _opts.sizeRange[0];
            let width = Math.round(_opts.defaultBoxWidth * size);
            let height = Math.round(_opts.defaultBoxHeight * size);
            let left = Math.round(Math.random() * (_opts.containerWidth + width) - width);
            let top = Math.round(Math.random() * (_opts.containerHeight - height));
            let speed = Math.random() * (_opts.speed[1] - _opts.speed[0]) + _opts.speed[0];
            let duration = _opts.defaultDuration / speed;

            let classIndex = parseInt(Math.random()* _opts.leafClasses.length);
            let leafClass = _opts.leafClasses[classIndex];

            let html = _opts.template({left, top, width, height, leafClass, duration});
            _opts.anchor.insertAdjacentHTML("beforebegin", html);
        }
    }
}(wind, window))