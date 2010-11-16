(function($) {
	$.extend({
		tablesorterPager: new function() {
			
			 function updatePageDisplay(c, table) {
				 var s = $(c.cssPageDisplay, c.container).val((c.page + 1));
				 s += $(c.cssPageCount, c.container).text(c.totalPages);
				 
				var pageSelect1 = $(c.cssPageSelect1);
				var pageSelect2 = $(c.cssPageSelect2);
				var pageSelect3 = $(c.cssPageSelect3);
				
				var currPage = c.page + 1;
				
				var prefix = c.cssPageSpanInner?'<span>':'';
				var suffix = c.cssPageSpanInner?'</span>':'';
				
				//handling different total # of pages
				switch(c.totalPages){
					case 0:
					case 1:						
						$(pageSelect1)[0].innerHTML = prefix+"1"+suffix;
						$(pageSelect2).hide();
						$(pageSelect3).hide();					
						
						disableArrows(c, { prevArrow: true, nextArrow: true, lastArrow: true, firstArrow: true });
						
						break;
					case 2:
						$(pageSelect1)[0].innerHTML = prefix+"1"+suffix;
						$(pageSelect2)[0].innerHTML = prefix+"2"+suffix;
						$(pageSelect3).hide();
						enableArrows(c, { prevArrow: true, nextArrow: true, lastArrow: true, firstArrow: true });
						break;
					case 3:
						enableArrows(c, { prevArrow: true, nextArrow: true, lastArrow: true, firstArrow: true });
					
						$(pageSelect1)[0].innerHTML = prefix+"1"+suffix;
						$(pageSelect2)[0].innerHTML = prefix+"2"+suffix;
						$(pageSelect3)[0].innerHTML = prefix+"3"+suffix;
						
						$(pageSelect1).show();
						$(pageSelect2).show();
						$(pageSelect3).show();					
						break;					
					default:
						//4 or more pages so show all the arrows
						enableArrows(c, { prevArrow: true, nextArrow: true, lastArrow: true, firstArrow: true });
					
						//last page or 2nd to last page
						if((currPage == c.totalPages) || (currPage == c.totalPages-1)){
							$(pageSelect1)[0].innerHTML = prefix+(c.totalPages-2)+suffix;
							$(pageSelect2)[0].innerHTML = prefix+(c.totalPages-1)+suffix;
							$(pageSelect3)[0].innerHTML = prefix+(c.totalPages)+suffix;
						}else{
							$(pageSelect1)[0].innerHTML = prefix+currPage+suffix;
							$(pageSelect2)[0].innerHTML = prefix+(currPage+1)+suffix;
							$(pageSelect3)[0].innerHTML = prefix+(currPage+2)+suffix;
						}
						$(pageSelect1).show();
						$(pageSelect2).show();
						$(pageSelect3).show();
				}
				
				//clear the classes
				$(pageSelect1).removeClass("sel");
				$(pageSelect2).removeClass("sel");
				$(pageSelect3).removeClass("sel");
				
				//bind page selects so users can click on the number to navigate
				$(pageSelect1).unbind('click');
				$(pageSelect2).unbind('click');
				$(pageSelect3).unbind('click');			
				
				var t = 0;
				$(pageSelect1).click(function(){
					t = c.cssPageSpanInner?$(this).find('span').html():$(this).html();
					moveToThisPage(table,t*1);
				});
				$(pageSelect2).click(function(){
					t = c.cssPageSpanInner?$(this).find('span').html():$(this).html();
					moveToThisPage(table,t*1);
				});
				$(pageSelect3).click(function(){		
					t = c.cssPageSpanInner?$(this).find('span').html():$(this).html();
					moveToThisPage(table,t*1);
				});
				
				//set selected or not
				var t1 = c.cssPageSpanInner?$(pageSelect1).find('span').html():$(pageSelect1).html();
				var t2 = c.cssPageSpanInner?$(pageSelect2).find('span').html():$(pageSelect2).html();
				var t3 = c.cssPageSpanInner?$(pageSelect3).find('span').html():$(pageSelect3).html();
				if(t1*1 == currPage){					
					$(pageSelect1).addClass("sel");
					$(pageSelect2).addClass("p");
					$(pageSelect3).addClass("p");
				}else if(t2*1 == currPage){
					$(pageSelect2).addClass("sel");
					$(pageSelect1).addClass("p");
					$(pageSelect3).addClass("p");					
				}else if(t3*1 == currPage){
					$(pageSelect3).addClass("sel");					
					$(pageSelect1).addClass("p");
					$(pageSelect2).addClass("p");
				}
				//enable or disable arrows depending on the page we're on
				if(currPage == 1){
					disableArrows(c, { prevArrow: true, nextArrow: false, lastArrow: false, firstArrow: true });					
				}else if(currPage == c.totalPages){	
					disableArrows(c, { prevArrow: false, nextArrow: true, lastArrow: true, firstArrow: false });
				}				
				
	        }
			 
			function disableArrows(c, arrowOptions){
						
				//store reference
				var arrows = {
					next: $(c.cssNext),
					prev: $(c.cssPrev),
					last: $(c.cssLast),
					first: $(c.cssFirst)
				};
								
				if((arrowOptions.prevArrow) && ($(arrows.prev).hasClass("on"))){
					$(arrows.prev).removeClass("on");
					$(arrows.prev).addClass("off");						
				}
				
				if((arrowOptions.nextArrow) && ($(arrows.next).hasClass("on"))){
					$(arrows.next).removeClass("on");
					$(arrows.next).addClass("off");						
				}
				
				if((arrowOptions.firstArrow) && ($(arrows.first).hasClass("on"))){
					$(arrows.first).removeClass("on");
					$(arrows.first).addClass("off");						
				}
				
				if((arrowOptions.lastArrow) && ($(arrows.last).hasClass("on"))){
					$(arrows.last).removeClass("on");
					$(arrows.last).addClass("off");						
				}				
			}

			
			function enableArrows(c, arrowOptions){				
											
				//store reference
				var arrows = {
					next: $(c.cssNext),
					prev: $(c.cssPrev),
					last: $(c.cssLast),
					first: $(c.cssFirst)
				};
				
				if((arrowOptions.prevArrow) && ($(arrows.prev).hasClass("off"))){			
					$(arrows.prev).removeClass("off");
					$(arrows.prev).addClass("on");
				}
				
				if((arrowOptions.nextArrow) && ($(arrows.next).hasClass("off"))){
					$(arrows.next).removeClass("off");
					$(arrows.next).addClass("on");						
				}
				
				if((arrowOptions.firstArrow) && ($(arrows.first).hasClass("off"))){
					$(arrows.first).removeClass("off");
					$(arrows.first).addClass("on");						
				}
				
				if((arrowOptions.lastArrow) && ($(arrows.last).hasClass("off"))){
					$(arrows.last).removeClass("off");
					$(arrows.last).addClass("on");						
				}
			}

			 
			 
			function setPageSize(table,size) {
				var c = table.config;
				c.size = size;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				c.pagerPositionSet = false;
				moveToPage(table);
				fixPosition(table);
			}
			
			function fixPosition(table) {
				var c = table.config;
				if(!c.pagerPositionSet && c.positionFixed) {
					var c = table.config, o = $(table);
					if(o.offset) {
						c.container.css({
							top: o.offset().top + o.height() + 'px',
							position: 'absolute'
						});
					}
					c.pagerPositionSet = true;
				}
			}
			
			function moveToFirstPage(table) {
				var c = table.config;
				c.page = 0;
				moveToPage(table);
			}
			
			function moveToLastPage(table) {
				var c = table.config;
				c.page = (c.totalPages-1);
				moveToPage(table);
			}
			
			function moveToNextPage(table) {
				var c = table.config;
				c.page++;
				if(c.page >= (c.totalPages-1)) {
					c.page = (c.totalPages-1);
				}
				moveToPage(table);
			}
			
			function moveToPrevPage(table) {
				var c = table.config;
				c.page--;
				if(c.page <= 0) {
					c.page = 0;
				}
				moveToPage(table);
			}
			
			function moveToPrevDirectPage(table) {
				var c = table.config;
				c.page--;
				if(c.page <= 0) {
					c.page = 0;
				}
				renderTable(table,c.rowsCopy,true);
			}
			
			function moveToNextDirectPage(table) {
				var c = table.config;
				c.page++;
				if(c.page >= (c.totalPages-1)) {
					c.page = (c.totalPages-1);
				}
				renderTable(table,c.rowsCopy,true);
			}
						
			
			function moveToPage(table) {
				var c = table.config;
				if(c.page < 0 || c.page > (c.totalPages-1)) {
					c.page = 0;
				}
				renderTable(table,c.rowsCopy, true);
			}
			
			function moveToThisPage(table, page) {
				var c = table.config;
				c.page = page-1;
				if(c.page <= 0) {
					c.page = 0;
				}
				moveToPage(table);
			}
			
			function renderTable(table,rows,update) {
				var c = table.config;
				var l = rows.length;
				var s = (c.page * c.size);
				var e = (s + c.size);
				if(e > rows.length ) {
					e = rows.length;
				}
				
				
				var tableBody = $(table.tBodies[0]);
				
				// clear the table body
				
				$.tablesorter.clearTableBody(table);
				
				for(var i = s; i < e; i++) {
					
					//tableBody.append(rows[i]);
					
					var o = rows[i];
					var l = o.length;
					for(var j=0; j < l; j++) {
						
						tableBody[0].appendChild(o[j]);

					}
				}
				
				fixPosition(table,tableBody);
				
				$(table).trigger("applyWidgets");
				
				if( c.page >= c.totalPages ) {
        			moveToLastPage(table);
				}
				if(update){
					updatePageDisplay(c, table);
				}
			}
			
			this.appender = function(table,rows) {
				
				var c = table.config;
				
				c.rowsCopy = rows;
				c.totalRows = rows.length;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				
				renderTable(table,rows,true);
			};
			
			this.defaults = {
				size: 10,
				offset: 0,
				page: 0,
				totalRows: 0,
				totalPages: 0,
				container: null,
				cssNext: '#pageNext',
				cssPrev: '#pagePrev',
				cssFirst: '#pageFirst',
				cssLast: '#pageLast',
				cssPageDisplay: '#pageDisplay',
				cssPageCount: '#pageCount',
				cssPageSize: '#pageSize',
				cssPageSelect1: '#pageSelect1',
				cssPageSelect2: '#pageSelect2',
				cssPageSelect3: '#pageSelect3',
				cssPageSpanInner: true,
				seperator: "/",
				positionFixed: true,
				appender: this.appender
			};
			
			this.construct = function(settings) {
				
				return this.each(function() {	
					
					config = $.extend(this.config, $.tablesorterPager.defaults, settings);
					
					var table = this, pager = config.container;
				
					$(this).trigger("appendCache");
					
					config.size = parseInt($(".pagesize",pager).val());
					
					$(config.cssFirst,pager).click(function() {
						moveToFirstPage(table);
						return false;
					});
					$(config.cssNext,pager).click(function() {
						moveToNextPage(table);
						return false;
					});
					$(config.cssPrev,pager).click(function() {
						moveToPrevPage(table);
						return false;
					});
					$(config.cssLast,pager).click(function() {
						moveToLastPage(table);
						return false;
					});
					$(config.cssPageSize,pager).change(function() {
						setPageSize(table,parseInt($(this).val()));
						return false;
					});
					$(config.cssPageDisplay,pager).keyup(function(){
						var num = $(this).val();
						if(num != '') moveToThisPage(table, $(this).val());
						return false;
					});
					$(config.cssPageDisplay,pager).keypress(function(e){
						var num = $(this).val();
						switch(e.keyCode) { 
				         // User pressed "up" arrow
				         case 38:
				        	 $(this).val(num+1); 
				        	 moveToNextDirectPage(table);
				         break;
				         // User pressed "down" arrow
				         case 40:
				        	 $(this).val(num-1); 
				        	 moveToPrevDirectPage(table);
				         break;
				         case 13:
				        	 // User pressed "enter"
				         break;
				      }
					});
				});
			};
			
		}
	});
	// extend plugin scope
	$.fn.extend({
        tablesorterPager: $.tablesorterPager.construct
	});
	
})(jQuery);				

