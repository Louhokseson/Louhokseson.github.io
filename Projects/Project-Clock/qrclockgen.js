//(function(){
	var qr;
	var elem;
	function buildQR(){
		qr = qrcode(4, 'M');
		qr.addData(new Date() + "");
		qr.make();
	}
	var boxes = [];
	var size;
	var modcount;
	function constructQRDivs(){
		elem= $("#qrbox");
		modcount = qr.getModuleCount();
		size = 100 / modcount;
		for(var x=0;x<modcount;x++){
			boxes[x]=[];
			for(var y=0;y<modcount;y++){
				boxes[x][y] = {};
				boxes[x][y].cont = $("<div>");
				boxes[x][y].cont.css({"width":(size + "%"), "height":(size + "%"), "position":"absolute", "top":(size*y + "%"), "left":(size*x + "%")});
				//boxes[x][y].el.appendTo(elem);
				elem.append(boxes[x][y].cont);
				boxes[x][y].el = $("<div>").addClass("boxelem").appendTo(boxes[x][y].cont);

				boxes[x][y].wasDark = false;
				boxes[x][y].isDark = false;
				boxes[x][y].elems = $("");
			}
		}
	}


	function fillQRDivs(){
		for(var x=0;x<modcount;x++){
			for(var y=0;y<modcount;y++){
				var cbox = boxes[x][y].el;
				boxes[x][y].wasDark = boxes[x][y].isDark;
				boxes[x][y].isDark = qr.isDark(x,y);
			}
		}
		for(var x=0;x<modcount;x++){
			for(var y=0;y<modcount;y++){
				var cbox = boxes[x][y];
				boxes[x][y].elems.empty();
				boxes[x][y].elems = $("");
				if(cbox.isDark)
					cbox.cont.addClass("tdark");
				else
					cbox.cont.removeClass("tdark");
				if(cbox.isDark == cbox.wasDark){
					if(cbox.isDark){
						stabilizeAsDark(x,y);
					}else{
						stabilizeAsLight(x,y);
					}
				}else if(cbox.isDark){
					//Make it dark!
					var neighbors = [];
					if(x-1>=0 && boxes[x-1][y].wasDark) neighbors.push([x-1,y]);
					if(y-1>=0 && boxes[x][y-1].wasDark) neighbors.push([x,y-1]);
					if(x+1<modcount && boxes[x+1][y].wasDark) neighbors.push([x+1,y]);
					if(y+1<modcount && boxes[x][y+1].wasDark) neighbors.push([x,y+1]);
					if(neighbors.length>0){
						var neighbor = neighbors[Math.floor(Math.random()*neighbors.length)];
						animateDarkInTo(neighbor[0], neighbor[1], x, y);
					}else{
						animateDarkIn(x, y);
					}
				}else{
					//Make it light!
					var neighbors = [];
					if(x-1>=0 && boxes[x-1][y].isDark) neighbors.push([x-1,y]);
					if(y-1>=0 && boxes[x][y-1].isDark) neighbors.push([x,y-1]);
					if(x+1<modcount && boxes[x+1][y].isDark) neighbors.push([x+1,y]);
					if(y+1<modcount && boxes[x][y+1].isDark) neighbors.push([x,y+1]);
					if(neighbors.length>0){
						var neighbor = neighbors[Math.floor(Math.random()*neighbors.length)];
						animateDarkOutTo(x, y, neighbor[0], neighbor[1]);
					}else{
						animateDarkOut(x, y);
					}
				}
			}
		}
	}
	function stabilizeAsDark(x,y){
		boxes[x][y].el.removeClass("slideL slideR slideU slideD slidein slideout outL outR outU outD slideback").addClass("dark");
	}
	function stabilizeAsLight(x,y){
		boxes[x][y].el.removeClass("slideL slideR slideU slideD slidein slideout outL outR outU outD slideback dark");
	}
	function animateDarkOutTo(x1,y1,x2,y2){
		var el = boxes[x1][y1].el;
		el.removeClass("slideL slideR slideU slideD slidein slideout outL outR outU outD slideback").addClass("dark");
		if(x2>x1) el.addClass("slideR");
		else if(x2<x1) el.addClass("slideL");
		else if(y2>y1) el.addClass("slideD");
		else if(y2<y1) el.addClass("slideU");
	}
	function animateDarkInTo(x1,y1,x2,y2){
		var el = boxes[x2][y2].el;
		el.removeClass("slideL slideR slideU slideD slidein slideout outL outR outU outD slideback").addClass("dark");
		if(x2>x1) el.addClass("outL");
		else if(x2<x1) el.addClass("outR");
		else if(y2>y1) el.addClass("outU");
		else if(y2<y1) el.addClass("outD");
		window.setTimeout(function(){el.addClass("slideback");}, 0);
	}
	function animateDarkIn(x2, y2){
		var el = boxes[x2][y2].el;
		el.removeClass("slideL slideR slideU slideD slidein slideout outL outR outU outD slideback dark");
		el.addClass("slidein");
	}
	function animateDarkOut(x2, y2){
		var el = boxes[x2][y2].el;
		el.removeClass("slideL slideR slideU slideD slidein slideout outL outR outU outD slideback").addClass("dark");
		el.addClass("slideout");
	}


	function update(){
		buildQR();
		fillQRDivs();
	}

	$(function(){
		buildQR();
		constructQRDivs();
		//fillQRDivs();
		window.setInterval(update, 1000);
	});
//})()