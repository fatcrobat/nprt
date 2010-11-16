Drupal.behaviors.nprtinit = function(context){
	 $("#loots")
	 .tablesorter({debug: false, widgets: ['zebra'], sortList: [[4,1],[0,0]]})
	 .tablesorterPager({container: $("#pager"), positionFixed: false, size: 25})
     .tablesorterFilter({filterContainer: $("#filter-box"),
         filterClearContainer: $("#filter-clear-button"),
         filterColumns: [0,1,2,3],
         filterCaseSensitive: false});
	 
	 $("#attendance")
	 .tablesorter({debug: false, widgets: ['zebra'], sortList: [[4,0],[0,0]]})
	 .tablesorterPager({container: $("#pager"), positionFixed: false, size: 25})
     .tablesorterFilter({filterContainer: $("#filter-box"),
         filterClearContainer: $("#filter-clear-button"),
         filterColumns: [0,1,2,3],
         filterCaseSensitive: false});
};